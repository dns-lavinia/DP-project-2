interface UserStatus {

}

export default function UserStatus() {
    const user = {
        image: "https://cdn.discordapp.com/attachments/264502274032664587/962125111597625434/unknown.png",
        name: "Tony Montana",
        status: "online",
    }

    const { image, name, status } = user;
    
    return (
        <div className="flex gap-4 h-full w-full items-center p-2">
            <img src={image} className="w-14 h-14 rounded-full" alt="plm"/>
            <div className="w-full flex flex-col gap-1">
                <div className="font-bold text-lg">
                    {name}
                </div>
                {status && <div className="text-gray-300">
                    {status}
                </div>}
            </div>
        </div>
    )
}