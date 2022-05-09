import {Schema, model} from 'mongoose'
import Post from '@/resources/chat/message.interface'

const PostSchema = new Schema(
    {
        user: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export default model<Post>('Post', PostSchema)