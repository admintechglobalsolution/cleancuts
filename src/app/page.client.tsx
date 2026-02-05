"use client";

import { useMemo, useState } from "react";
import UserTable from "@/components/UserTable";
import styles from "./page.module.css";
import { User } from "@/types/user";

type Props = {
  initialUsers: User[];
};

export default function PageClient({ initialUsers }: Props) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(initialUsers);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.contact.toLowerCase().includes(query),
    );
  }, [search, users]);

  const handleStatusChange = async (id: string, status: "New" | "Active") => {
    // Optimistic update
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));

    await fetch("/api/users/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Clean Cuts</h1>

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
          onSaveStatus={handleStatusChange}
          loading={false}
        />
      </main>
    </div>
  );
}
