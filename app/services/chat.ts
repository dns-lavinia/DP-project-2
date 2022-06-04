import axios from 'axios';
import { IMessage } from 'types/game';

export async function getMessages() {
    const url = 'http://localhost:3000/api/chat';

    return await axios.get(url);
}

export async function postMessage(message: IMessage) {
    const url = 'http://localhost:3000/api/chat';

    return await axios.post(url, message);
}