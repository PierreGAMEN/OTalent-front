import HeroSearchBar from "./Hero";
import TrainingList from "./TrainingList";
import { useEffect, useState } from "react";
import { fetchCategories, fetchData } from "../../utils";
import { queryAllTrainingCard, queryFavoritesCategories } from "../../query";
import { Loader } from "semantic-ui-react";
import Caracteristique from "./Caractéristique";
import SearchLandingPage from "./SearchLandingPage";
import { useAppSelector } from "../../store/redux-hook/hook";

// TODO : Récupérer ID via le Token et récupérer les infos idMember
 
// TODO : Gérer le fait de ne pas avoir des catégories similaire qui s'affiche 
// (vérifier qu'une catégorie selectionnée par l'utilisateur ne puissent pas être affichés dans nos selection)

export default function HomePage () {


    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(false)

    const [favoritesCategories, setFavoritesCateogries] = useState([])
    const [loader, setLoader] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const [idMember, setIdMember] = useState('')

    const user = useAppSelector((state) => state.token.user);

    const getUserInformation = () => {
        
        if(user) {
            setIsMember(user.member)
            setIdMember(user.id)
        }
    }

    useEffect(() => {
        getUserInformation()

        fetchData(queryAllTrainingCard, null, null, setData, setIsloading)

        fetchCategories();

        if(isMember) {
            fetchData(queryFavoritesCategories, idMember, "memberId", setFavoritesCateogries, setLoader)
        }
    }, []);
    
    return (
        <main>
            <HeroSearchBar />
            <Caracteristique />
            <SearchLandingPage />

            {data && isMember && favoritesCategories.member && (
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