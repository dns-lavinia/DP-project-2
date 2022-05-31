import axios from 'axios';
import { ITable } from 'types/game';

export async function getTables() {
    const url = 'http://localhost:3000/api/tables';

    return await axios.get(url)
}

export async function postTable(table: ITable) {
    const url = 'http://localhost:3000/api/tables';

    return await axios.post(url, table)
}

export async function joinTable(id: string, name: string, photo: string, joined: number) {
    const url1 = `http://localhost:3000/api/tables/${id}`;

    const table = {
        joined: joined + 1,
    }

    const url2 = `http://localhost:3000/api/game/${id}`;
    const game = {
        joined: joined + 1,
        player: {
            name: name,
            photo: photo,
        }
    }


    return await axios.put(url2, game)
    // Promise.all([
    //     axios.put(url1, table),
    //     axios.put(url2, game)
    // ])
}