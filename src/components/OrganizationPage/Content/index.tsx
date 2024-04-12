import { useState } from 'react';
import TrainingCard from '../../HomePage/TrainingCard';

export default function ContentOrganizationProfilPage({ data }) {
    const [isTraining, setIsTraining] = useState(false);
    const [isDescription, setIsDescription] = useState(true);

    const handleClick = (setter1, setter2) => {
        setter1(true);
        setter2(false);
    };
    const buttons = [
        {
            text: 'Description',
            setIs: setIsDescription,
            isActive: isDescription,
        },
        {
            text: 'Formations',
            setIs: setIsTraining,
            isActive: isTraining,
        },
    ];

    return (
        <>
            <h3>Détails de l'organisme</h3>
            <section className="flex flex-row min-h-96 justify-center align-start gap-5 m-5">
                <div className="flex flex-col">
                    <ul className="">
                        {buttons.map(button => (
                            <li
                                key={button.text}
                                className="mt-5 cursor-pointer"
                            >
                                <a
                                    onClick={() => {
                                        handleClick(
                                            button.setIs,
                                            ...buttons
                                                .filter(b => b !== button)
                                                .map(b => b.setIs)
                                        );
                                    }}
                                    className={
                                        button.isActive
                                            ? 'bg-primary-color text-white rounded-2xl p-2'
                                            : 'p-2'
                                    }
                                >
                                    {button.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col align-center justify-start h-full w-2/3 gap-5">
                    {isDescription && (
                        <>
                            <h4>Description de l'école</h4>
                            <p>{data.description}</p>
                        </>
                    )}
                    {isTraining && (
                        <div className="flex flex-row justify-left pb-5 gap-5  overflow-x-auto overflow-y-hidden">
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
                                        organization={
                                            training.organization.name
                                        }
                                        trainingId={training.id}
                                        organizationId={
                                            training.organization.id
                                        }
                                        reviews={training.reviews}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
