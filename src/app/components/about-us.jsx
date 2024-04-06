"use client"

import React from 'react';
import Lottie from 'lottie-react';
import AnimationExpertise from '../../../public/AnimationExpertise.json';
import AnimationSourcing from '../../../public/AnimationSourcing.json';
import AnimationDiscount from '../../../public/AnimationDiscount.json';



const About = () => {
    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Connecting You to the World's Largest Marketplace</h2>
                    <p className="my-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Here's what sets us apart:
                    </p>
                </div>

                <div className="flex flex-col pt-4 md:grid md:grid-cols-2 md:gap-8 mt-10">
                    <div className="flex justify-center items-center mt-10 md:mt-0">
                        <Lottie animationData={AnimationSourcing}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
                        />
                    </div>

                    <div className="flex flex-col justify-center mt-8 sm:mt-0">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Simplified Sourcing</h4>
                        <p className="mt-2 text-base text-gray-500">
                            Our user-friendly web app makes sourcing products easier than ever.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 md:gap-8 mt-10 pt-4">
                    <div className="mt-8 md:mt-0">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Expertise at Your Fingertips</h4>
                        <p className="mt-2 text-base text-gray-500">
                            Our team of experienced professionals is here to guide you every step of the way.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center items-center mt-10 md:mt-0">
                        <Lottie animationData={AnimationExpertise}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: 'auto', maxWidth: '250px' }}
                        />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-8 mt-10 pt-4">
                    <div className="flex justify-center items-center mt-10 md:mt-0">
                        <Lottie animationData={AnimationDiscount}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-8 sm:mt-0">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Competitive Prices</h4>
                        <p className="mt-2 text-base text-gray-500">
                            We understand the importance of finding high-quality products at the best possible prices.
                        </p>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default About;
