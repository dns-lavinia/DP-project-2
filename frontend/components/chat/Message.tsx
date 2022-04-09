interface MessageProps {
    image: string;
    name: string;
    message: string;
}

export default function Message({ image, name, message }: MessageProps) {
    return (
        <div className="flex gap-2 items-end">
            <img src={image} className="w-12 h-12 rounded-full object-cover" alt="plm"/>
            <div className="w-full flex flex-col gap-1">
                <div className="pl-2 text-xs font-bold">
                    {name}
                </div>
                <div className="rounded-xl bg-dark-1 py-1 px-3">
                    {message}
                </div>
            </div>
        </div>
    )
}