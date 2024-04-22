"use client"

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/languageContext';


// A utility function to fetch translation from API endpoint.
async function fetchTranslation(text, targetLang) {
    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, targetLang }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: 'Failed to fetch translation' };
    }
}

// component for displaying translated text.
function TranslateComponent({ text }) {
    const { language } = useLanguage();
    const [translated, setTranslated] = useState(text);

    useEffect(() => {

        if (language !== 'en') {
            fetchTranslation(text, language)
                .then((data) => {
                    if (data && data.translatedText) {
                        setTranslated(data.translatedText);
                    } else {
                        setTranslated('Translation error.');
                    }
                })
                .catch((error) => {
                    setTranslated('Translation error.', error);
                });
        } else {
            setTranslated(text);
        }
    }, [text, language]);

    return <span>{translated}</span>;
}

export default TranslateComponent;