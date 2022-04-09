interface TextFieldProps {
    value: string;
    type: string;
    placeholder?: string;
    title?: string;
    onChange: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TextField({ value, type, placeholder, title, onChange, onKeyDown }: TextFieldProps) {
    return (
        <input className="h-10 w-full bg-dark-1 px-3 py-4 rounded-md caret-purple-300 text-md focus:outline-none"
            title={title}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
        />
    )
}