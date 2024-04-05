import FeatureCard from './FeatureCard';
import './style.scss';

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
        <div className="pb-24 min-h-60 h-full">
            <h3>Cherchez, trouvez, likez !</h3>
            <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-evenly">
                {data.map((element, index) => {
                    return (
                        <FeatureCard
                            key={index}
                            title={element.title}
                            description={element.description}
                            image={element.image}
                        />
                    );
                })}
            </div>
        </div>
    );
}
