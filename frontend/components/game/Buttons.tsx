import { MinusIcon, XIcon } from "@heroicons/react/solid";
import Router from "next/router";

interface ButtonsProps {
    isCheatMode: boolean;
}

export default function Buttons({ isCheatMode }: ButtonsProps) {
    const handleLeaveGame = () => {
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