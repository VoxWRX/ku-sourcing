"use client"

import React, { useState } from 'react';
import emailjs from 'emailjs-com';


const ContactForm = () => {
    // State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const userId = process.env.NEXT_PUBLIC_USER_ID;

        const templateParams = {
            sendername: name,
            replyto: email,
            subject: subject,
            message: message,
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then((result) => {
                alert('Message Sent, We will get back to you shortly', result.text);
            }, (error) => {
                alert('An error occurred, Please try again', error.text);
            });

        // Reset form fields
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');

    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">LET'S GET IN TOUCH</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
                    <div className="w-full px-2 md:w-1/3">
                        <label className="block mb-1 font-medium text-gray-700" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Your Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full px-2 md:w-1/3">
                        <label className="block mb-1 font-medium text-gray-700" htmlFor="email">Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full px-2 md:w-1/3">
                        <label className="block mb-1 font-medium text-gray-700" htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Your Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block mb-1 font-medium text-gray-700" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className="w-full h-32 border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <div className="text-right mt-4">
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
