import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import regions from '../../../../data/region'
import { useAppSelector } from '../../../../store/redux-hook/hook';
import { Divider } from 'semantic-ui-react';

interface SearchBarProps {
    className?: string;
}
const SearchBar: React.FC<SearchBarProps> = () => {
    const categories = useAppSelector(state => state.categories.list);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [idSelectedCategory, setIdSelectedCategory] = useState<number | null>(
        null
    );
    const [filterIsOpen, setFilterIsOpen] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <form className="join lg:flex" onSubmit={handleSubmit}>
            

            <button onClick={() => {setFilterIsOpen(!filterIsOpen)}} className='btn join-item border-none bg-white hover:bg-white material-symbols-rounded'>filter_alt</button>
            {filterIsOpen && <div className='absolute top-20 bg-white p-5 rounded-md shadow-md'>
            
            <select
                className="select join-item border-none"
                name="region"
                id="region"
                value={selectedArea}
                onChange = {(e)=> {
                    setSelectedArea(e.target.value)
                }
            }
            >
                <option value="">Rechercher par région</option>
                {regions.map(region => (
                    <option
                        value={region}
                    >
                        {region}
                    </option>
                ))}
            </select>
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

                </div>}
            <div className="container-input-text ">
                <input
                    className="input join-item border-none border-primary-color"
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

                    const params = new URLSearchParams();

                    if (selectedCategory)
                        params.append('category', selectedCategory);
                    if (searchTerm) params.append('term', searchTerm);
                    if (idSelectedCategory)
                        params.append('id', idSelectedCategory);
                    if(selectedArea) params.append("area", selectedArea)

                    navigate(`/search?${params.toString()}`);
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
