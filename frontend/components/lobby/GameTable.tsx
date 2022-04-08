import { LockClosedIcon, ClockIcon, StarIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";

interface GameTableProps {
    name: string;
    joined: number;
    time: number;
    points: number;
    password: boolean;
    cheating: boolean;
    bigger: boolean;
}

export default function GameTable({ name, time, points, joined, password, cheating, bigger }: GameTableProps) {
    const color = joined === 4 ? "bg-red-400" : "bg-purple-300"

    const handleJoin = () => {
        console.log("Join")
    }

    return (
        <div className="rounded-xl flex overflow-hidden w-full h-20"
            onClick={handleJoin}
        >
            <div className={`${color} w-3`} />
            <div className="py-2 px-3 bg-dark-1 grow grid grid-flow-row grid-cols-2 transition-colors duration-100 hover:bg-button-1 cursor-pointer">
                <div className="font-bold text-xl">
                    {name}
                </div>
                <div className="justify-self-end">
                    {password && <LockClosedIcon className="w-7 text-purple-300" />}
                </div>
                <div className="flex gap-1">
                    {[...Array(joined)].map((_, index) => (
                        <UserIcon key={index} className="w-7 text-purple-300" />
                    ))}
                </div>
                <div className="relative flex gap-1 justify-self-end text-xl font-semibold items-center">
                    {bigger && <PlusCircleIcon className="w-6 text-purple-300" />}
                    {cheating && <MinusCircleIcon className="w-6 text-purple-300" />}
                    {points}
                    <StarIcon className="w-7 text-purple-300" />
                    {time}
                    <ClockIcon className="w-6 text-purple-300" />
                </div>
            </div>
        </div>
    )
}