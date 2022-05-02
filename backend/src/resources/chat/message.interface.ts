import {Document} from 'mongoose'

export default interface Post extends Document{
    user: string
    message: string
}