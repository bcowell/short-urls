import { Router } from 'express';
import { shortenURL, redirectToShortURL } from 'controllers/link.controller';

const router = Router();

router.post('/shorten', shortenURL); // shorten(url), which shortens the url into an alphanumeric string.
router.get('/:shortURL', redirectToShortURL); // redirect, which redirects when a shortened url is visited

export default router;