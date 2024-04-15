import './style.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

/**
 * Carousel component
 * @param {Object} props - Component properties
 * @param {function} props.updateTraining - Function to update the training
 */
const Carousel = ({ updateTraining }) => {
    // State for the current image
    const [currentImage, setCurrentImage] = useState({ src: '', alt: '' });

    // Reference to the Swiper instance
    const swiperRef = useRef(null);

    // Effect to initialize the Swiper instance
    useEffect(() => {
        swiperRef.current = new Swiper('.swiper', {
            direction: 'horizontal',
            allowTouchMove: false,
            autoplay: {
                delay: 3000,
            },
            navigation: {
                enabled: false,
            },
            scrollbar: {
                enabled: false,
            },
            effect: 'cards',
            cardsEffect: {
                slideShadows: true,
                rotate: true,
                perSlideRotate: 5,
            },
            mousewheel: false,
            slidesPerView: 'auto',
            simulateTouch: false,
            loop: true,
            on: {
                // Event handler for the slide change event
                slideChange: function () {
                    if (swiperRef.current) {
                        const currenjslide =
                            swiperRef.current.slides[
                                swiperRef.current.activeIndex
                            ];
                        if (currenjslide) {
                            const image = currenjslide.querySelector('img');
                            if (image) {
                                setCurrentImage({
                                    src: image.src,
                                    alt: image.alt,
                                });
                            }
                        }
                    }
                },
            },
        });
    }, []);

    useEffect(() => {
        updateTraining(currentImage.alt);
    }, [currentImage, updateTraining]);
    return (
        <div className="swiper">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <img
                        src="./assets/josh-miller-7FWEpeGrICo-unsplash.jpg"
                        alt="Cadreur-Monteur"
                        className="pic"
                    />
                </div>
                <div className="swiper-slide">
                    <img
                        src="./assets/procreator-ux-design-studio-VzJjPuk53sk-unsplash.jpg"
                        alt="Développeur Web"
                        className="pic"
                    />
                </div>
                <div className="swiper-slide">
                    <img
                        src="./assets/thisisengineering-raeng-ATeFbve78Zo-unsplash.jpg"
                        alt="Ingénieur Son"
                        className="pic"
                    />
                </div>
            </div>
        </div>
    );
};

export default Carousel;
