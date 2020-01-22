import { OK, INTERNAL_SERVER_ERROR, TEMPORARY_REDIRECT, BAD_REQUEST } from 'http-status-codes';
import Link from 'models/link.model';
import Counter from 'models/click.model';
import Hashids from 'hashids/cjs';
import salt from 'constants/api';

const shortenURL = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url || !url.length) {
            return res
                .status(BAD_REQUEST)
                .send({ 'message': 'Please provide a URL.' });
        }

        let _id = 1;
        const docCount = await Link.countDocuments();
        _id = docCount;

        const hashids = new Hashids(salt);
        const encodedID = hashids.encode(_id);

        const shortURL = new Link({ _id, url });
        await shortURL.save();
        return res
            .status(OK)
            .send(`http://localhost:3001/api/v1/${encodedID}`);
    }
    catch (err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .send({ 'error': err });
    }
}

const redirectToShortURL = async (req, res) => {
    try {
        const hashids = new Hashids(salt);
        // When decoding, output is always an array of numbers (even if you encode only one number)
        const id = hashids.decode(req.params.shortURL);
        if (!id.length) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send({ 'message': 'URL not found in database.' });
        }
        const link = await Link.findOne({ _id: id });
        await Counter.findOneAndUpdate(
            { '_id': id }, 
            { '$inc': { count : 1 } },
            { 'upsert': true }
        ).exec();
        return res.redirect(TEMPORARY_REDIRECT, link.url);
    }
    catch (err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .send({ 'error': err });
    }
}



export { shortenURL, redirectToShortURL };