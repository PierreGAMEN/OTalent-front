
import { useEffect, useState } from "react";
import SearchBar from "../../LayoutElement/Header/SearchBar";
import "./style2.scss";

export default function HeroSearchBar() {
    const [training, setTraining] = useState('Carrossier');
    const data = ['développeur web', 'mathématiciens', 'apiculteur', 'graphiste', 'ingénieur son', 'conducteur de travaux'];

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Rotate through the data array
            const index = (data.indexOf(training) + 1) % data.length;
            setTraining(data[index]);
        }, 2000);

        // Clean up the interval to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [data, training]);

    return (
            <div className="container-landing">

                <div className="title">
                <h1 className="h1-title-landing">OTalent simplifie vos recherches de formation</h1>
                </div>
                <div className="subtitle-landing">
                    <p className="subtitle-landing-p">Dès aujourd'hui, prenez votre carrière en main et devenez 
                    <span className="subtitle-landing-span"> {training}</span></p>
                </div>
                <div className="link-landing">
                    <a href="#searchBar" className="link-landing-a">Recherchez votre formation</a>
                </div>
                <img className="image-landing" src="/livre.png" alt="" />
                
            </div>
        
    );
}

// VERSION 1 - 

{/* <section className={`container-Hero`}>
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
            </section> */}

function handleData() {
    throw new Error("Function not implemented.");
}
