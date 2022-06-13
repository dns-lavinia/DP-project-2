interface ScoreBoardProps {
    team1Points: number;
    team2Points: number;
    team1Score: number;
    team2Score: number;
}

export default function ScoreBoard({ team1Points, team2Points, team1Score, team2Score }: ScoreBoardProps) {
    return (
        <div className="absolute p-4">
            <div className="rounded-2xl bg-dark-1 p-4 w-min">
                <div className="border border-purple-300 rounded-lg flex flex-col text-4xl font-bold font-mono divide-y divide-purple-300">
                    <div className="flex divide-x divide-purple-300">
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team1Points}
                        </div>
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team1Score}
                        </div>
                    </div>
                    <div className="flex divide-x divide-purple-300">
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team2Points}
                        </div>
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team2Score}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}