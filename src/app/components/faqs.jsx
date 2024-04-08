import React, { useState } from 'react';

const faqs = [
    {
        question: "How do I start sourcing a product through your platform?",
        answer: "To begin sourcing a product, simply fill out the sourcing request form on our platform. Please provide detail about the product you're looking for, including specifications, quantity, and destination country. This will help us find the best match for your needs."
    },
    {
        question: "What happens after I submit the product form?",
        answer: "Once you submit the form, our team will review your request to ensure all necessary details are provided. You will then receive a confirmation from our administration team, indicating that we have started the process of sourcing your requested product."
    },
    {
        question: "How do you ensure I get the best price on the market?",
        answer: "Our team works tirelessly to compare prices from various suppliers around the world. We leverage our extensive network and negotiating power to ensure you get the most competitive prices. Our goal is to provide you with the best value for your money."
    },
    {
        question: "How do I complete my purchase?",
        answer: "After receiving confirmation from our admin team that your product has been sourced, you will see unpaid status on your order then you can see quotation and proceed to complete your purchase. This involves confirming your order details and proceeding with payment through our secure payment system."
    },
    {
        question: "What if I have specific requirements for my product?",
        answer: "If you have specific requirements or customizations for your product, please mention them in the product form. Our team will work closely with suppliers to meet your specifications and ensure the product meets your needs, or simply contact us via whatsapp."
    },
];

const FaqItem = ({ faq, isActive, toggle }) => {
    return (
        <div className="p-4 mb-2 bg-white shadow-lg rounded-md">
            <h3 className="text-lg font-semibold cursor-pointer" onClick={toggle}>
                {faq.question}
            </h3>
            <div className={`mt-2 text-gray-600 transition-height duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-96' : 'max-h-0'}`}>
                {faq.answer}
            </div>
        </div>
    );
};

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <div className="text-center mb-8">
                <h2 className="text-3xl text-gray-600 font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FaqItem
                        key={index}
                        faq={faq}
                        isActive={activeIndex === index}
                        toggle={() => toggleFAQ(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Faqs;