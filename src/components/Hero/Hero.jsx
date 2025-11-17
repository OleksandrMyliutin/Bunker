import { useState } from "react";
import s from "./Hero.module.css";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

export default function StartHero() {
  const [showHero, setShowHero] = useState(false);

  return (
    <div className={s.heroWrapper}>

      {/* Стартовий екран */}
      {!showHero && (
        <div className={`${s.startScreen} ${s.fadeIn}`}>
          <h1 className={s.startTitle}>Апокаліпсис. Почалося.</h1>
          <p className={s.startSub}>Світ вигорів. Ти — ні. Поки що.</p>

          <button className={s.cta} onClick={() => setShowHero(true)}>
            Продовжити
          </button>
        </div>
      )}
      {showHero && (
        <div className={`${s.hero} ${s.fadeIn}`}>
          <h1>Світ вигорів. Бункер — остання точка виживання.</h1>

          <p>
            Після вибуху зона стала хаосом. Ти — один із диваків, що
            намагається вибороти місце в бункері: професії дивні,
            хвороби нелогічні, фобії смішні… Але місць мало. Дуже мало.
          </p>

          <p>
            У цьому підземеллі вирішує не сила і не розум — вирішує те,
            як ти вмієш домовлятися та виживати серед таких самих
            аномалій долі, як і ти.
          </p>

          <div className={s.subtext}>
            Тут кожен сам за себе. А бункер — не для всіх.
          </div>

          <NavLink className={s.cta}  to='/landing'>Увійти в зону</NavLink>
        </div>
      )}

    </div>
  );
}