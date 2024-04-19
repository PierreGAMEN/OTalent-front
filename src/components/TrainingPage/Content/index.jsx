import { useState } from 'react';
import { handleDateFormat } from '../../../utils';
import React from 'react';

export default function ContentTrainingPage({ data }) {
    const [isProgram, setIsProgram] = useState(true);
    const [isDuration, setIsDuration] = useState(false);
    const [isOrganization, setIsOrganization] = useState(false);
    const [isPrerequisite, setIsPrerequisite] = useState(false);

    console.log('test');

    const handleClick = (
        setterTrue,
        firstsetterFalse,
        secondSetterFalse,
        thirdSetterFalse
    ) => {
        setterTrue(true);
        firstsetterFalse(false);
        secondSetterFalse(false);
        thirdSetterFalse(false);
    };

    const buttons = [
        {
            text: 'Description & Programme',
            setIs: setIsProgram,
            isActive: isProgram,
        },
        {
            text: 'Durée',
            setIs: setIsDuration,
            isActive: isDuration,
        },
        {
            text: 'Organisme',
            setIs: setIsOrganization,
            isActive: isOrganization,
        },
        {
            text: 'Prérequis',
            setIs: setIsPrerequisite,
            isActive: isPrerequisite,
        },
    ];
    return (
        <>
            <h3>Détails de la formation</h3>
            <section className="flex flex-col items-center md:items-start lg:flex-row min-h-96 md:justify-center align-start gap-5 m-5 text-lg">
                <div className="flex flex-col sm:max-lg:w-full">
                    <ul className="flex flex-wrap md:flex-nowrap lg:block w-full justify-evenly">
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

                <div className="flex flex-col sm:max-lg:mt-10 w-full align-center justify-start min-h-96 text-lg lg:w-1/3 gap-5">
                    {isProgram && (
                        <>
                            <h4 className='text-center sm:text-left text-2xl sm:text-3xl'>Description</h4>
                            <p className="content-trainingpage-text-p text-justify">
                                {data.description}
                            </p>
                            <h4 className='sm:max-md:mt-10 text-center sm:text-left text-2xl sm:text-3xl'>Programme</h4>
                            <ul>
                                {JSON.parse(data.program).map(
                                    (element, index) => (
                                        <li key={index}>{element}</li>
                                    )
                                )}
                            </ul>
                        </>
                    )}
                    {isDuration && (
                        <>
                            <h4 className='text-center sm:text-left text-2xl sm:text-3xl'>Durée de la formation</h4>
                            <p className="content-trainingpage-text-p">
                                Temps de formation : {data.duration} heures
                            </p>
                            <h4 className='text-center sm:text-left text-2xl sm:text-3xl'>Dates de la prochaine session</h4>
                            <p className="content-trainingpage-text-p">
                                Date de début :{' '}
                                {handleDateFormat(data.dates[0])}
                            </p>
                            <p className="content-trainingpage-text-p">
                                Date de fin : {handleDateFormat(data.dates[1])}
                            </p>
                            <p></p>
                        </>
                    )}
                    {isOrganization && (
                        <>
                            <h4 className='text-center sm:text-left text-2xl sm:text-3xl'>Informations de l'organisme</h4>
                            <p className="content-trainingpage-text-p">
                                Nom de l'organisme :{' '}
                                <a
                                    href={`/organization/${data.organization.id}`}
                                    className="underline">
                                    {data.organization.name}
                                </a>
                            </p>
                            <p className="content-trainingpage-text-p">
                                Email :{' '}
                                <a
                                    href={`mailto:${data.organization.email}`}
                                    className="underline">
                                    {data.organization.email}
                                </a>
                            </p>
                            <p className="content-trainingpage-text-p">
                                Lien vers le site :{' '}
                                <a
                                    href={`${data.organization.url_site}`}
                                    className="underline">
                                    {data.organization.name}
                                </a>
                            </p>
                            <a href={`/organization/${data.organization.id}`} className='flex justify-center lg:block'>
                                <img
                                    className="w-2/3 lg:w-64 rounded-2xl"
                                    src={`https://res.cloudinary.com/${
                                        import.meta.env.VITE_CDNY_CLOUDNAME
                                    }/image/upload/c_scale,w_780,h_520/v1/otalent/${
                                        data.organization.image
                                    }`}
                                    alt="Photo de l'organisation"
                                />
                            </a>
                        </>
                    )}
                    {isPrerequisite && (
                        <>
                            <h4 className='text-center sm:text-left text-2xl sm:text-3xl'>Prérequis</h4>
                            <ol>
                                {JSON.parse(data.prerequisites).map(
                                    (element) => (
                                        <li
                                            key={element}
                                            className="content-trainingpage-text-p">
                                            {element}
                                        </li>
                                    )
                                )}
                            </ol>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}