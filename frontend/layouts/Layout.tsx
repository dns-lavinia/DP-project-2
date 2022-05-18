import { HomeIcon } from '@heroicons/react/solid';
import Chat from 'components/chat/Chat';
import UserStatus from 'components/user-status/UserStatus';
import { useEffect, useState } from 'react';
import { getMessages } from 'services/chat';
import { IMessage } from 'types/game';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        getMessages()
            .then(res => {
                const msgs: IMessage[] = res.data;
                setMessages(msgs.slice(-17));
            })
            .catch(err => console.log(err));
    })

    return (
        <div className="w-full h-screen max-h-screen bg-dark-1 text-white font-site flex flex-col">
            <div className="px-2 min-h-max">
                CRUCE
            </div>
            <div className="grow overflow-hidden">
                <div className="flex w-full h-full">
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
                            <Chat 
                                messages={messages}
                            />
                        </div>
                        <div className="w-full h-full bg-dark-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}