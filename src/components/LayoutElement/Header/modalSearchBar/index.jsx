import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import regions from '../../../../data/region';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import { Divider } from 'semantic-ui-react';

const ModalSearchBar = () => {
    const categories = useAppSelector((state) => state.categories.list);
    const [searchTerm, setsearchTerm] = useState('');
    const [selectedArea, setselectedArea] = useState('');
    const [selectedCategory, setselectedCategory] = useState('');
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [openModalSearch, setOpenModalSearch] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <>
            <button
                onClick={() => setOpenModalSearch(true)}
                className="material-symbols-rounded p-1 bg-primary-color rounded-full text-[40px] text-white hover:bg-white hover:text-primary-color"
                aria-label="Effectuer une recherche">
                search
            </button>
            <dialog className="modal" open={openModalSearch}>
                <form
                    className="modal-box border border-black overflow-hidden"
                    onSubmit={handleSubmit}>
                    <h5 className="mb-5">Recherche votre formation</h5>
                    <div className="m-3 w-full flex items-center">
                        <span className="material-symbols-rounded mr-1">
                            search
                        </span>
                        <input
                            className="input w-full"
                            type="text"
                            name="searchTerm"
                            id="searchTerm"
                            value={searchTerm}
                            onChange={(e) => setsearchTerm(e.target.value)}
                            placeholder="Titre de formation, nom d’organisme..."></input>
                    </div>
                    <div className="mb-3 bg-white gap-2 flex flex-col">
                        <select
                            className="select border-none"
                            name="region"
                            id="region"
                            value={selectedArea}
                            onChange={(e) => {
                                setselectedArea(e.target.value);
                            }}>
                            <option value="">Rechercher par région</option>
                            {regions.map((region, index) => (
                                <option value={region} key={index}>
                                    {region}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select border-none"
                            name="category"
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => {
                                setselectedCategory(e.target.value);
                                const selectedIndex = e.target.selectedIndex;
                                const selectedOption =
                                    e.target.options[selectedIndex];
                                setIdSelectedCategory(selectedOption.id);
                            }}>
                            <option value="">Toutes nos catégories</option>
                            {categories.map((category) => (
                                <option
                                    id={category.id}
                                    key={category.id}
                                    value={category.label}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="btn btn-outline btn-success mb-3 w-full"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();

                            const params = new URLSearchParams();

                            if (selectedCategory)
                                params.append('category', selectedCategory);
                            if (searchTerm) params.append('term', searchTerm);
                            if (idSelectedCategory)
                                params.append('id', idSelectedCategory);
                            if (selectedArea)
                                params.append('area', selectedArea);

                            navigate(`/search?${params.toString()}`);
                            setOpenModalSearch(false);
                        }}>
                        Recherche
                    </button>
                    <button
                        onClick={() => setOpenModalSearch(false)}
                        className="btn block">
                        Fermer
                    </button>
                </form>
            </dialog>
        </>
    );
};

export default ModalSearchBar;
