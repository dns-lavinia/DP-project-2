import { HomeIcon } from '@heroicons/react/solid';
import Chat from 'components/chat/Chat';
import UserStatus from 'components/user-status/UserStatus';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="w-full h-full items-stretch min-h-screen bg-dark-1 text-white flex flex-col overflow-hidden font-site">
            <div className="px-2">
                CRUCE
            </div>
            <div className="flex w-full grow">
                <div className="flex flex-col py-1 px-2">
                    <div className="h-16 flex justify-center items-center">
                        <div className="bg-dark-2 rounded-full p-2">
                            <HomeIcon className="w-10 h-10 text-white" />
                        </div>
                    </div>
                </div>
                <div className="flex w-full bg-dark-2 rounded-tl-xl overflow-hidden">
                    <div className="flex flex-col w-96">
                        <div className="w-full h-24 bg-dark-3 border-b border-gray-900">
                            <UserStatus />
                        </div>
                        <Chat />
                    </div>
                    <div className="w-full bg-dark-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}