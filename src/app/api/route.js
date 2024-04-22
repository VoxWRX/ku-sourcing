import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {

    // Parsing the incoming request data
    const data = await request.json();    
    const { text, targetLang } = data;

    if (!text || !targetLang) {
        return NextResponse.json({ message: 'Bad Request: Missing required fields' });
    }

    try {
        const response = await axios.post('http://ec2-34-228-11-94.compute-1.amazonaws.com/translate', {
            q: text,
            source: 'en',
            target: targetLang,
            format: 'text'
        });

       return  NextResponse.json({ translatedText: response.data.translatedText });
    } catch (error) {
       return  NextResponse.json({ message: 'Translation failed', error: error.toString() });
    }
}
