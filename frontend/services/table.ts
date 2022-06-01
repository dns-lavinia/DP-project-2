import axios from 'axios';
import { User } from 'firebase/auth';
import { ITable } from 'types/game';

export async function getTables() {
    const url = 'http://localhost:3000/api/tables';

    return await axios.get(url)
}

export async function getTable(id: string) {
    const url = `http://localhost:3000/api/tables/${id}`;

    return await axios.get(url)
}

export async function postTable(table: ITable) {
    const url = 'http://localhost:3000/api/tables';

    return await axios.post(url, table)
}

export async function joinTable(id: string, user: User, joined: number) {
    const url1 = `http://localhost:3000/api/tables/${id}`;
    const url2 = `http://localhost:3000/api/game/${id}?method=JOIN`;

    const table = {
        joined: joined + 1,
    }

    const game = {
        joined: joined + 1,
        player: {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL,
        }
    }

    return await Promise.all([
        axios.put(url1, table),
        axios.put(url2, game)
    ])
}

async function deleteTable(id: string) {
    const url1 = `http://localhost:3000/api/tables/${id}`;
    const url2 = `http://localhost:3000/api/game/${id}`;

    return await Promise.all([
        axios.delete(url1),
        axios.delete(url2)
    ])
}

export async function leaveTable(id: string, playerId: string, joined: number) {
    if (joined === 1) {
        return await deleteTable(id)
    }

    const url1 = `http://localhost:3000/api/tables/${id}`;
    const url2 = `http://localhost:3000/api/game/${id}?method=LEAVE`;

    const table = {
        joined: joined - 1,
    }

    const game = {
        joined: joined - 1,
        playerId: playerId,
    }

    return await Promise.all([
        axios.put(url1, table),
        axios.put(url2, game)
    ])
}