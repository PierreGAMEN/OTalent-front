import './style.scss'
import { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { requestWithVariable } from '../../../../utils'
import { queryUpdateOrganizationInformation } from '../../../../query'
import { useAppSelector } from '../../../../store/redux-hook/hook'
import { toast } from 'react-toastify'

export default function HeaderOrganizationEditPage({ data }) {

    // Ajouter URLSITE + image 

    const [isEdit, setIsEdit] = useState(false)
    const [raisonSocial, setRaisonSocial] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postal_code, setPostal_code] = useState('')
    const [website, setWebsite] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [seeding, setSeeding] = useState(false)

    const user = useAppSelector((state) => state.token.user);

    const handleChange = (e, setter) => {
        const value = e.target.value;
        setter(value);
    }

    const seedingState = () => {
        setRaisonSocial(data.name || '');
        setEmail(data.email || '');
        setCity(data.city || '');
        setPostal_code(data.postal_code || '');
        setWebsite(data.website || '');
        setAddress(data.address || '');
        setDescription(data.description || '');
        setPhoneNumber(data.phone_number || '');
        setSeeding(true);
    }

    const verifyInformation = () => {
        if(raisonSocial.trim() === "") {
            toast.error("Le champs raison sociale est vide")
            return false
        }
        const regexEmail = /\S+@\S+\.\S+/
        if(!regexEmail.test(email)) {
            toast.error("L'email n'est pas conforme, veuillez respecter le modèle suivant nom@domaine.com")
            return false
        }
        if(city.trim() === ""){
            toast.error("Le champs ville est vide")
            return false
        }
        if(address.trim() === ""){
            toast.error("Le champs adresse est vide")
            return false
        }
        const regexPostalCode = /^\d{5}$/
        if(!regexPostalCode.test(postal_code)){
            toast.error("Le champs ville est vide")
            return false
        }
        const regexPhoneNumber = /^\d{10}$/
        if(!regexPhoneNumber.test(phoneNumber)){
            toast.error("Le numéro de téléphone doit contenir 10 chiffres")
            return false
        }
        const regexUrl = /^(https?|ftp):\/\/[^\s/$.?#]+(?:[^\s]*)$/
        if(website){ if(!regexUrl.test(website)) {
            toast.error("L'url n'a pas le bon format, merci de respecter")
            return false
        }}
       
        return true
    }

    const updateOrganizationInformation = async () => {

        const check = verifyInformation()
        if(check) {

        const variables = {
            modifyOrganizationId: user.id,
            input: {
                name: raisonSocial,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                postalCode: postal_code,
                
            }
        }

        await requestWithVariable(queryUpdateOrganizationInformation, variables)
        location.reload()

    }}

    useEffect(() => {
        if(data) {
            seedingState();
        }
    }, [data])

    return (
        seeding && (
            <div className="container-header-EditProfilPage">
                <div>
                    <img src={data ? data.avatar : ''} alt="" />
                </div>
                <div className="">
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                    <button onClick={() => setIsEdit(false)}>Quitter le mode edit</button>
                    {isEdit ? (
                        <>
                            <p className="">Nom :</p>
                            <input className="" onChange={e => handleChange(e, setRaisonSocial)} type="text" value={raisonSocial} />
                        </>
                    ) : (
                        <p>Nom: {data ? data.name : ''}</p>
                    )}

                    {isEdit ? (
                        <>
                            <p className="">Email :</p>
                            <input className="" onChange={e => handleChange(e, setEmail)} type="email" value={email} />
                        </>
                    ) : (
                        <p>Email: {data ? data.email : ''}</p>
                    )}

                    {isEdit ? (
                        <>
                            <p className="">Adresse :</p>
                            <input className="" onChange={e => handleChange(e, setAddress)} type="text" value={address} />
                        </>
                    ) : (
                        <p>Adresse: {data ? data.address : ''}</p>
                    )}

                    {isEdit ? (
                        <>
                            <p className="">Ville :</p>
                            <input className="" onChange={e => handleChange(e, setCity)} type="text" value={city} />
                        </>
                    ) : (
                        <p>Ville: {data ? data.city : ''}</p>
                    )}

                    {isEdit ? (
                        <>
                            <p className="">Code postal :</p>
                            <input className="" onChange={e => handleChange(e, setPostal_code)} type="text" value={postal_code} />
                        </>
                    ) : (
                        <p>Code postal: {data ? data.postal_code : ''}</p>
                    )}

                    {isEdit ? (
                        <>
                            <p className="">Site Web :</p>
                            <input className="" onChange={e => handleChange(e, setWebsite)} type="text" value={website} />
                        </>
                    ) : (
                        <p>Site Web: {data ? data.website : ''}</p>
                    )}

                    {isEdit ? (
                        <>
                            <p className="">N° de téléphone :</p>
                            <input className="" onChange={e => handleChange(e, setPhoneNumber)} type="text" value={phoneNumber} />
                        </>
                    ) : (
                        <p>N° de téléphone: {data ? data.phone_number : ''}</p>
                    )}

                    {isEdit ? (
                        <>
                            <p className="">Description :</p>
                            <textarea className="" onChange={e => handleChange(e, setDescription)} value={description} />
                        </>
                    ) : (
                        <p>Description: {data ? data.description : ''}</p>
                    )}


                    {isEdit && <Button onClick={updateOrganizationInformation} fluid positive>Valider les changements</Button>}
                </div>
            </div>
        )
    )
}
