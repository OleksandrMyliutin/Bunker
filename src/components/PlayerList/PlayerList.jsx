import styles from "./PlayerList.module.css";

export default function PlayerList({ players, host }) {
  return (
    <ul className={styles.list}>
      {players.map((nickname, i) => (
        <li key={i} className={styles.item}>
          <span>{nickname}</span>
          
          {nickname === host && (
            <span className={styles.host}>Хост</span>
          )}
        </li>
      ))}
    </ul>
  );
}
