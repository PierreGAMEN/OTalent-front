import { useState } from 'react';
import Carousel from './Carousel';
import React from 'react';
import Certification from '/public/assets/Certification-bro';

/**
 * Hero component
 * @returns {tsX.Element} The rendered Hero component
 */
export default function Hero() {
    // State for the current training
    const [training, setTraining] = useState('');

    /**
     * Update the current training
     * @param newTraining - The new training
     */
    const updateTraining = (newTraining) => {
        setTraining(newTraining);
    };

    return (
        <div className="sm:pr-20 sm:pl-20 bg-primary-color text-white flex flex-col xl:flex-row h-screen box-border p-5">
            <div className="mt-10 flex items-center justify-start flex-col w-full xl:m-0 xl:justify-center xl:w-2/3 xl:items-stretch">
                <h2 className="text-4xl font-extrabold uppercase font-title tracking-wider text-center xl:text-7xl xl:text-left">
                    O'Talent <br /> simplifie vos recherches <br /> de formations
                </h2>
                <p className="mt-10 text-3xl hidden xl:inline">
                    Dès aujourd'hui, devenez <br />
                    <span className="font-bold text-5xl"> {training}</span>
                </p>
                <div
                    className="w-64 mt-5 min-w-64 xl:hidden"
                    alt="Certification"><Certification/></div>
                <button
                    className="button outlined mt-10 w-64"
                    onClick={() => (window.location.href = '#training_list')}
                    aria-label="Découvrez nos formations">
                    <h4>Découvrez nos formations</h4>
                </button>
            </div>
            <div className="w-1/2 mb-12 hidden xl:flex items-center">
                <Carousel updateTraining={updateTraining} />
            </div>
        </div>
    );
}
