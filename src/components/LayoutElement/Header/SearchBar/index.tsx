import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.scss";
import { NavLink } from 'react-router-dom';

interface Category {
    label: string;
   
}

interface SearchBarProps {
    className?: string;
    id: number
}



const SearchBar: React.FC<SearchBarProps> = ({ className }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [idSelectedCategory, setIdSelectedCategory] = useState<number|null>(null);


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

            const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';

            const response = await axios.post(url, { query });
            const data = response.data.data;
            setCategories(data.categories || []);
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
        <form className={className} onSubmit={handleSubmit}>
            <div className="container-input-category">
            <select name="categorie" id="pet-select" value={selectedCategory} onChange={(e) => {
    setSelectedCategory(e.target.value);
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex]; 
    const idSelectedOption = parseInt(selectedOption.id); 
    setIdSelectedCategory(idSelectedOption); 
}}>

                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((categorie) => (
                        <option 
                            id={categorie.id} 
                            key={categorie.id} 
                            value={categorie.label}>
                            {categorie.label}
                        </option>
                    ))}
                    
                </select>
            </div>
            <div className="container-input-text">
                <input 
                    type="text" 
                    name="searchTerm" 
                    id="searchTerm" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value) } 
                    placeholder="Développeur web, Agent ..." 
                />
            </div>
            <NavLink to={`/search/${selectedCategory}&${searchTerm}&${idSelectedCategory}`}>
            <button type="submit">Rechercher</button>
            </NavLink>
        </form>
    );
}

export default SearchBar;
