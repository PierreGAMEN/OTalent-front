import { useState } from 'react';
import TrainingCard from '../../HomePage/TrainingCard';
import './style.scss';

export default function ContentOrganizationProfilPage({ data }) {
    const [isTraining, setIsTraining] = useState(false);
    const [isDescription, setIsDescription] = useState(true);

    const handleClick = (setter1, setter2) => {
        setter1(true);
        setter2(false);
    };

    return (
        <main className="content-organizationPage">
            <section className="content-organizationPage-menu">
                <button
                    onClick={() => {
                        handleClick(setIsDescription, setIsTraining);
                    }}
                    className={
                        isDescription
                            ? 'content-trainingpage-menu-button active'
                            : 'content-trainingpage-menu-button'
                    }
                >
                    Description
                </button>
                <button
                    onClick={() => {
                        handleClick(setIsTraining, setIsDescription);
                    }}
                    className={
                        isTraining
                            ? 'content-trainingpage-menu-button active'
                            : 'content-trainingpage-menu-button'
                    }
                >
                    Formations
                </button>
            </section>

            <section className="content-organizationPage-text">
                {isDescription && (
                    <>
                        <h3>Description de l'école</h3>
                        <p>{data.description}</p>
                    </>
                )}
            </section>

            {isTraining && (
                <section className="content-organizationPage-trainings">
                    {data.trainings.map(training => (
                        <div key={training.id}>
                            <TrainingCard
                                key={training.id}
                                label={training.label}
                                dateCreated={''}
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
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
}
