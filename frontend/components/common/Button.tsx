interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button className="bg-dark-1 py-2 px-4 rounded-md transition-colors duration-100 transform hover:bg-button-2 active:bg-button-3"
            onClick={onClick}
        >
            {children}
        </button>
    )
}