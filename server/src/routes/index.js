import { Router } from 'express';

const router = Router();

const dummyRouter = Router();

const routes = [
    dummyRouter
];

router.use('/v1', routes);

export default router;