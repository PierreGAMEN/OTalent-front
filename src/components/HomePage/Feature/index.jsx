import Fast from '../../../../public/assets/Fast loading-bro';
import GroupChat from '../../../../public/assets/Group Chat-bro';
import LearningBro from '../../../../public/assets/Learning-bro';
import FeatureCard from './FeatureCard';
import React from 'react';
import Fast from '../../../../public/assets/Fast loading-bro';
import LearningBro from '../../../../public/assets/Learning-bro';
import GroupChat from '../../../../public/assets/Group Chat-bro';
/**
 * Feature component
 * @returns {tsX.Element} The Feature component
 */
export default function Feature() {
    const data = [
        {
            title: 'Rapide',
            description: `Une interface intuitive \n Des avis utilisateurs pour se repérer`,
            image: <Fast/>,
        },
        {
            title: 'Complet',
            description:
                'Une large sélection de formations \n De nombreuses catégories',
            image: <LearningBro />,
        },
        {
            title: 'Actif',
            description:
                'Une communauté active \n Banque mise à jour régulièrement',
            image: <GroupChat />,
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
