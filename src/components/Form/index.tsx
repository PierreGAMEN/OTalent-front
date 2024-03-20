import { Divider } from 'semantic-ui-react'
import './style.scss'
import { useState } from 'react'
import FormMember from './FormMember'
import FormOrganization from './FormOrganization'


export default function FormPage() {
    const [activeButton, setActiveButton] = useState('')

    const handleClickMember = () => {
        setActiveButton('member')
    }

    const handleClickOrganization = () => {
        setActiveButton('organization')
    }

    return (
        <>
            {!activeButton && (
                <div className='section-card-formPage'>
                    <section onClick={handleClickMember} className="section-card-formPage-card" id="member">
                        <h2>Étudiant</h2>
                    </section>
                    <section onClick={handleClickOrganization} className="section-card-formPage-card" id="organization">
                        <h2>Organisme de formation</h2>
                    </section>
                    </div>
            )}
            {activeButton === 'member' && (<div className="container-form"><FormMember /> <button onClick={()=> {setActiveButton('')}}>Retour vers le choix des profils</button></div>)}
            {activeButton === 'organization' && (<div className="container-form"><FormOrganization /> <button onClick={()=> {setActiveButton('')}}>Retour vers le choix des profils</button></div>)}
        
        </>
    )
}
