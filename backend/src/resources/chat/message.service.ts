import PostModel from '@/resources/chat/message.model';
import Post from '@/resources/chat/message.interface';

class PostService {
    private post = PostModel;
    
    public async create(user: string, message: string): Promise<Post> {
        try {
            const post = await this.post.create({ user, message });

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;