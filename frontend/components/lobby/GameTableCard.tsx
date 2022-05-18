import { LockClosedIcon, ClockIcon, StarIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";
import type { ITable } from "types/game";
import Router from "next/router";

interface GameTableCardProps extends ITable {}

export default function GameTableCard({ name, time, points, joined, password, cheating, bigger }: GameTableCardProps) {
    const full = joined === 4
    const color = full ? "bg-red-400" : "bg-purple-300"
    const transition = "transition-colors ease-in-out duration-300"

    const handleJoin = () => {
        if (full) return
        
        Router.push(`/game/54373753`)
    }

    return (
        <div className="w-full h-20 min-h-min">
            <div className={`group rounded-xl flex w-full h-full overflow-hidden cursor-pointer ${full && 'pointer-events-none'}`}
                onClick={handleJoin}
            >
                <div className={`${color} w-3 ${transition} group-hover:bg-dark-1`} />
                <div className={`py-2 px-3 bg-dark-1 grow grid grid-flow-row grid-cols-2 ${transition} group-hover:bg-purple-300`}>
                    <div className="font-bold text-xl">
                        {name}
                    </div>
                    <div className="justify-self-end">
                        {password && <LockClosedIcon className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`} />}
                    </div>
                    <div className="flex gap-1">
                        {[...Array(joined)].map((_, index) => (
                            <UserIcon key={index} className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`} />
                        ))}
                    </div>
                    <div className="relative flex gap-1 justify-self-end text-xl font-semibold items-center">
                        {bigger && <PlusCircleIcon className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`} />}
                        {cheating && <MinusCircleIcon className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`} />}
                        {points}
                        <StarIcon className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`} />
                        {time}
                        <ClockIcon className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`} />
                    </div>
                </div>
            </div>
        </div>
    )
}