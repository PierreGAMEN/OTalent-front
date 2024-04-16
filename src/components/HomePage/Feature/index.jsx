import FeatureCard from './FeatureCard';
import React from 'react';

/**
 * Feature component
 * @returns {tsX.Element} The Feature component
 */
export default function Feature() {
    const data = [
        {
            title: 'Rapide',
            description: `Une interface intuitive \n Des avis utilisateurs pour se repérer`,
            image: '/src/assets/Fast loading-bro.svg',
        },
        {
            title: 'Complet',
            description:
                'Une large sélection de formations \n De nombreuses catégories',
            image: '/src/assets/Learning-bro.svg',
        },
        {
            title: 'Actif',
            description:
                'Une communauté active \n Banque mise à jour régulièrement',
            image: '/src/assets/Group Chat-bro.svg',
        },
    ];

    return (
        <div className="min-h-60 h-full pb-24" data-aos="fade-up">
            <h3 className='mb-5 mt-10'>Cherchez, trouvez, likez !</h3>
            <div className="flex flex-col gap-10 items-stretch justify-evenly lg:flex-row">
                {data.map((element, index) => {
                    return (
                        <FeatureCard
                            key={index}
                            title={element.title}
                            description={element.description}
                            image={element.image}
                            aria-label={`Feature ${element.title}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
