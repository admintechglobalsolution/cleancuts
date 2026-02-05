"use client";

import { useEffect, useMemo, useState } from "react";
import UserTable from "@/components/UserTable";
import AddUserModal from "@/components/AddUserModal";
import styles from "./page.module.css";
import { User } from "@/types/user";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Fetch users from DB on load
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data: User[] = await res.json();
      console.log("Frontend fetched users:", data);
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.contact.toLowerCase().includes(query),
    );
  }, [search, users]);

  // ✅ SAVE STATUS → DB
  const handleSaveStatus = async (id: string, status: "New" | "Active") => {
    console.log("Saving status:", { id, status });
    const res = await fetch("/api/users/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (!res.ok) {
      toast.error("Failed to save status");
      return;
    }

    // update local state AFTER DB success
    setUsers((prev: User[]) =>
      prev.map((u: User) => (u.id === id ? { ...u, status } : u)),
    );
    toast.success("Status updated successfully");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#16a34a",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#dc2626",
              },
            },
          }}
        />
        <div className={styles.header}>
          <h1 className={styles.title}>Clean Cuts</h1>

          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(true)}
          >
            + Add User
          </button>

          <input
            type="text"
            placeholder="Search by name or contact"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
        </div>

        <UserTable
          users={filteredUsers}
          onSaveStatus={handleSaveStatus}
          loading={loading}
        />

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserAdded={(newUser) => {
            setUsers((prev) => [...prev, newUser]);
            setIsModalOpen(false);
          }}
        />
      </main>
    </div>
  );
}
