import Button from "components/common/Button";
import { PlusIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";
import GameMode from "./GameMode";
import { useState } from "react";
import Modal from "components/common/Modal";
import CreateTable from "./CreateTable";


let games1 = [{
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

let games2 = [{
    name: "Thotu",
    joined: 3,
    time: 20,
    points: 21,
    password: true,
    cheating: true,
    bigger: true
}, {
    name: "Thotuwu",
    joined: 3,
    time: 20,
    points: 21,
    password: false,
    cheating: false,
    bigger: true
}, {
    name: "Thotu2",
    joined: 4,
    time: 10,
    points: 21,
    password: true,
    cheating: false,
    bigger: true
}, {
    name: "Thotu3",
    joined: 1,
    time: 20,
    points: 11,
    password: true,
    cheating: true,
    bigger: true
}, {
    name: "Thotuwu",
    joined: 3,
    time: 20,
    points: 21,
    password: false,
    cheating: false,
    bigger: true
}, {
    name: "Thotu2",
    joined: 4,
    time: 10,
    points: 21,
    password: true,
    cheating: false,
    bigger: true
}, {
    name: "Thotu3",
    joined: 1,
    time: 20,
    points: 11,
    password: true,
    cheating: true,
    bigger: true
}, {
    name: "Thotuwu",
    joined: 3,
    time: 20,
    points: 21,
    password: false,
    cheating: false,
    bigger: true
}]

let games3 = [{
    name: "Thot",
    joined: 3,
    time: 10,
    points: 11,
    password: false,
    cheating: false,
    bigger: false
}, {
    name: "T",
    joined: 3,
    time: 20,
    points: 6,
    password: true,
    cheating: false,
    bigger: true
}, {
    name: "ADSDSA",
    joined: 4,
    time: 30,
    points: 21,
    password: true,
    cheating: true,
    bigger: true
}]

export default function Lobby() {
    const [showModal, setShowModal] = useState(false);

    const handleCreateTable = () => {
        setShowModal(true);
    }

    return (
        <div className="relative h-full grow">
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
                        <PlusIcon className="w-10 h-10 text-purple-300" />
                    </Button>
                </div>
                <div className="flex gap-16 px-4 grow justify-center">
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