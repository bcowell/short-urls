import request from 'supertest';
import { OK, TEMPORARY_REDIRECT, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import app from 'server';

describe('Integration test', () => {

    const longURL = 'https://github.com';
    let shortURL = '';

    it('Shortens a URL', () => {
        return request(app)
            .post('/api/v1/shorten')
            .send({ url: longURL })
            .set('Accept', 'application/json')
            .expect(OK)
            .expect((res) => {
                res.text.includes('/api/v1/')
            })
            .then(res => {
                shortURL = res.text;
            })
    });
    
    it('Redirects to the long URL', () => {
        return request(app)
            .get(shortURL)
            .expect(TEMPORARY_REDIRECT)
            .expect('Location', longURL)
    });
});

describe('Error handling', () => {
    it('Error on trying to redirect to bad short URL', () => {
        return request(app)
            .get('/api/v1/BRAYDEN')
            .expect(INTERNAL_SERVER_ERROR);
    });
})