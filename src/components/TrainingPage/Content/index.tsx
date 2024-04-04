import { JSXElementConstructor, Key, ReactElement, ReactNode, useState } from "react"
import "./style.scss"
import TrainingDataI from "../../../@Types/training"

export default function ContentTrainingPage ({ data }: { data: TrainingDataI }) {

    const [isProgram, setIsProgram] = useState<boolean>(true)
    const [isDuration, setIsDuration] = useState<boolean>(false)
    const [isOrganization, setIsOrganization] = useState<boolean>(false)
    const [isPrerequisite, setIsPrerequisite] = useState<boolean>(false)

    const handleClick = (
        setterTrue: React.Dispatch<React.SetStateAction<boolean>>,
        firstSetterFalse: React.Dispatch<React.SetStateAction<boolean>>,
        secondSetterFalse: React.Dispatch<React.SetStateAction<boolean>>,
        thirdSetterFalse: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setterTrue(true);
        firstSetterFalse(false);
        secondSetterFalse(false);
        thirdSetterFalse(false)
    };

    

    const handleDateFormat = (date: string) => {
        const dateObj = new Date(date);
        const options : {} = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('fr-FR', options);
        console.log(date)
        return formattedDate;
    }

    

    return (<section id="content-trainingpage" className="content-trainingpage">
        
        <div className="content-trainingpage-menu">
            <button onClick={() => {handleClick(setIsProgram, setIsDuration, setIsOrganization,setIsPrerequisite)}} className={isProgram ? "content-trainingpage-menu-button active" : "content-trainingpage-menu-button"}>Description & Programme</button>
            <button onClick={() => {handleClick(setIsDuration, setIsProgram, setIsOrganization, setIsPrerequisite)}} className={isDuration ? "content-trainingpage-menu-button active" : "content-trainingpage-menu-button"}>Durée</button>
            <button onClick={() => {handleClick(setIsOrganization, setIsProgram, setIsDuration, setIsPrerequisite)}} className={isOrganization ? "content-trainingpage-menu-button active" : "content-trainingpage-menu-button"}>Organisme</button>
            <button onClick={() => {handleClick(setIsPrerequisite, setIsOrganization, setIsProgram, setIsDuration)}} className={isPrerequisite ? "content-trainingpage-menu-button active" : "content-trainingpage-menu-button"}>Prérequis</button>
        </div>

        <div className="content-trainingpage-text">
        {isProgram && 
        <>
        <h2>Description</h2>
        <p className="content-trainingpage-text-p">{data.description}</p>
        <h2>Programme</h2>
        <ul>
            {JSON.parse(data.program).map((element: any, index: number) => (
                <li key={index}>{element}</li>
            ))}
        </ul>
        </>}
        {isDuration && 
        <>
        <h2>Durée de la formation</h2>
        <p className="content-trainingpage-text-p">Temps de formation : {data.duration} heures</p>
        <h2>Date de la prochaine session</h2>
        <p className="content-trainingpage-text-p">Date de début : {handleDateFormat(data.dates[0])}</p>
        <p className="content-trainingpage-text-p">Date de fin : {handleDateFormat(data.dates[1])}</p>
        <p></p>
        </>}
        {isOrganization && 
        <div className="content-trainingpage-organization">
        <div>
        <img className="content-trainingpage-organization-image" src={data.organization.image} alt="" />
        </div>
        <div>
        <h2>Informations de l'organisme</h2>
        <p className="content-trainingpage-text-p">Nom de l'organisme : <a href={`/organization/${data.organization.id}`}>{data.organization.name}</a></p>
        <p className="content-trainingpage-text-p">Email :<a href={`mailto:${data.organization.email}`}>
        {data.organization.email}
</a></p>
        <p className="content-trainingpage-text-p">Lien vers le site : <a href={`${data.organization.url_site}`}>{data.organization.name}</a></p>
        </div>
        </div>}
        {isPrerequisite &&
        <>
        <h2>Prérequis</h2>
        <ol>
        {JSON.parse(data.prerequisites).map((element: any)  => (
        <li key={element} className="content-trainingpage-text-p">{element}</li>
        ))}
        </ol>
         </>}
        </div>

    </section>)
}
