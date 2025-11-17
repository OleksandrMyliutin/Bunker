import styles from "./InviteLink.module.css";

export default function InviteLink({ roomId }) {
  const url = `${window.location.origin}/join?room=${roomId}`;

  const copy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.linkBox}>{url}</div>

      <button className={styles.copy} onClick={copy}>
        Скопіювати
      </button>
    </div>
  );
}
