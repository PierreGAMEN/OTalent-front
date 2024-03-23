import CaracteristiqueCard from "./CaracteristiqueCard";
import './style.scss'

export default function Caracteristique () {

    const data = [
        {
            title: "Une large sélection de formations",
            description: "O'Talent offre une vaste sélection de formations dans différents domaines, ce qui permet aux utilisateurs de trouver des opportunités de développement professionnel qui correspondent à leurs intérêts et à leurs besoins spécifiques.",
            image: "/livre.png"
            
        },
        {
            title: "une interface conviviale",
            description: "O'Talent se distingue par son interface conviviale et intuitive, facilitant la navigation et l'utilisation pour les utilisateurs de tous niveaux de compétence technologique.",
            image: "/convivial.png"
        },
        {
            title: "Une communauté super active",
            description: "L'application encourage l'interaction et l'engagement des utilisateurs grâce à la fonctionnalité de commentaires et d'avis.",
            image: "/avis.png"
        }
    ]

    return (
        <div className="container-caracteristique">
            <h1 className="container-caracteristique-title">Cherchez, trouvez, likez !</h1>
            <div className="container-caracteristique-card">
            {data.map((element, index) => {
                return (
                    <CaracteristiqueCard
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