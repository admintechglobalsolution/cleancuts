"use client";

import { useState } from "react";
import styles from "./AddUserModal.module.css";
import { User } from "@/types/user";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (
    newUser: User | null,
    status: "success" | "exists" | "error",
  ) => void;
};

export default function AddUserModal({ isOpen, onClose, onUserAdded }: Props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName("");
    setContact("");
    setMessage(null);
  };

  // ✅ NUMBERS ONLY + MAX 10
  const handleContactChange = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 10) {
      setContact(value);
    }
  };

  // ✅ FORM VALIDITY
  const isFormValid = name.trim().length > 0 && /^\d{10}$/.test(contact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact,
        }),
      });

      if (res.status === 409) {
        setMessage({
          type: "error",
          text: "Contact already registered",
        });
        onUserAdded(null, "exists");
        return;
      }

      if (!res.ok) throw new Error();

      const newUser: User = await res.json();

      setMessage({
        type: "success",
        text: "Contact successfully registered.",
      });

      onUserAdded(newUser, "success");

      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);
    } catch {
      setMessage({
        type: "error",
        text: "Failed to register contact",
      });
      onUserAdded(null, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Add New User</h2>
          <button
            className={styles.closeBtn}
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contact (10 digits)</label>
            <input
              value={contact}
              onChange={(e) => handleContactChange(e.target.value)}
              inputMode="numeric"
              placeholder="Enter 10-digit number"
              disabled={loading}
            />
          </div>

          {message && (
            <p
              className={
                message.type === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {message.text}
            </p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancel
            </button>

            {/* ✅ DISABLED UNTIL VALID */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!isFormValid || loading}
            >
              {loading ? "Saving..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
