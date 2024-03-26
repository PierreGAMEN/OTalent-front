import { useState } from "react";
import TrainingCard from "../../../HomePage/TrainingCard";

export default function FavoritesEditProfilPageMember({ data }) {
    
    const [favoritesTrainings, setFavoritesTrainings] = useState(data.trainings);

    const deleteTraining = (e) => {
        const idToDelete = e.target.id;
        const newFavoriteTrainings = favoritesTrainings.filter(training => training.id !== idToDelete);
        setFavoritesTrainings(newFavoriteTrainings);
    }

    return (
        <>
            <h2>Vos favoris</h2>
            <section className="content-organizationPage-trainings">
                {favoritesTrainings.map(training => (
                    <div key={training.id}>
                        <TrainingCard 
                            key={training.id}
                            label={training.label} 
                            dateCreated={""} 
                            duration={training.duration} 
                            category={training.category.label} 
                            image={training.image}
                            categoryId={training.category.id} 
                            organization={training.organization.name}
                            trainingId={training.id}
                            organizationId={training.organization.id}
                            reviews={training.reviews}
                        />
                        <button onClick={deleteTraining} id={training.id}>Retirer des favoris</button>
                    </div>
                ))}
            </section>
        </>
    )
}
