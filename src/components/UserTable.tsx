"use client";

import { useState, useMemo } from "react";
import { User } from "@/types/user";
import styles from "@/app/page.module.css";

type Props = {
  users: User[];
  onSaveStatus: (id: string, status: "New" | "Active") => void;
  loading: boolean;
};

const PAGE_SIZE = 8;

export default function UserTable({ users, onSaveStatus, loading }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<"New" | "Active">("New");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [users, currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
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
                  Please wait, data loading...
                </div>
              </td>
            </tr>
          ) : paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.emptyCell}>
                <div className={styles.emptyCenter}>No results found</div>
              </td>
            </tr>
          ) : (
            paginatedUsers.map((user, index) => (
              <tr key={user.id}>
                <td className={styles.td}>
                  {(currentPage - 1) * PAGE_SIZE + index + 1}
                </td>

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

      {!loading && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={
                currentPage === i + 1 ? styles.pageBtnActive : styles.pageBtn
              }
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
