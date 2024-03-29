import { useState } from 'react';
import { useAppSelector } from '../../../store/redux-hook/hook'
import './style.scss'

export default function SearchLandingPage() {
    const [categorieActive, setCategorieActive] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [termSearched, setTermSearched] = useState('');
    const [selectedIdCategory, setSelectCategoryId] = useState(null);

    const categories = useAppSelector(state => state.categories.list);

    const handleModeClick = (isCategoryMode) => {
        setCategorieActive(isCategoryMode);
    };

    const handleSelectionChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectCategoryId(event.target.options[event.target.selectedIndex].id);
    };

    const handleTermChange = (event) => {
        setTermSearched(event.target.value.toLowerCase());
    };

    const handleClearSelection = () => {
        setSelectedCategory('');
    };

    const handleClearTerm = () => {
        setTermSearched('');
    };

    return (
        <div id="searchBar" className="searchLandingPage">
            <h1 className='searchLandingPage-title'>Un clic et hop c'est magique !</h1>

            <div className='searchLandingPage-searchSection-categorie'>
                <div className='container-button-typeForm'>
                    <button className={categorieActive ? "active" : ""} onClick={() => handleModeClick(true)}>Catégories</button>
                    <button className={!categorieActive ? "active" : ""} onClick={() => handleModeClick(false)}>Mot-clés</button>
                </div>

                <h2>
                    {categorieActive
                        ? "Choisissez une catégorie"
                        : "Tapez le nom de la formation"}
                </h2>

                {categorieActive ? (
                    <select
                        className='searchLandingPage-searchSection-categorie-select'
                        value={selectedCategory}
                        onChange={handleSelectionChange}
                    >
                        <option value="">Veuillez choisir votre catégorie</option>
                        {categories.map((category) => (
                            <option id={category.id} key={category.id} value={category.label}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className='searchLandingPage-searchSection-categorie-select'
                        type="text"
                        placeholder="Entrez un mot clé"
                        onChange={handleTermChange}
                        value={termSearched}
                    />
                )}

                <div className='container-research'>
                    {selectedCategory && (
                        <div>
                            {selectedCategory}
                            <button onClick={handleClearSelection}>x</button>
                        </div>
                    )}
                    {termSearched && (
                        <div>
                            {termSearched}
                            <button onClick={handleClearTerm}>x</button>
                        </div>
                    )}
                </div>

                <a href={`/search/${selectedCategory}&${termSearched}&${selectedIdCategory}`} className='searchLandingPage-searchSection-categorie-button'>
                    Rechercher
                </a>
            </div>
        </div>
    );
}
