import { useState } from 'react';
import './style.scss';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import {
    associateMemberCategory,
    deleteMemberCategory,
} from '../../../../utils';

// TODO : Retravailler le CSS

export default function HeaderEditProfilPageMember({ data, memberId }) {
    const [isEdit, setIsEdit] = useState(false);

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

    const categories = useAppSelector(state => state.categories.list);
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

    return (
        <div className="container-header-EditProfilPage">
            <div>
                <img src={data.avatar} alt="" />
            </div>
            <div className="">
                <button
                    onClick={() => {
                        setIsEdit(true);
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        setIsEdit(false);
                    }}
                >
                    Quitter le mode edit
                </button>
                {isEdit ? (
                    <>
                        <p className="container-header-EditProfilPage-p">
                            Nom :
                        </p>
                        <input
                            className="container-header-EditProfilPage-input"
                            onChange={e => handleChange(e, setLastname)}
                            type="text"
                            value={lastname}
                        />
                    </>
                ) : (
                    <p>Nom: {data.lastname}</p>
                )}

                {isEdit ? (
                    <>
                        <p className="container-header-EditProfilPage-p">
                            Prénom :
                        </p>
                        <input
                            className="container-header-EditProfilPage-input"
                            onChange={e => handleChange(e, setfirstname)}
                            type="text"
                            value={firstname}
                        />
                    </>
                ) : (
                    <p>Prénom: {data.firstname}</p>
                )}

                {isEdit ? (
                    <>
                        <p className="container-header-EditProfilPage-p">
                            Email :
                        </p>
                        <input
                            className="container-header-EditProfilPage-input"
                            onChange={e => handleChange(e, setEmail)}
                            type="email"
                            value={email}
                        />
                    </>
                ) : (
                    <p>Email: {data.email}</p>
                )}

                {isEdit ? (
                    <>
                        <p className="container-header-EditProfilPage-p">
                            Ville :{' '}
                        </p>
                        <input
                            className="container-header-EditProfilPage-input"
                            onChange={e => handleChange(e, setCity)}
                            type="email"
                            value={city}
                        />
                    </>
                ) : (
                    <p>Ville : {data.city}</p>
                )}

                {isEdit ? (
                    <>
                        <p className="container-header-EditProfilPage-p">
                            Code postal :{' '}
                        </p>
                        <input
                            className="container-header-EditProfilPage-input"
                            onChange={e => handleChange(e, setPostal_code)}
                            type="email"
                            value={postal_code}
                        />
                    </>
                ) : (
                    <p>Code postal : {data.postal_code}</p>
                )}

                {isEdit ? (
                    <>
                        <p>Catégories préférées : </p>
                        <button
                            onClick={() => {
                                setIsAddNewCategory(!isAddNewCategegory);
                            }}
                        >
                            {!isAddNewCategegory
                                ? 'Ajouter une nouvelle catégorie'
                                : 'Ne plus ajouter de catégorie'}
                        </button>
                        {isAddNewCategegory && (
                            <>
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">
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
                                {selectedCategory && (
                                    <button onClick={AddCategory}>V</button>
                                )}
                            </>
                        )}
                        <div>
                            {favoriteCategories.map(categorie => (
                                <p key={categorie.id}>
                                    <button
                                        onClick={e => {
                                            deleteCategorie(e);
                                        }}
                                        id={categorie.id}
                                    >
                                        X
                                    </button>
                                    {categorie.label}
                                </p>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <p>Catégories préférées :</p>
                        <div>
                            {favoriteCategories.map(categorie => (
                                <div key={categorie.id}>{categorie.label}</div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
