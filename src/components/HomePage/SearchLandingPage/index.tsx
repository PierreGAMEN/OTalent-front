import { useState } from 'react';
import { useAppSelector } from '../../../store/redux-hook/hook'
import './style.scss'
export default function SearchLandingPage () {

const [categorieActive, setCategorieActive] = useState(true)
const [selectedCategory, setSelectedCategory] = useState('');
const [termSearched, setTermSearched] = useState('');
const [selectedIdCategory, setSelectCategoryId] = useState(null)

const categories = useAppSelector(state => state.categories.list);
console.log(categories)

const handleCategorieClick = () => {
setCategorieActive(true);
};

const handleMotCleClick = () => {
setCategorieActive(false);
};

const handleCategoryChange = (event) => {
setSelectedCategory(event.target.value);
setSelectCategoryId(event.target.options[event.target.selectedIndex].id)
};

const handleTermChange = (event) => {
    setTermSearched(event.target.value.toLowerCase());
    };

    return (
        <div id="searchBar" className="searchLandingPage">
          <h1 className='searchLandingPage-title'>Un clic et hop c'est magique !</h1>
      
          <div className='searchLandingPage-searchSection-categorie'>

            <div className='container-button-typeForm'>
              <button className={categorieActive && "active"} onClick={handleCategorieClick}>Catégories</button>
              <button className={!categorieActive && "active"} onClick={handleMotCleClick}>Mot-clés</button>
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
                onChange={handleCategoryChange}
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
                  <button onClick={() => { setSelectedCategory('') }}>x</button>
                </div>
              )}
              {termSearched && (
                <div>
                  {termSearched}
                  <button onClick={() => { setTermSearched('') }}>x</button>
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