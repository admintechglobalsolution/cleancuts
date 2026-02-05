"use client";

import { useState } from "react";
import styles from "./AddUserModal.module.css";
import toast from "react-hot-toast";
import { User } from "@/types/user";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onUserAdded: (newUser: User) => void;
};

export default function AddUserModal({ isOpen, onClose, onUserAdded }: Props) {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !contact) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, contact }),
            });

            if (!res.ok) {
                throw new Error("Failed to create user");
            }

            const newUser = await res.json();
            toast.success("User added successfully");
            onUserAdded(newUser);

            // Clear form
            setName("");
            setContact("");
            onClose();
        } catch (error) {
            toast.error("Failed to add user");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Add New User</h2>
                    <button onClick={onClose} className={styles.closeBtn}>
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user name"
                            autoFocus
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Contact</label>
                        <input
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Enter contact number"
                        />
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelBtn}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
