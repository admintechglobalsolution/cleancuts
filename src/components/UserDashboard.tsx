"use client";

import { useMemo, useRef, useState } from "react";
import UserTable from "@/components/UserTable";
import AddUserModal from "@/components/AddUserModal";
import styles from "@/app/page.module.css";
import { User } from "@/types/user";

type Props = {
  initialUsers: User[];
};

export default function UserDashboard({ initialUsers }: Props) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ SEARCH INPUT REF
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;

    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.contact.includes(q),
    );
  }, [search, users]);

  const handleSaveStatus = async (id: string, status: "New" | "Active") => {
    const snapshot = [...users];
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));

    try {
      const res = await fetch("/api/users/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) throw new Error();
    } catch {
      setUsers(snapshot);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Clean Cuts</h1>

          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(true)}
          >
            + Add User
          </button>

          <input
            ref={searchRef} // ✅ ATTACHED
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
          loading={false}
        />

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);

            // ✅ AUTO-FOCUS SEARCH AFTER MODAL CLOSE
            setTimeout(() => {
              searchRef.current?.focus();
            }, 200);
          }}
          onUserAdded={(newUser, status) => {
            if (status === "success" && newUser) {
              setUsers((prev) => [...prev, newUser]);
            }
          }}
        />
      </main>
    </div>
  );
}
