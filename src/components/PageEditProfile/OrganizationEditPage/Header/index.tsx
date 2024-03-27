import './style.scss'
import { useState } from 'react'

export default function HeaderOrganizationEditPage ({data}) {

    const [isEdit, setIsEdit] = useState(false)

    const [lastname, setLastname] = useState(data.lastname)
    const [firstname, setfirstname] = useState(data.firstname)
    const [email, setEmail] = useState(data.email)
    const [city, setCity] = useState(data.city)
    const [postal_code, setPostal_code] = useState(data.postal_code)
    const [favoriteCategories, setFavoriteCategories] = useState([...data.categories])
    const [isAddNewCategegory, setIsAddNewCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedIdCategory, setSelectCategoryId] = useState(null)

    const handleChange = (e, setter) => {
        const value = e.target.value
        setter(value)
    }

    return (
        <div className='container-header-EditProfilPage'>
            
            <div>
                <img src={data.avatar} alt="" />
            </div> 
            <div className=''>
                <button onClick={()=> {setIsEdit(true)}}>Edit</button>
                <button onClick={()=> {setIsEdit(false)}}>Quitter le mode edit</button>
                {isEdit ? <><p className='container-header-EditProfilPage-p'>Nom :</p><input className='container-header-EditProfilPage-input' onChange={(e) => handleChange(e, setLastname)} type="text" value={lastname} /></> : <p>Nom: {data.lastname}</p>}

                {isEdit ? <><p className='container-header-EditProfilPage-p'>Prénom :</p><input className='container-header-EditProfilPage-input' onChange={(e) => handleChange(e, setfirstname)} type="text" value={firstname} /></> : <p>Prénom: {data.firstname}</p>}

                {isEdit ? <><p className='container-header-EditProfilPage-p'>Email :</p><input className='container-header-EditProfilPage-input' onChange={(e) => handleChange(e, setEmail)} type="email" value={email} /></> : <p>Email: {data.email}</p>}

                {isEdit ? <><p className='container-header-EditProfilPage-p'>Ville : </p><input className='container-header-EditProfilPage-input' onChange={(e) => handleChange(e, setCity)} type="email" value={city} /></> : <p>Ville : {data.city}</p>}

                {isEdit ? <><p className='container-header-EditProfilPage-p'>Code postal : </p><input className='container-header-EditProfilPage-input' onChange={(e) => handleChange(e, setPostal_code)} type="email" value={postal_code} /></> : <p>Code postal : {data.postal_code}</p>}

            </div>

        </div>
    )

}

   