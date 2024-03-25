import HeroSearchBar from "./Hero";
import TrainingList from "./TrainingList";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils";
import { queryAllCategories, queryAllTrainingCard } from "../../query";
import { Loader } from "semantic-ui-react";
import Caracteristique from "./Caractéristique";
import SearchLandingPage from "./SearchLandingPage";
import { useAppDispatch } from "../../store/redux-hook/hook";
import { getCategories } from "../../store/actions/categoriesActions";
import axios from "axios";

export default function HomePage () {

    const dispatch = useAppDispatch()

    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [categories, setCategories] = useState([])

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

            
            {isloading && <Loader active inline='centered' />}
            {data && (
                <>
                <TrainingList data={data} categoryChosen='Informatique' />
                <TrainingList data={data} categoryChosen='Philosophie' />
                <TrainingList data={data} categoryChosen='Physique' />
                <TrainingList data={data} categoryChosen='Sports' />
                </>
            )}
            
            
            
        </main>
    );
}


// 