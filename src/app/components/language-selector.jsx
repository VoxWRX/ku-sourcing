import { useLanguage } from "../context/languageContext";
import { useState, useEffect } from "react";

export default function LanguageSelector() {
    const { setLanguage } = useLanguage();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };

    if (isMobile) {
        return (
            <div className="p-6 inline-flex justify-between">
                <div onClick={() => setLanguage('en')} className="mx-2 hover:bg-gray-200 p-2 rounded" role="button" tabIndex="0">
                    🇺🇸 English
                </div>
                <div onClick={() => setLanguage('fr')} className="mx-2 hover:bg-gray-200 p-2 rounded" role="button" tabIndex="0">
                    🇫🇷 French
                </div>
                <div onClick={() => setLanguage('ar')} className="mx-2 hover:bg-gray-200 p-2 rounded" role="button" tabIndex="0">
                    🇦🇪 Arabic
                </div>
            </div>
        );
    }

    return (
        <div className="relative inline-block text-left">
            <select
                onChange={handleChange}
                className="block w-full px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
                <option value="en">🇺🇸</option>
                <option value="fr">🇫🇷</option>
                <option value="ar">🇦🇪</option>
            </select>
        </div>
    );
}