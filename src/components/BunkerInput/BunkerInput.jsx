import s from "./BunkerInput.module.css";

export default function BunkerInput({ value, onChange, placeholder }) {
    return (
        <input
        className={s.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        />
    );
}
