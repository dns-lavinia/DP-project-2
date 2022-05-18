import type { NextPage } from 'next'

const Home: NextPage = () => {
    return (
        <div className="h-full max-h-full">
            <div className='bg-white w-96 h-full max-h-full p-4 flex flex-col gap-4 overflow-y-scroll'>
                {[...Array(30)].map((_, index) => (
                    <div className='bg-black h-96 w-full text-white'>
                        kjdsfgdsggggggggggggggggggggggggg gfdgdfjksdb kjbdsfjkafjkk sdjkbfjk jksdbfk bkjlsjd fbkljdsbf jkdsbfkjbjkdbjfdjb bfjd blkfjdsbjkfs

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
