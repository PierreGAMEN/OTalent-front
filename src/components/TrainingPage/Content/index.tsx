import {
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactNode,
    useState,
} from 'react';
import TrainingDataI from '../../../@Types/training';
import { handleDateFormat } from '../../../utils';

export default function ContentTrainingPage({ data }: { data: TrainingDataI }) {
    const [isProgram, setIsProgram] = useState<boolean>(true);
    const [isDuration, setIsDuration] = useState<boolean>(false);
    const [isOrganization, setIsOrganization] = useState<boolean>(false);
    const [isPrerequisite, setIsPrerequisite] = useState<boolean>(false);

    const handleClick = (
        setterTrue: React.Dispatch<React.SetStateAction<boolean>>,
        firstSetterFalse: React.Dispatch<React.SetStateAction<boolean>>,
        secondSetterFalse: React.Dispatch<React.SetStateAction<boolean>>,
        thirdSetterFalse: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setterTrue(true);
        firstSetterFalse(false);
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

                <div className="flex flex-col align-center justify-start min-h-96 w-1/3 gap-5">
                    {isProgram && (
                        <>
                            <h4>Description</h4>
                            <p className="content-trainingpage-text-p">
                                {data.description}
                            </p>
                            <h4>Programme</h4>
                            <ul>
                                {JSON.parse(data.program).map(
                                    (element: any, index: number) => (
                                        <li key={index}>{element}</li>
                                    )
                                )}
                            </ul>
                        </>
                    )}
                    {isDuration && (
                        <>
                            <h4>Durée de la formation</h4>
                            <p className="content-trainingpage-text-p">
                                Temps de formation : {data.duration} heures
                            </p>
                            <h4>Dates de la prochaine session</h4>
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
                            <h4>Informations de l'organisme</h4>
                            <p className="content-trainingpage-text-p">
                                Nom de l'organisme :{' '}
                                <a
                                    href={`/organization/${data.organization.id}`}
                                    className="underline"
                                >
                                    {data.organization.name}
                                </a>
                            </p>
                            <p className="content-trainingpage-text-p">
                                Email :{' '}
                                <a
                                    href={`mailto:${data.organization.email}`}
                                    className="underline"
                                >
                                    {data.organization.email}
                                </a>
                            </p>
                            <p className="content-trainingpage-text-p">
                                Lien vers le site :{' '}
                                <a
                                    href={`${data.organization.url_site}`}
                                    className="underline"
                                >
                                    {data.organization.name}
                                </a>
                            </p>
                            <a href={`/organization/${data.organization.id}`}>
                                <img
                                    className="w-64 rounded-2xl"
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
                            <h4>Prérequis</h4>
                            <ol>
                                {JSON.parse(data.prerequisites).map(
                                    (element: any) => (
                                        <li
                                            key={element}
                                            className="content-trainingpage-text-p"
                                        >
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
