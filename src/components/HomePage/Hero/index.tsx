import { useEffect, useState } from 'react';
import SearchBar from '../../LayoutElement/Header/SearchBar';
import Carousel from './Carousel';

export default function Hero() {
    const [training, setTraining] = useState('');
    const updateTraining = newTraining => {
        setTraining(newTraining);
    };

    return (
        <div className="pr-20 pl-20 h-screen bg-primary-color box-border text-white flex flex-col xl:flex-row">
            <div className="mt-10 xl:m-0 flex items-center justify-start xl:justify-center flex-col w-full xl:w-2/3 xl:items-stretch">
                <h2 className="text-4xl xl:text-7xl font-extrabold uppercase font-title tracking-wider text-center xl:text-left">
                    OTalent <br /> simplifie vos recherches <br /> de formations
                </h2>
                <p className="text-3xl mt-10 hidden xl:inline">
                    Dès aujourd'hui, devenez <br />
                    <span className="font-bold text-5xl"> {training}</span>
                </p>
                <img
                    src="./src/assets/Certification-bro.svg"
                    className="xl:hidden w-64 mt-5"
                ></img>
                <a
                    href="#searchBar"
                    className="lg:hover:-translate-y-1  w-3/5 text-center bg-white p-5 mt-10 min-w-min rounded-2xl hover:cursor-pointer text-primary-color text-2xl font-bold"
                >
                    Découvrez nos formations
                </a>
            </div>
            <div className="w-1/2 h-full hidden xl:flex items-center">
                <Carousel updateTraining={updateTraining} />
            </div>
        </div>
    );
}

// VERSION 1 -

{
    /* <section className={`container-Hero`}>
                <h2>Trouvez votre formation</h2>
                    <div className="info-category">
                        <p className="p-info">Ou tapez le nom de votre formation</p>
                        <img src="/fleche-hero-blanche.png" alt="" />
                    </div>
                    <div className="info-formation">
                        <p className="p-info">Choisissez votre catégorie</p>
                        <img src="/fleche-hero-blanche.png" alt="" />
                    </div>
                <div className="container-Hero-searchBar">
                    <SearchBar className={`searchBarHero`} />
                </div>
                <img src="/image-header.svg" alt="" />
            </section> */
}

function handleData() {
    throw new Error('Function not implemented.');
}
