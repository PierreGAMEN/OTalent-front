import { useState } from 'react';
import './style.scss';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import {
    associateMemberCategory,
    deleteMemberCategory,
    requestWithVariable,
} from '../../../../utils';
import { deleteMember, queryUpdateMemberInformation } from '../../../../query';
import { Button, Divider } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import ReviewsEditProfilPageMember from '../Reviews';

// TODO : Retravailler le CSS

export default function HeaderEditProfilPageMember({ data, memberId }) {
    const [isEdit, setIsEdit] = useState(false);
    const [editCategories, setEditCategories] = useState(false)

    const [lastname, setLastname] = useState(data.lastname);
    const [firstname, setfirstname] = useState(data.firstname);
    const [email, setEmail] = useState(data.email);
    const [city, setCity] = useState(data.city);
    const [postal_code, setPostal_code] = useState(data.postal_code);
    const [favoriteCategories, setFavoriteCategories] = useState([
        ...data.categories,
    ]);
    const [isAddNewCategegory, setIsAddNewCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedIdCategory, setSelectCategoryId] = useState(null);
    const [deleteConfim, setDeleteConfirm] =useState(false)

    const categories = useAppSelector(state => state.categories.list);
    const user = useAppSelector(state => state.token.user);
    console.log(user.id)


    const categoriesAvailable = categories.filter(
        elementPrincipal =>
            !favoriteCategories.some(
                elementFiltre => elementPrincipal.label === elementFiltre.label
            )
    );

    const handleChange = (e, setter) => {
        const value = e.target.value;
        setter(value);
    };

    const handleCategoryChange = event => {
        setSelectedCategory(event.target.value);
        setSelectCategoryId(
            event.target.options[event.target.selectedIndex].id
        );
    };

    const AddCategory = () => {
        setFavoriteCategories([
            ...favoriteCategories,
            { id: selectedIdCategory, label: selectedCategory },
        ]);
        if (selectedIdCategory !== null) {
            associateMemberCategory(memberId, parseInt(selectedIdCategory));
        }
        setSelectedCategory('');
        setIsAddNewCategory(false);
    };

    const deleteCategorie = e => {
        const labelToDelete = e.target.id;
        const newFavoriteCategories = favoriteCategories.filter(
            categorie => categorie.id !== labelToDelete
        );
        setFavoriteCategories(newFavoriteCategories);
        deleteMemberCategory(memberId, labelToDelete);
    };

    const deleteAccount = async () => {
        const variables = {
                deleteMemberId: user.id
        }
        await requestWithVariable(deleteMember,variables)
        localStorage.removeItem('token')
        window.location.href = "/";
    }


    const updateMemberInformation = async (e) => {
        e.preventDefault()
        const variables = {
            modifyMemberId: user.id,
            input : {
                firstname: firstname,
                lastname: lastname,
                email: email,
                city: city,
                postalCode: postal_code
            }
        }

        try {

            await requestWithVariable(queryUpdateMemberInformation, variables)
            setIsEdit(false);
            location.reload();

        } catch(error) {
            console.log(error)
        }
    }

    

    return (
        
         <div className="relative pr-5">
            
            <div className='h-40 w-full bg-primary-color absolute top-0'></div>
            <div className='flex flex-col items-center lg:flex-row'>
            <div className='modal-box flex flex-col items-center gap-3'>
            <button onClick={() => {setIsEdit(true)}} className="material-symbols-rounded absolute top-4 right-10">edit</button>
                <div className='flex w-24 h-24 rounded-full border bg-primary-color text-white text-xl items-center'>
                    {data.avatar && <img  src={data.avatar} alt="" />}
                    {!data.avatar && <p className=''>{`${data.firstname[0]}${data.lastname[0]}`}</p>}
                </div>
                <p className='text-xl'>{`${data.firstname} ${data.lastname}`}</p>
                <p><span className='material-symbols-rounded'>email</span> {data.email}</p>
                <p><span className='material-symbols-rounded'>location_on</span> {data.city ? data.city : "Vous n'avez pas renseigné votre ville"}</p>
                <p><span className='material-symbols-rounded'>map</span> {data.postal_code ? data.postal_code : "Vous n'avez pas renseigné votre code postal"}</p>
                <div className='divider before:bg-primary-color after:bg-primary-color'></div>
                <div className='relative w-full flex flex-col items-center'>
                <h5>Vos catégories préférées</h5>
                <button onClick={() => {setEditCategories(true)}} className="material-symbols-rounded absolute top-0 right-0">edit</button>
                {favoriteCategories.map(categorie => (<p className='mt-2'> {categorie.label}</p>))}
                </div>
                <div className='divider before:bg-primary-color after:bg-primary-color'></div>
                {!deleteConfim && <button type="button" className='btn bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white' onClick={()=> {setDeleteConfirm(true)}}>Supprimer votre compte</button>}
            {deleteConfim && 
                <div className='mt-5 mb-5'>
                    <p className='mb-2'>Êtes-vous sur de vouloir supprimer votre compte ?</p>
                    <button type="button" className='btn bg-red-600 text-white' onClick={deleteAccount}>OUI</button>
                    <button type="button" className='btn ml-2' onClick={()=> {setDeleteConfirm(false)}}>NON</button>
                </div>}
            </div>
            <div className='mt-40 w-full'>
                <ReviewsEditProfilPageMember data={data}/>
            </div>
            
            </div>
          
    
    {isEdit && 
        <dialog className="modal" open>
            
        <form className='modal-box flex flex-col gap-2'>
        <h5 className='mb-5'>Modification de vos données personnelles</h5>
            <label className="input input-bordered flex items-center gap-2">
            <span className='material-symbols-rounded'>id_card</span>
            <input
                className="grow"
                onChange={e => handleChange(e, setLastname)}
                type="text"
                value={lastname}
                placeholder='Entrez votre nom'
            /></label>

            <label className="input input-bordered flex items-center gap-2">
            <span className='material-symbols-rounded'>badge</span>
            <input
                className="grow"
                onChange={e => handleChange(e, setfirstname)}
                type="text"
                value={firstname}
                placeholder='Entrez votre prénom'
            /></label>

            <label className="input input-bordered flex items-center gap-2">
            <span className='material-symbols-rounded'>email</span>
            <input
                className="container-header-EditProfilPage-input"
                onChange={e => handleChange(e, setEmail)}
                type="email"
                value={email}
                placeholder='Entrez votre email'
            /></label>

            <label className="input input-bordered flex items-center gap-2">
            <span className='material-symbols-rounded'>location_on</span>
            <input
                className="container-header-EditProfilPage-input"
                onChange={e => handleChange(e, setCity)}
                type="text"
                value={city}
                placeholder='Entrez votre ville'
            /></label>

            <label className="input input-bordered flex items-center gap-2">
            <span className='material-symbols-rounded'>map</span>
            <input
                className="container-header-EditProfilPage-input"
                onChange={e => handleChange(e, setPostal_code)}
                type="text"
                value={postal_code}
                placeholder='Entrez votre code postal'
            /></label>

            <button type="submit" className='btn bg-green-600 text-white mt-5' onClick={updateMemberInformation}>Valider les changements</button>
            <button type="button"className='btn bg-blue-600 text-white' onClick={() => {setIsEdit(false); setDeleteConfirm(false) }}>Quitter l'édition de vos données</button>
        </form>
        </dialog>
    }

     
                {editCategories && 
                    <>
                    <dialog className="modal" open>
                        <form className='modal-box flex flex-col gap-2'>
                            <h5>Modification de vos catégories favoris</h5>
                                <select className="select select-bordered w-full max-w-xs"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    <option  disabled selected>
                                        Veuillez choisir votre catégorie
                                    </option>
                                    {categoriesAvailable.map(category => (
                                        <option
                                            id={category.id}
                                            key={category.id}
                                            value={category.label}
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                                <div>
                            {favoriteCategories.map(categorie => (
                                <div className="flex gap-4" key={categorie.id}>
                                    <button  className="material-symbols-rounded" onClick={e => {deleteCategorie(e); }} id={categorie.id}>
                                      delete 
                                    </button>
                                    <p >{categorie.label}</p>
                                </div>
                            ))}
                        </div>
                                <button type="button" className='btn bg-green-600 text-white' onClick={AddCategory}>Ajouter cette catégorie</button>
                                <button type="button" className='btn bg-blue-600 text-white' onClick={() => {setEditCategories(false)}}>Quitter l'édition des catégories</button>
                        </form>
                    </dialog>
                        </>}
</div>)}
