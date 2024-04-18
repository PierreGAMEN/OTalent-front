import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import regions from '../../../../data/region';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import { Divider } from 'semantic-ui-react';

const SearchBar = () => {
    const categories = useAppSelector((state) => state.categories.list);
    const [searchTerm, setsearchTerm] = useState('');
    const [selectedArea, setselectedArea] = useState('');
    const [selectedCategory, setselectedCategory] = useState('');
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [filterIsOpen, setFilterIsOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <form className="join lg:flex" onSubmit={handleSubmit}>
            <button
                onClick={() => {
                    setFilterIsOpen(!filterIsOpen);
                }}
                className="btn join-item border-none bg-white hover:bg-white material-symbols-rounded"
                aria-label="Ajouter un filtre de recherche">
                filter_alt
            </button>
            {filterIsOpen && (
                <div className="absolute top-20 bg-white p-5 rounded-md shadow-md">
                    <select
                        className="select join-item border-none"
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
                        className="select join-item border-none"
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
            )}
            
                <input
                    className="input join-item border-none border-primary-color w-full"
                    type="text"
                    name="searchTerm"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                    placeholder="Titre de formation, nom d’organisme..."
                />
            
            <button
                className="btn join-item border-none bg-white hover:bg-white"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    setFilterIsOpen(false)
                    const params = new URLSearchParams();

                    if (selectedCategory)
                        params.append('category', selectedCategory);
                    if (searchTerm) params.append('term', searchTerm);
                    if (idSelectedCategory)
                        params.append('id', idSelectedCategory);
                    if (selectedArea) params.append('area', selectedArea);

                    navigate(`/search?${params.toString()}`);
                }}>
                <span className="material-symbols-rounded p-1 bg-primary-color rounded-full text-white hover:bg-white hover:text-primary-color">
                    search
                </span>
            </button>
        </form>
    );
};

export default SearchBar;
