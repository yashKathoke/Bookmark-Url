import { useState, useEffect } from 'react';

const usePageInfo = (url) => {
    const [pageTitle, setPageTitle] = useState(null);
    const [faviconUrl, setFaviconUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageInfo = async () => {
            try {
                console.log('Fetching page info for:', url);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const htmlText = await response.text();
                // console.log('HTML Text:', htmlText);

                // Create a DOM parser
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');

                // Extract title
                const title = doc.querySelector('title')?.textContent;
                console.log('Page Title:', title);
                setPageTitle(title || 'No title found');

                // Extract favicon
                const iconLink = doc.querySelector("link[rel~='icon']")?.getAttribute('href') ||
                                 doc.querySelector("link[rel='shortcut icon']")?.getAttribute('href');
                console.log('Favicon Link:', iconLink);
                setFaviconUrl(iconLink ? new URL(iconLink, url).href : new URL('/favicon.ico', url).href);
            } catch (error) {
                // console.error('Failed to fetch the page info:', error);
                setError('Error fetching page info');
                setPageTitle('Error fetching title');
                setFaviconUrl(null);
            }
        };

        if (url) {
            fetchPageInfo();
        }
    }, [url]);

    return { pageTitle, faviconUrl, error };
};

export default usePageInfo;
