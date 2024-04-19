import { useEffect, useRef, useCallback } from 'react';
import WhitePath from '../../../assets/WhitePath';
import React from 'react';
import Treasure from '/public/assets/Treasure-bro';
import Account from '/public/assets/Account-bro';
import Typing from '/public/assets/Typing-bro';
import ColoredPath from '/public/assets/ColoredPath';

/**
 * Guide component displays a guide with a scrolling effect.
 */
const Guide = () => {
    // useRef is used to create references to the SVG container and the SVG white path elements
    const svgContainerRef = useRef(null);
    const svgWhiteRef = useRef(null);

    // handleScroll is a callback function that is called when the user scrolls
    const handleScroll = useCallback(() => {
        // svgContainer and svgWhite are the current values of the references to the SVG elements
        const svgContainer = svgContainerRef.current;
        const svgWhite = svgWhiteRef.current;

        // If either of the SVG elements is not found, exit the function
        if (!svgContainer || !svgWhite) return;

        // scrollTop is the current scroll position, adjusted to be in the middle of the viewport
        const scrollTop = window.pageYOffset + window.innerHeight / 2;

        // svgContainerTop and svgContainerBottom are the top and bottom positions of the SVG container
        const svgContainerTop = svgContainer.offsetTop;
        const svgContainerBottom = svgContainerTop + svgContainer.offsetHeight;

        // If the scroll position is above the SVG container, exit the function
        if (scrollTop >= svgContainerTop) {
            // scrollPosition is the current scroll position relative to the SVG container, scaled to be between 0 and 50
            const scrollPosition = Math.floor(
                ((scrollTop - svgContainerTop) /
                    (svgContainerBottom - svgContainerTop)) *
                    50
            );

            // Update the clip path of the SVG white path to create a scrolling effect
            svgWhite.style.clipPath = `inset(${scrollPosition}% 0 0 0)`;
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div
            className="pb-20 min-h-60 h-fit xl:h-screen flex flex-col justify-start bg-secondary-background bg-texture bg-center bg-cover bg-no-repeat bg-opacity-5  overflow-hidden"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(244, 230, 188, 0.7), rgba(244, 230, 188, 0.7)), url('/src/assets/Texture 7.png')",
            }}>
            <h3 className="text-center pt-10 pb-10 uppercase">
                La route vers le succès
            </h3>
            <div className="flex flex-col xl:flex-row h-full w-full items-start justify-center gap-2">
                <div className="flex flex-col h-full justify-center items-center w-full">
                    <div className="relative flex flex-col p-5 gap-2 w-1/2 bg-white rounded-2xl shadow-xl shadow-black min-w-72">
                        <div className='absolute hidden xl:block w-48 -left-32 -top-40'><Treasure/></div>
                        <h4>Découvrez nos formations</h4>
                        <p>
                            Parcourez la liste de nos formations pour trouver
                            celle qui vous convient et ajoutez-les à vos favoris
                        </p>
                    </div>
                </div>
                <div
                    id="svg-container"
                    className="relative w-1/6 h-[350px] hidden xl:flex"
                    ref={svgContainerRef}>
                    <div
                        id="svg-black"
                        className=" text-primary-color absolute">
                        <ColoredPath />
                    </div>
                    <div
                        id="svg-white"
                        style={{ clipPath: 'inset(0 0 100% 0)' }}
                        className="absolute"
                        ref={svgWhiteRef}>
                        <WhitePath />
                    </div>
                </div>
                <div className="flex flex-col h-full gap-2 justify-around xl:justify-between items-center w-full">
                    <div className="relative flex flex-col p-5 gap-2 w-1/2 bg-white rounded-2xl shadow-xl shadow-black min-w-72">
                        <div className='absolute hidden xl:block w-48 -right-32 -top-32'><Account/></div>
                        <h4>Inscrivez-vous</h4>
                        <p>
                            Renseignez vos informations et choisissez vos
                            catégories préférées afin que l’on puisse mieux vous
                            connaître
                        </p>
                    </div>
                    <div className="relative flex flex-col p-5 gap-2 w-1/2 bg-white rounded-2xl shadow-xl shadow-black min-w-72">
                        <div className="absolute hidden xl:block w-48 -right-32 -top-32"><Typing/></div>
                        <h4>Contactez les organismes</h4>
                        <p>
                            Prenez contact avec les organismes de formation qui
                            vous intéressent et commencez votre formation
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;
