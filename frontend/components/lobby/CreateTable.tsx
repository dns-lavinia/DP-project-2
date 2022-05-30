import { PlusIcon, UserIcon, UsersIcon, LockClosedIcon, ClockIcon, StarIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import Toggle from "components/common/Toggle";
import TextField from "components/common/TextField";
import ToggleSwitch from "components/common/ToggleSwitch";
import { useState } from "react";
import Button from "components/common/Button";
import { ITable } from "types/game";
import { postTable } from "services/table";
import Router from "next/router";

interface CreateTableProps {

}

export default function CreateTable({}: CreateTableProps) {
    const [gameMode, setGameMode] = useState(2);
    const [points, setPoints] = useState(21);
    const [time, setTime] = useState(5);
    const [isIber, setIsIber] = useState(true);
    const [isCheating, setIsCheating] = useState(false);
    const [password, setPassword] = useState('');

    const [disableButton, setDisableButton] = useState(false);
    
    const handleCreateTable = async () => {
        setDisableButton(true);

        const table: ITable = {
            gameMode,
            points,
            time,
            id: Math.floor(Math.random() * 1000),
            name: "Tatu",
            joined: 1,
            password: password,
            cheating: isCheating,
            bigger: isIber
        }

        postTable(table)
            .then(res => {
                Router.push(`/game/${table.id}`)
                setDisableButton(false);
            })
            .catch(err => {
                console.log(err);
                setDisableButton(false);
            })
    }

    return (
        <div className="flex flex-col gap-4 font-semibold text-4xl">
            <div className="grid grid-cols-max-3 grid-flow-row gap-x-4 gap-y-4">
                <div className="text-right">
                    Game Mode
                </div>
                <div />
                <Toggle.Group
                    value={gameMode}
                    onChange={(value) => setGameMode(value)}
                >
                    <Toggle.Item value={0}>
                        <div className="flex text-2xl">
                            <UserIcon className="w-6" />
                            vs
                            <UserIcon className="w-6" />
                        </div>
                    </Toggle.Item>
                    <Toggle.Item value={1}>
                        <div className="flex text-2xl">
                            <UserIcon className="w-6" />
                            vs
                            <UserIcon className="w-6" />
                            vs
                            <UserIcon className="w-6" />
                        </div>
                    </Toggle.Item>
                    <Toggle.Item value={2}>
                        <div className="flex text-2xl">
                            <UsersIcon className="w-6" />
                            vs
                            <UsersIcon className="w-6" />
                        </div>
                    </Toggle.Item>
                </Toggle.Group>


                <div className="text-right">
                    Points
                </div>
                <StarIcon className="w-10 text-purple-300" />
                <div className="text-2xl font-mono">
                    <Toggle.Group
                        value={points}
                        onChange={(value) => setPoints(value)}
                    >
                        <Toggle.Item value={6}>
                            06
                        </Toggle.Item>
                        <Toggle.Item value={11}>
                            11
                        </Toggle.Item>
                        <Toggle.Item value={21}>
                            21
                        </Toggle.Item>
                    </Toggle.Group>
                </div>
                

                <div className="text-right">
                    Time
                </div>
                <ClockIcon className="w-10 text-purple-300" />
                <div className="text-2xl font-mono">   
                    <Toggle.Group
                        value={time}
                        onChange={(value) => setTime(value)}
                    >
                        <Toggle.Item value={5}>
                            05
                        </Toggle.Item>
                        <Toggle.Item value={15}>
                            15
                        </Toggle.Item>
                        <Toggle.Item value={30}>
                            30
                        </Toggle.Item>
                    </Toggle.Group>
                </div>
                

                <div className="text-right">
                    Iber
                </div>
                <PlusCircleIcon className="w-10 text-purple-300" />
                <ToggleSwitch 
                    onChange={setIsIber}
                    value={isIber}
                />


                <div className="text-right">
                    Cheating
                </div>
                <MinusCircleIcon className="w-10 text-purple-300" />
                <ToggleSwitch
                    onChange={setIsCheating}
                    value={isCheating}
                />

                <div className="text-right">
                    Password
                </div>
                <LockClosedIcon className="w-10 text-purple-300" />
                <TextField 
                    value={password}
                    type="password"
                    onChange={setPassword}
                />
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={handleCreateTable}
                    disabled={disableButton}
                >
                    Create Table
                </Button>
            </div>
        </div>
    )
}