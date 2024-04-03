import { useState } from "react";
import TrainingCard from "../../../HomePage/TrainingCard";

export default function OrganizationTrainings({ data }) {

    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {

    }

    if (!data || !data.trainings) {
        return <section>Aucune formation disponible</section>;
    }

    return (
        <section>
            {data.trainings.length > 0 && (
                <>
                    {data.trainings.map((training, index) => (
                        <>
                        <TrainingCard 
                        key={training.id}
                        label={training.label} 
                        dateCreated={""} 
                        duration={training.duration} 
                        category={training.category.label} 
                        image={training.image}
                        categoryId={training.category.id} 
                        organization={data.id}
                        trainingId={training.id}
                        organizationId={data.id}
                        reviews={training.reviews}
                    />
                    <button onClick = {openModal} id={training.id} className="btn bg-primary text-white ">Modifier cette formation</button>
                    </>
                    ))}
                </>
            )}
        </section>
    );
}
