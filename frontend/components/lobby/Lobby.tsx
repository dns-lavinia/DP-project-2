import Button from "components/common/Button";
import { PlusIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";
import GameMode from "./GameMode";
import { useEffect, useState } from "react";
import Modal from "components/common/Modal";
import CreateTable from "./CreateTable";
import { getTables } from "services/table";
import { ITable } from "types/game";

export default function Lobby() {
    const [showModal, setShowModal] = useState(false);
    const [games1, setGames1] = useState<ITable[]>([]);
    const [games2, setGames2] = useState<ITable[]>([]);
    const [games3, setGames3] = useState<ITable[]>([]);

    const handleCreateTable = () => {
        setShowModal(true);
    }

    useEffect(() => {
        getTables()
            .then(res => {
                const tables: ITable[] = res.data

                setGames1(tables.filter(table => table.gameMode === 0));
                setGames2(tables.filter(table => table.gameMode === 1));
                setGames3(tables.filter(table => table.gameMode === 2));
            })
    })

    return (
        <div className="relative h-full">
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                >
                    <CreateTable />
                </Modal>
            )}
            <div className="flex flex-col gap-4 p-3 h-full">
                <div className="flex justify-center">
                    <Button
                        onClick={handleCreateTable}
                    >
                        <PlusIcon className="w-10 h-10" />
                    </Button>
                </div>
                <div className="flex gap-16 px-4 h-full justify-center overflow-hidden">
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                        </div>}
                        games={games1}    
                    />
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                        </div>}
                        games={games2}
                    />
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-16 text-purple-300" />
                            vs
                            <UsersIcon className="w-16 text-purple-300" />
                        </div>}
                        games={games3}
                    />
                </div>
            </div>
        </div>
    )
}