import { MinusIcon, XIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useUser } from "contexts/UserContext";
import Router from "next/router";
import { leaveTable } from "services/table";

interface ButtonsProps {
    isCheatMode: boolean,
    joined : number,
    id: string
}

export default function Buttons({ isCheatMode, joined, id }: ButtonsProps) {
    const { user } = useUser();

    const handleLeaveGame = async () => {
        leaveTable(id, user.uid, joined)

        Router.push("/");
    }

    const handleCheating = () => {
        
    }
    
    return (
        <div className="relative p-4">
            <div className="rounded-2xl bg-dark-1 p-4 w-min float-right">
                <div className="flex flex-row-reverse gap-4">
                    <button className="border-2 rounded-full p-4 border-purple-300 hover:bg-purple-300 hover:text-dark-1"
                        onClick={handleLeaveGame}
                        type="button"
                        title="Leave Game"
                    >
                        <XIcon className="h-8 w-8" />
                    </button>
                    {isCheatMode && (
                        <button className="border-2 rounded-full p-4 border-purple-300 hover:bg-purple-300 hover:text-dark-1"
                            onClick={handleCheating}
                            type="button"
                            title="Minus"
                        >
                            <MinusIcon className="h-8" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}