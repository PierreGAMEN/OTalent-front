import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/redux-hook/hook';
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

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [idSelectedCategory, setIdSelectedCategory] = useState<number | null>(
        null
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const query = `
            query Categories {
              categories {
                id
                label
              }
            }
          `;


    const fetchCategories = async () => {
        try {
            const query = `
                query Categories {
                    categories {
                        id
                        label
                    }
                }
            `;
    
            const url = import.meta.env.VITE_GRAPHQL_API;
    
            const response = await axios.post(url, { query });
            const data = response.data.data;
            const fetchedCategories = data.categories || [];
            
            setCategories(fetchedCategories);
   
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // const fetchCategories = async () => {
        
    //     const data = await requestWithoutVariable(queryCategories)

    //         const fetchedCategories = data.categories || [];
            
    //         setCategories(fetchedCategories);
   
    //         dispatch(getCategories(fetchedCategories));
    // };

    

        fetchCategories();
    }, [dispatch]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <>

        <form className={className} onSubmit={handleSubmit}>
            <div className="container-input-category">
            <select className='header-searchBar-select' name="categorie" id="categorie" value={selectedCategory} onChange={(e) => {
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
            </div>
            <div className="container-input-text">
                <input className='container-input-text-input'
                    type="text" 
                    name="searchTerm" 
                    id="searchTerm" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value) } 
                    placeholder="Développeur web, Agent ..." 
                />
            </div>
        </form>
        <NavLink to={`/search/${selectedCategory}&${searchTerm}&${idSelectedCategory}`}>
        <button className="buttonSearchBar" type="submit">Rechercher</button>
        </NavLink>
        </>
    );
};

export default SearchBar;
