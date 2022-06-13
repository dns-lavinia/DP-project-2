import Game from "components/game/Game";
import { NextPageContext } from "next";
import { getTable } from "services/table";
import { ITable } from "types/game";

interface GamePageProps {
    id: string;
    table: ITable;
}

export default function GamePage({ id, table }: GamePageProps) {
    return (
        // <Game id={id} table={table}/>
        <div>
            HATZ
        </div>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { gameId } = context.query;

    // const table = await getTable(gameId as string);
    
    return {
        props: {
            // id: gameId as string,
            // table: table.data
        }
    }
}