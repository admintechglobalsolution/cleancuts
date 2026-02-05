import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Clean Cuts</h1>
          <div className={styles.search} style={{ background: "#f3f4f6" }} />
        </div>

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
            <tr>
              <td colSpan={5} className={styles.emptyCell}>
                <div className={styles.emptyCenter}>
                  Please wait Data loading...
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
