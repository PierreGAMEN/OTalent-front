import HeroSearchBar from "./Hero";
import TrainingList from "./TrainingList";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils";
import { queryAllCategories, queryAllTrainingCard, queryFavoritesCategories } from "../../query";
import { Loader } from "semantic-ui-react";
import Caracteristique from "./Caractéristique";
import SearchLandingPage from "./SearchLandingPage";
import { useAppDispatch } from "../../store/redux-hook/hook";
import { getCategories } from "../../store/actions/categoriesActions";
import axios from "axios";

// TODO : Récupérer ID via le Token et récupérer les infos idMember
 
// TODO : Gérer le fait de ne pas avoir des catégories similaire qui s'affiche 
// (vérifier qu'une catégorie selectionnée par l'utilisateur ne puissent pas être affichés dans nos selection)

export default function HomePage () {

    const dispatch = useAppDispatch()

    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [categories, setCategories] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [favoritesCategories, setFavoritesCateogries] = useState([])
    const [loader, setLoader] = useState(false)

    
    const idMember = JSON.parse(localStorage.getItem('itemKey')).id;
    console.log(idMember)

    useEffect(() => {
        if(idMember) {
            setIsConnected(true)
            fetchData(queryFavoritesCategories, idMember, "memberId", setFavoritesCateogries, setLoader)
        }
    }, [])
    
    useEffect( () => {
        fetchData(queryAllTrainingCard, null, null, setData, setIsloading)
    }, [])

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
    
    return (
        <main>
            <HeroSearchBar />
            <Caracteristique />
            <SearchLandingPage />

            {data && isConnected && favoritesCategories.member && (
                <>
                <h2>Vos catégories préféres</h2>
                {loader && <Loader active inline='centered' />}
                {favoritesCategories.member.categories.map((categorie) => (
                    <TrainingList key={categorie.id} data={data} categoryChosen={categorie.label} />
                ))}
                
                </>
            )}
            
            
            {isloading && <Loader active inline='centered' />}
            {data && (
                <>
                <h2>Découvrez notre selection</h2>
                <TrainingList data={data} categoryChosen='Informatique' />
                <TrainingList data={data} categoryChosen='Arts' />
                <TrainingList data={data} categoryChosen='Finance' />
                <TrainingList data={data} categoryChosen='Business' />
                </>
            )}

            
            
        </main>
    );
}


// 