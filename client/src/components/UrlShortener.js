import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { baseUrl } from 'constants/api';
import './UrlShortener.scss';

const UrlShortener = () => {

    let [longUrl, setLongUrl] = useState('');
    let [shortUrl, setShortUrl] = useState('');
    let [showShortUrl, setShowShortUrl] = useState(false);

    const setValue = (event) => {
        const url = event.target.value;
        setLongUrl(url);
    }

    const handleShorten = async () => {
        // TODO better validation
        try {
            const valid = /^(http|https):\/\/[^ "]+$/.test(longUrl);
            if (valid) {
                const res = await axios.post(`${baseUrl}/shorten`, { 'url': longUrl });
                console.log(res);
                setShortUrl(`${baseUrl}/${res.data}`);
                setShowShortUrl(true);
            }
            else {
                console.log('Bad url. Please try another');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>short-urls</h1>
            </header>
            <div className="form-container">
                <div className="row">
                    <input className="input" onChange={setValue} value={longUrl} placeholder="Enter a url to shorten." />
                    
                        <button className="button" onClick={handleShorten}>SHORTEN</button>
                    
                </div>
                { showShortUrl
                ?   <div className="row">
                        <a href={shortUrl} target="_blank" className="short-url" rel="noopener noreferrer">{shortUrl}</a>
                        <CopyToClipboard text={shortUrl}>
                            <button className="button">COPY</button>
                        </CopyToClipboard>
                    </div>
                : ''
                }
               
            </div>
        </div>
    );
}

export default UrlShortener;