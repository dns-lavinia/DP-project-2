import { useUser } from "contexts/UserContext"
import Router from "next/router"

export default function Auth() {
    const { logInGoogle } = useUser()

    const handleGoogleLogin = async () => {
        try {
            await logInGoogle()
            Router.push('/')
        }
        catch (error) {
            console.log(error)
        }
    }

    // const handleTwitterLogin = async () => {
    //     try {
    //         await logInTwitter()
    //         Router.push('/')
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div className="flex flex-col gap-6 items-center">
            <div className="text-5xl text-purple-300">
                Cruce
            </div>
            <button className="flex items-center justify-center gap-3 w-full px-6 py-2 mx-2 text-xl font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400"
                onClick={handleGoogleLogin}
            >
                <GoogleIcon />
                <div className="hidden mx-2 sm:inline">Sign in with Google</div>
            </button>
        </div>
    )
}

const GoogleIcon = () => (
    <svg className="h-6 w-6 fill-current stroke-current" viewBox="0 0 24 24">
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
    </svg>
)

const TwitterIcon = () => (
    <svg className="h-5 w-5 fill-current stroke-current" viewBox="0 0 24 24" >
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
    </svg>
)