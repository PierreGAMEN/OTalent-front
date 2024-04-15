import TrainingCard from '../TrainingCard';
import React from 'react';



export default function TrainingList ({data, categoryChosen}) {
    return (
        <div className="ml-5">
            <h4>{categoryChosen}</h4>
            <div className="flex flex-row justify-left pb-5 gap-5 overflow-x-auto overflow-y-hidden">
                {data &&
                    data.trainings &&
                    data.trainings
                        .filter(
                            (training) =>
                                training.category.label === categoryChosen
                        )
                        .slice(0, 5)
                        .map((training) => (
                            <TrainingCard
                                key={training.id}
                                label={training.label}
                                dateCreated={""} 
                                duration={training.duration}
                                price={training.price}
                                category={training.category.label}
                                image={training.image}
                                categoryId={training.category.id}
                                organization={training.organization.name}
                                trainingId={training.id}
                                organizationId={training.organization.id}
                                reviews={training.reviews}
                            />
                        ))}
            </div>
        </div>
    );
}
