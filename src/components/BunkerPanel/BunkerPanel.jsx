import s from "./BunkerPanel.module.css";

export default function BunkerPanel({ title, subtitle, children }) {
    return (
        <div className={s.panelWrapper}>
        <div className={`${s.panel} ${s.fadeIn}`}>

            {title && <h1 className={s.title}>{title}</h1>}
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}

            <div className={s.content}>
            {children}
            </div>

        </div>
        </div>
    );
}
