import type { ITable } from "types/game";
import GameTable from "./GameTable";

interface GameModeProps {
    title: React.ReactNode;
    games: ITable[];
}

export default function GameMode({ title, games }: GameModeProps) {

    return (
        <div className="bg-dark-2 items-center grow py-2 px-4 rounded-xl flex flex-col gap-4 basis-0 overflow-hidden">
            <div className="text-3xl font-bold">
                {title}
            </div>
            {games.map(({id, name, joined, time, points, password, cheating, bigger}, index) => (
                <GameTable 
                    key={index}
                    id={id}
                    name={name} 
                    joined={joined} 
                    time={time} 
                    points={points} 
                    password={password}
                    cheating={cheating}
                    bigger={bigger}
                />
            ))}
        </div>
    )
}