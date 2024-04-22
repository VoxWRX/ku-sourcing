import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // You may choose other icons
import TranslateComponent from './translate-comp';

const steps = ['Select Product', 'Confirmation', 'Complete Purchase', 'Get Products'];

const Steps = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleStepEnter = (index) => {
        setCurrentStep(index);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-x-6 sm:mt-0">
                {steps.map((step, index) => (
                    <Step
                        key={step}
                        title={step}
                        index={index}
                        active={currentStep >= index}
                        onEnter={() => handleStepEnter(index)}
                        onLeave={() => handleStepEnter(0)}
                    />
                ))}
            </div>
            <motion.div
                className="h-1 bg-gray-200 rounded-full overflow-hidden mt-4 w-full max-w-xl mx-auto"
                initial={false}
            >
                <motion.div
                    className="h-full bg-blue-500"
                    style={{ width: (currentStep / (steps.length - 1)) * 100 + '%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
            </motion.div>
        </div>
    );
};

const Step = ({ title, index, active, onEnter, onLeave }) => {
    const iconVariants = {
        active: { scale: 1.2 },
        inactive: { scale: 1 }
    };

    return (
        <div
            className="flex flex-col items-center relative cursor-pointer"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <motion.div
                className="flex items-center justify-center text-white"
                variants={iconVariants}
                animate={active ? 'active' : 'inactive'}
            >
                {active ? (
                    <FaCheckCircle size="2em" className="text-blue-500" />
                ) : (
                    <FaRegCircle size="2em" className="text-gray-300" />
                )}
            </motion.div>
            <span className={`text-xs mt-2 font-semibold ${active ? 'text-blue-500' : 'text-gray-500'}`}>
                <TranslateComponent text={title} />
            </span>
            <span className="absolute top-0 -mt-8 text-sm font-bold text-gray-700">{index + 1}</span>
        </div>
    );
};

export default Steps;
