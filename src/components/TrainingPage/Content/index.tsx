import { useState } from "react"
import "./style.scss"
export default function ContentTrainingPage ({data}) {

    const [isProgram, setIsProgram] = useState<boolean>(true)
    const [isDuration, setIsDuration] = useState<boolean>(false)
    const [isOrganization, setIsOrganization] = useState<boolean>(false)

    const handleClick = (
        setterTrue: React.Dispatch<React.SetStateAction<boolean>>,
        firstSetterFalse: React.Dispatch<React.SetStateAction<boolean>>,
        secondSetterFalse: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setterTrue(true);
        firstSetterFalse(false);
        secondSetterFalse(false);
        console.log(data)
    };

    return (<section className="content-trainingpage">
        
        <div className="content-trainingpage-menu">
            <button onClick={() => {handleClick(setIsProgram, setIsDuration, setIsOrganization)}} className={isProgram ? "content-trainingpage-menu-button active" : "content-trainingpage-menu-button"}>Programme</button>
            <button onClick={() => {handleClick(setIsDuration, setIsProgram, setIsOrganization)}} className={isDuration ? "content-trainingpage-menu-button active" : "content-trainingpage-menu-button"}>Durée</button>
            <button onClick={() => {handleClick(setIsOrganization, setIsProgram, setIsDuration)}} className={isOrganization ? "content-trainingpage-menu-button active" : "content-trainingpage-menu-button"}>Organisme</button>
        </div>

        <div className="content-trainingpage-text">
        {isProgram && <p className="content-trainingpage-text-p">Programme, ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta reprehenderit facilis exercitationem sit, laborum quae illo architecto eligendi rem accusantium, possimus nostrum atque. Harum veniam facilis sit ab aliquam.</p>}
        {isDuration && <p className="content-trainingpage-text-p">Prérequis, ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta reprehenderit facilis exercitationem sit, laborum quae illo architecto eligendi rem accusantium, possimus nostrum atque. Harum veniam facilis sit ab aliquam.</p>}
        {isOrganization && <p className="content-trainingpage-text-p">Organization, ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta reprehenderit facilis exercitationem sit, laborum quae illo architecto eligendi rem accusantium, possimus nostrum atque. Harum veniam facilis sit ab aliquam.</p>}
        </div>

    </section>)
}