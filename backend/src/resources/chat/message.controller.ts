import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/chat/message.validation';
import PostService from '@/resources/chat/message.service';

class PostController implements Controller {
    public path = '/chat';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { user, message } = req.body;

            const post = await this.PostService.create(user, message);

            res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, 'Cannot send message'));
        }
    };
}

export default PostController;