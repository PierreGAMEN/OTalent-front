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
                <>
                <h4 className='mb-5'>Vous êtes ?</h4>
                <div className=''>
                    <section onClick={handleClickMember} className="border p-5 cursor-pointer hover:bg-blue-600 hover:text-white mb-3" id="member">
                        <p>Un(e) futur(e) étudiant(e)</p>
                    </section>
                    <section onClick={handleClickOrganization} className="border p-5 cursor-pointer hover:bg-green-600 hover:text-white" id="organization">
                        <p>Un organisme de formation</p>
                    </section>
                    </div>
                    </>
            )}
            {activeButton === 'member' && (<div><FormMember /> <button className='btn mt-5' onClick={()=> {setActiveButton('')}}>Retour vers le choix des profils</button></div>)}
            {activeButton === 'organization' && (<div><FormOrganization /> <button className='btn mt-5' onClick={()=> {setActiveButton('')}}>Retour vers le choix des profils</button></div>)}
        
        </>
    )
}
