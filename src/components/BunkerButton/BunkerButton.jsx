import styles from "./BunkerButton.module.css";

export default function BunkerButton({ children, onClick, disabled }) {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
