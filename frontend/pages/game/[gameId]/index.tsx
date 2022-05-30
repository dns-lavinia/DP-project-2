import Game from "components/game/Game";
import { NextPageContext } from "next";

interface GamePageProps {
    id: string;
}

export default function GamePage({ id }: GamePageProps) {
    return (
        <Game id={id}/>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { gameId } = context.query;
    
    return {
        props: {
            id: gameId as string
        }
    }
}