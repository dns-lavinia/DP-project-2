import GameTable from "./GameTable";

interface GameModeProps {
    title: React.ReactNode;
}

export default function GameMode({ title }: GameModeProps) {
    let games = [{
        name: "Thotu",
        joined: 2,
        time: 10,
        points: 11,
        password: false,
        cheating: false,
        bigger: false
    }, {
        name: "Thotu",
        joined: 3,
        time: 20,
        points: 6,
        password: true,
        cheating: true,
        bigger: true
    }, {
        name: "Thotu",
        joined: 1,
        time: 10,
        points: 21,
        password: true,
        cheating: false,
        bigger: true
    }, {
        name: "Thotu",
        joined: 4,
        time: 20,
        points: 11,
        password: true,
        cheating: true,
        bigger: false
    }]

    return (
        <div className="bg-dark-2 items-center grow py-2 px-4 rounded-xl flex flex-col gap-4 basis-0">
            <div className="text-3xl font-bold">
                {title}
            </div>
            {games.map(({name, joined, time, points, password, cheating, bigger}, index) => (
                <GameTable 
                    key={index}
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