import Button from "components/common/Button";
import { PlusIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";
import GameMode from "./GameMode";
import { useState } from "react";
import Modal from "components/common/Modal";
import CreateTable from "./CreateTable";

export default function Lobby() {
    const [showModal, setShowModal] = useState(false);

    const handleCreateTable = () => {
        setShowModal(true);
    }

    return (
        <div className="relative h-full">
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                >
                    <CreateTable />
                </Modal>
            )}
            <div className="flex flex-col gap-4 p-3">
                <div className="flex justify-center">
                    <Button
                        onClick={handleCreateTable}
                    >
                        <PlusIcon className="w-10 h-10 text-purple-300" />
                    </Button>
                </div>
                <div className="flex gap-16 px-4 grow items-stretch justify-center">
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                        </div>
                    }/>
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                        </div>
                    }/>
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-16 text-purple-300" />
                            vs
                            <UsersIcon className="w-16 text-purple-300" />
                        </div>
                    }/>
                </div>
            </div>
        </div>
    )
}