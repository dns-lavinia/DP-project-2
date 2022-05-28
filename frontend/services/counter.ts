import axios from 'axios';

export async function getId() {
    const url = 'http://localhost:3000/api/counters';

    return await axios.get(url)
}

export async function modifyId(id: number) {
    const url = 'http://localhost:3000/api/counters';

    return await axios.post(url, id)
}