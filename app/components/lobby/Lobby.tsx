import Button from "components/common/Button";
import { PlusIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";
import GameMode from "./GameMode";
import { useEffect, useState } from "react";
import Modal from "components/common/Modal";
import CreateTable from "./CreateTable";
import { getTables } from "services/table";
import { ITable } from "types/game";
import io, { Socket } from "socket.io-client";
import Router from "next/router";
import { gameSocket } from "utils/sockets";
import { useUser } from "contexts/UserContext";

// let tableSocket: Socket;

export default function Lobby() {
    const [showModal, setShowModal] = useState(false);
    const [tables, setTables] = useState<ITable[]>([]);

    const [ping, setPing] = useState(0);

    const { user } = useUser();

    const tables1v1 = tables.filter(table => table.gameMode === 0);
    const tables1v1v1 = tables.filter(table => table.gameMode === 1);
    const tables2v2 = tables.filter(table => table.gameMode === 2);

    useEffect(() => {
        getTables()
            .then(res => {
                const tables: ITable[] = res.data

                setTables(tables)
                setTimeout(() => setPing(ping + 1), 1000)
                // initializeSocket()
            })
    }, [ping])

    // const initializeSocket = async () => {
    //     await fetch('api/socket');
    //     tableSocket ??= io('/table')

    //     tableSocket.on('connect', () => {
    //         // console.log('connected')
    //     })

    //     gameSocket.on('connect', () => {
    //         // console.log('connected')
    //     })

    //     tableSocket.on('update-tables', ({tables, table}) => {
    //         console.log('update-tables')
    //         setTables([...tables, table])
    //     })
    // }

    const handleTableModal = () => {
        setShowModal(true);
    }

    const handleCreateTable = (table: ITable) => {
        gameSocket.emit('create-game', {gameId: table.id, user: {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL,
        }})
    }

    const handleJoinTable = (id: string) => {
        gameSocket.emit('join-game', {gameId: id, user: {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL,
        }})
    }

    return (
        <div className="relative h-full">
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                >
                    <CreateTable onTableCreated={handleCreateTable} />
                </Modal>
            )}
            <div className="flex flex-col gap-4 p-3 h-full">
                <div className="flex justify-center">
                    <Button
                        onClick={handleTableModal}
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
                        games={tables1v1}
                        onJoin={handleJoinTable}
                    />
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                        </div>}
                        games={tables1v1v1}
                        onJoin={handleJoinTable}
                    />
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-16 text-purple-300" />
                            vs
                            <UsersIcon className="w-16 text-purple-300" />
                        </div>}
                        games={tables2v2}
                        onJoin={handleJoinTable}
                    />
                </div>
            </div>
        </div>
    )
}