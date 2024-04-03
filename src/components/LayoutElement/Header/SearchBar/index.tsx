import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/redux-hook/hook';
import { getCategories } from '../../../../store/actions/categoriesActions';
import { requestWithoutVariable } from '../../../../utils';
import { queryCategories } from '../../../../query';

interface Category {
    label: string;
    id: string | number 
}

interface SearchBarProps {
    className?: string;
    id: number;

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


    return (
        <>

        <form className="join" onSubmit={handleSubmit}>
            <select className='select select-bordered join-item' name="categorie" id="categorie" value={selectedCategory} onChange={(e) => {
                setSelectedCategory(e.target.value);
                const selectedIndex = e.target.selectedIndex;
                const selectedOption = e.target.options[selectedIndex]; 
                const idSelectedOption = parseInt(selectedOption.id); 
                setIdSelectedCategory(idSelectedOption); 
            }}>

                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category) => (
                        <option 
                            id={category.id} 
                            key={category.id} 
                            value={category.label}>
                            {category.label}
                        </option>
                    ))}
                    
                </select>
         
            <div className="container-input-text">
                <input className='input join-item'
                    type="text" 
                    name="searchTerm" 
                    id="searchTerm" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value) } 
                    placeholder="Rechercher" 
                />
            </div>
        
        <NavLink to={`/search/${selectedCategory}&${searchTerm}&${idSelectedCategory}`}>
        <button className="btn join-item" type="submit">Rechercher</button>
        </NavLink>
        </form>
        </>
    );
};

export default SearchBar;
