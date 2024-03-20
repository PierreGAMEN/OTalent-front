import React, { useEffect, useState } from 'react';
import "./style.scss";
import axios from 'axios';

interface Category {
    label: string;
}

interface SearchBarProps {
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
    const [categories, setCategories] = useState<Category[]>([]); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const query = `
                    query Categories {
                        categories {
                            label
                        }
                    }
                `;

                const url = 'http://localhost:4000/graphql';

                const response = await axios.post(url, { query });
                const data = response.data.data;
                console.log(data);
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <form className={className} action="">
            <div className="container-input-category">
                <select name="categorie" id="pet-select">
                    {categories.map((categorie, index) => (
                        <option key={index}>{categorie.label}</option>
                    ))}
                </select>
            </div>
            <div className="container-input-text">
                <input type="text" name="" id="" value="" placeholder="Développeur Web, Cuisinier..." />
            </div>
            <button>Rechercher</button>
        </form>
    );
}

export default SearchBar;
