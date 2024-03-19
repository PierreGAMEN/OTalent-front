import React from 'react';
import "./style.scss";

interface SearchBarProps {
    className?: string; 
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
    return (
        <form className={className} action="">
            <div className="container-input-category">
                <input type="text" name="" id="" value="Technologie" />
            </div>
            <div className="container-input-text">
                <input type="text" name="" id="" value="" placeholder="Développeur Web, Cuisinier..." />
            </div>
            <button>Rechercher</button>
        </form>
    );
}

export default SearchBar;
