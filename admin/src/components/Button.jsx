import './styles/Button.css'

export default function Button({ children, onClick, disabled, type = 'button', id}){
    return (
        <button 
            id={id}
            className={`button ${disabled ? 'button-disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            >
            {children}
        </button>
    )
}   