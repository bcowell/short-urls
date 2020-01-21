import { OK, INTERNAL_SERVER_ERROR, TEMPORARY_REDIRECT, BAD_REQUEST } from 'http-status-codes';
import Link from 'models/link.model';
import Hashids from 'hashids/cjs';
import salt from 'constants/api';

const shortenURL = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url || !url.length) {
            return res
                .status(BAD_REQUEST)
                .send({ 'message': 'Please provide a URL.' })
        }

        // Increment db count
        let _id = 0;
        Link.countDocuments().then(res => { _id = res });

        console.log(`Encoding ${_id}`)
        const hashids = new Hashids(salt);
        const encodedID = hashids.encode(_id);
        console.log(encodedID);

        const shortURL = new Link({ _id, url: `http://localhost:3001/api/v1/${encodedID}` });
        shortURL.save((err, shortURL) => {
            if (err) { return console.error(err); }
            return res
                .status(OK)
                .send(shortURL);
        });
    }
    catch (err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .send({ 'error': err });
    }
}

const redirectToShortURL = (req, res) => {
    try {
        const hashids = new Hashids(salt);
        console.log(req.params.shortURL);
        const id = hashids.decode(req.params.shortURL);
        // When decoding, output is always an array of numbers (even if you encode only one number)
        console.log(id);
        res.redirect(TEMPORARY_REDIRECT, 'https://google.ca')
    }
    catch (err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .send({ 'error': err });
    }
}



export { shortenURL, redirectToShortURL };