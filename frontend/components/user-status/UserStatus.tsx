import { LogoutIcon } from "@heroicons/react/outline";
import { useUser } from "contexts/UserContext";
import Router from "next/router";

interface UserStatus {
    name: string | null;
    status: string;
    image: string | null;
}

export default function UserStatus( { name, status, image }: UserStatus ) {
    const { logOut } = useUser();

    const handleLogout = () => {
        logOut()
            .then(() => {
                Router.push("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="flex gap-4 h-full w-full items-center py-2 px-4">
            {image ? 
                <img src={image} className="w-14 h-14 rounded-full" alt="plm"/> :
                <div className={`w-14 h-14 p-5 rounded-full flex justify-center items-center text-3xl text-dark-1 font-extrabold bg-purple-300`}>
                    ?
                </div>
            }
            <div className="w-full flex flex-col gap-1">
                <div className="font-bold text-lg">
                    {name}
                </div>
                {status && <div className="text-gray-300">
                    {status}
                </div>}
            </div>
            <button
                className="rounded-xl bg-purple-300 p-2 hover:bg-red-400 transition-colors duration-300"
                type="button"
                title="Logout"
                onClick={handleLogout}
            >
                <LogoutIcon className="w-10 h-10 text-dark-1" />
            </button>
        </div>
    )
}