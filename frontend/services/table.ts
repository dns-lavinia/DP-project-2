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