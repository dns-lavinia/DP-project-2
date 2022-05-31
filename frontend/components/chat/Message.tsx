import { useUser } from "contexts/UserContext";

interface MessageProps {
    image?: string;
    name: string;
    message: string;
    time: string;
}

export default function Message({ image, name, message, time }: MessageProps) {
    const { user } = useUser();

    const timeHourMin = time.match(/\d{1,2}:\d{2}/)?.[0];
    const timeMonthDay = time.match(/\d{1,2}\/\d{2}/)?.[0];
    const timeAMPM = time.match(/(AM|PM)/)?.[0];

    return (
        <div className="flex gap-2 items-end">
            {image ? 
                <img src={image} className="w-12 h-12 rounded-full object-cover" alt="plm"/> :
                <div className="w-12 h-12 rounded-full bg-purple-300">
                    
                </div>
            }
            <div className="w-full flex flex-col gap-1">
                <div className="w-full text-xs flex justify-between">
                    <div className="pl-2 font-bold">
                        {name}
                    </div>
                    <div>
                        {timeHourMin} {timeAMPM}, {timeMonthDay}
                    </div>
                </div>
                <div className={`rounded-xl ${name === user?.displayName ? 'bg-purple-300 text-dark-1 font-bold' : 'bg-dark-1'} py-1 px-3`}>
                    {message}
                </div>
            </div>
        </div>
    )
}