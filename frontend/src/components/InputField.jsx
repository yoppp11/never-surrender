import './styles/InputField.css'

export default function InputField({ label, type, placeholder, value, onChange, error, name }){
    return (
        <div className="input-container">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
            />
            {error && <p className="input-error">{error}</p>}
        </div>
    )
}