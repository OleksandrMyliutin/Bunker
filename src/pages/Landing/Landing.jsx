import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import { Link } from "react-router-dom";
import s from "./Landing.module.css";

export default function Landing() {
  return (
    <BunkerPanel
      title="Меню"
      subtitle="Ти ввійшов у бункер. Обери свій шлях."
    >
      <div className={s.menu}>
        <Link to="/create" className={s.btn}>Створити кімнату</Link>
        <Link to="/join" className={s.btn}>Приєднатися</Link>
      </div>
    </BunkerPanel>
  );
}
