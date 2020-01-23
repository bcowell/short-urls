import request from 'supertest';
import { OK, TEMPORARY_REDIRECT, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import app from 'server';

describe('Integration test', () => {

    const longUrl = 'https://github.com';
    let shortUrl = '';

    it('Shortens a Url', () => {
        return request(app)
            .post('/api/v1/shorten')
            .send({ url: longUrl })
            .set('Accept', 'application/json')
            .expect(OK)
            .expect((res) => {
                res.text.includes('/api/v1/')
            })
            .then(res => {
                shortUrl = res.text;
            })
    });
    
    it('Redirects to the long Url', () => {
        return request(app)
            .get(`/api/v1/${shortUrl}`)
            .expect(TEMPORARY_REDIRECT)
            .expect('Location', longUrl)
    });
});

describe('Error handling', () => {
    it('Error on trying to redirect to bad short Url', () => {
        return request(app)
            .get('/api/v1/BRAYDEN')
            .expect(INTERNAL_SERVER_ERROR);
    });
})