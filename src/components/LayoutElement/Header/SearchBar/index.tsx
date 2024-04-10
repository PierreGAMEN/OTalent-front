import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../../store/redux-hook/hook';

interface SearchBarProps {
    className?: string;
}
const SearchBar: React.FC<SearchBarProps> = () => {
    const categories = useAppSelector(state => state.categories.list);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [idSelectedCategory, setIdSelectedCategory] = useState<number | null>(
        null
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <form className="join lg:flex" onSubmit={handleSubmit}>
            <select
                className="select join-item border-none"
                name="category"
                id="category"
                value={selectedCategory}
                onChange={e => {
                    setSelectedCategory(e.target.value);
                    const selectedIndex = e.target.selectedIndex;
                    const selectedOption = e.target.options[selectedIndex];
                    const idSelectedOption = parseInt(selectedOption.id);
                    setIdSelectedCategory(idSelectedOption);
                }}
            >
                <option value="">Toutes nos catégories</option>
                {categories.map(category => (
                    <option
                        id={category.id}
                        key={category.id}
                        value={category.label}
                    >
                        {category.label}
                    </option>
                ))}
            </select>

            <div className="container-input-text ">
                <input
                    className="input join-item w-[310px] border-none border-primary-color"
                    type="text"
                    name="searchTerm"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Titre de formation, nom d’organisme..."
                />
            </div>

            <button
                className="btn join-item border-none bg-white hover:bg-white"
                type="submit"
                onClick={e => {
                    e.preventDefault();
                    if (selectedCategory && searchTerm && idSelectedCategory) {
                        navigate(
                            `/search/${selectedCategory || ''}${
                                searchTerm ? `&${searchTerm}` : ''
                            }${
                                idSelectedCategory
                                    ? `&${idSelectedCategory}`
                                    : ''
                            }`
                        );
                    }
                }}
            >
                <span className="material-symbols-rounded p-1 bg-primary-color rounded-full text-white hover:bg-white hover:text-primary-color">
                    search
                </span>
            </button>
        </form>
    );
};

export default SearchBar;
