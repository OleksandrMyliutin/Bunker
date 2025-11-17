import clsx from 'clsx';
import s from './Button.module.css'
const Button = ({
    size = 'md',
    variant = 'fill',
    color = 'blue',
    onClick,
    style,
    children,
}) => {
    return (
        <>
            <button style={style} className={clsx(s.button, s[size], s[variant], s[color])} onClick={onClick}>{children}</button>
        </>
    )
}

export default Button