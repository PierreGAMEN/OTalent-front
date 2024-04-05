import './style.css';
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/css/bundle';
import { useEffect, useState } from 'react';

const Carousel = ({ updateTraining }) => {
    const [currentImage, setCurrentImage] = useState({ src: '', alt: '' });
    useEffect(() => {
        const swiper = new Swiper('.swiper', {
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
                slideChange: function () {
                    const currentSlide = this.slides[this.activeIndex];
                    if (currentSlide) {
                        const image = currentSlide.querySelector('img');
                        if (image) {
                            setCurrentImage({ src: image.src, alt: image.alt });
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
