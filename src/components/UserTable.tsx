"use client";

import { useState } from "react";
import { User } from "@/types/user";
import styles from "@/app/page.module.css";

type Props = {
  users: User[];
  onSaveStatus: (id: string, status: "New" | "Active") => void;
  loading: boolean;
};

export default function UserTable({
  users,
  onSaveStatus,
  loading,
}: Props) {
  console.log("UserTable received users:", users);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<"New" | "Active">("New");

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>S.no</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Contact</th>
          <th className={styles.th}>Status</th>
          <th className={styles.th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={5} className={styles.emptyCell}>
              <div className={styles.emptyCenter}>
                Please wait Data loading...
              </div>
            </td>
          </tr>
        ) : users.length === 0 ? (
          <tr>
            <td colSpan={5} className={styles.emptyCell}>
              <div className={styles.emptyCenter}>No results found</div>
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr key={user.id}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{user.name}</td>
              <td className={styles.td}>{user.contact}</td>

              <td className={styles.td}>
                {editingId === user.id ? (
                  <select
                    className={styles.select}
                    value={draftStatus}
                    onChange={(e) =>
                      setDraftStatus(e.target.value as "New" | "Active")
                    }
                  >
                    <option value="New">New</option>
                    <option value="Active">Active</option>
                  </select>
                ) : (
                  <span
                    className={
                      user.status === "Active"
                        ? styles.statusActive
                        : styles.statusNew
                    }
                  >
                    {user.status}
                  </span>
                )}
              </td>

              <td className={styles.td}>
                {editingId === user.id ? (
                  <button
                    className={styles.actionBtn}
                    onClick={() => {
                      onSaveStatus(user.id, draftStatus);
                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.actionBtn}
                    onClick={() => {
                      setEditingId(user.id);
                      setDraftStatus(user.status);
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
