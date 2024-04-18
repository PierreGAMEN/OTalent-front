import React, { useState } from 'react';
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
            <h3 className='md:pb-10'>Détails de l'organisme</h3>
            <section className="flex flex-col items-center  min-h-96 align-start gap-5 m-5 text-lg">
                <div className="flex flex-col w-full lg:w-1/2">
                    <ul className="flex flex-wrap md:flex-nowrap  w-full justify-evenly">
                        {buttons.map((button) => (
                            <li
                                key={button.text}
                                className="mt-5 cursor-pointer">
                                <a
                                    onClick={() => {
                                        handleClick(
                                            button.setIs,
                                            ...buttons
                                                .filter((b) => b !== button)
                                                .map((b) => b.setIs)
                                        );
                                    }}
                                    className={
                                        button.isActive
                                            ? 'bg-primary-color text-white rounded-2xl p-2'
                                            : 'p-2'
                                    }>
                                    {button.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col sm:max-lg:mt-10 w-full mb-10 align-center justify-start min-h-96 text-lg gap-5">
                    {isDescription && (
                        <>
                        <div className='w-full flex flex-col lg:items-center'>
                            <div className='lg:w-3/5'>
                            <h4 className='lg:mt-10 mt-5 mb-5 text-xl md:text-3xl'>Description de l'école</h4>
                            <p className='content-trainingpage-text-p text-justify'>{data.description}</p>
                            </div>
                        </div>
                        </>
                    )}
                    {isTraining && (
                        <div className="flex flex-row justify-left pb-5 gap-5 lg:mt-10 overflow-x-auto overflow-y-hidden w-full lg:justify-center">
                            {data.trainings.map((training) => (
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
