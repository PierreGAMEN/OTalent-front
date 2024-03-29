import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.scss";
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/redux-hook/hook';
import { getCategories } from '../../../../store/actions/categoriesActions';

interface Category {
    label: string;
    id: number
}

interface SearchBarProps {
    className?: string;

}



const SearchBar: React.FC<SearchBarProps> = ({ className }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [idSelectedCategory, setIdSelectedCategory] = useState<number|null>(null);

    const dispatch = useAppDispatch()


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
    
            // const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';
            const url = 'http://localhost:4000/graphql';
    
            const response = await axios.post(url, { query });
            const data = response.data.data;
            const fetchedCategories = data.categories || [];
            
            setCategories(fetchedCategories);
   
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    useEffect(() => {
        fetchCategories();
    }, []);

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
}

export default SearchBar;
