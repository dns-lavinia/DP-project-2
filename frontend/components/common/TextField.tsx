interface TextFieldProps {
    value: string;
    type: string;
    placeholder?: string;
    title?: string;
    onChange: (value: string) => void;
}

export default function TextField({ value, type, placeholder, title, onChange }: TextFieldProps) {
    return (
        <input className="h-10 w-80 bg-dark-1 px-3 py-2 rounded-md"
            title={title}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}