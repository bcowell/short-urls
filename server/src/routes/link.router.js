import { Router } from 'express';
import { shortenUrl, redirectToShortUrl } from 'controllers/link.controller';

const router = Router();

router.post('/shorten', shortenUrl); // shorten(url), which shortens the url into an alphanumeric string.
router.get('/:shortUrl', redirectToShortUrl); // redirect, which redirects when a shortened url is visited

export default router;