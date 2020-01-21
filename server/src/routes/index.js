import { Router } from 'express';
import LinkRouter from './link.router';

const router = Router();

const routes = [
    LinkRouter
];

router.use('/v1', routes);

export default router;