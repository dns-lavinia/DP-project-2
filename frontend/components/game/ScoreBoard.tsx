interface ScoreBoardProps {
    team1Points: number;
    team2Points: number;
    team1PointsTotal: number;
    team2PointsTotal: number;
}

export default function ScoreBoard({ team1Points, team2Points, team1PointsTotal, team2PointsTotal }: ScoreBoardProps) {
    return (
        <div className="relative p-4">
            <div className="rounded-2xl bg-dark-1 p-4 w-min">
                <div className="border border-purple-300 rounded-lg grid grid-rows-2 grid-flow-col divide text-2xl font-bold font-mono                          ">
                    <div className="p-4">
                        {team1Points}
                    </div>
                    <div className="p-4">
                        {team1PointsTotal}
                    </div>
                    <div className="p-4">
                        {team2Points}
                    </div>
                    <div className="p-4">
                        {team2PointsTotal}
                    </div>
                </div>
            </div>
        </div>
    )
}