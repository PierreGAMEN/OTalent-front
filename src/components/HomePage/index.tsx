import Hero from './Hero';
import TrainingList from './TrainingList';
import { useEffect, useState } from 'react';
import {
    fetchCategories,
    fetchData,
    requestWithVariable,
    requestWithoutVariable,
} from '../../utils';
import {
    queryAllTrainingCard,
    queryCategories,
    queryFavoritesCategories,
} from '../../query';
import { Loader } from 'semantic-ui-react';
import Feature from './Feature';
import SearchLandingPage from './SearchLandingPage';
import { useAppSelector } from '../../store/redux-hook/hook';
import Guide from './Guide';

// TODO : Récupérer ID via le Token et récupérer les infos idMember

// TODO : Gérer le fait de ne pas avoir des catégories similaire qui s'affiche
// (vérifier qu'une catégorie selectionnée par l'utilisateur ne puissent pas être affichés dans nos selection)

export default function HomePage() {
    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);

    const [favoritesCategories, setFavoritesCategories] = useState([]);

    const [loader, setLoader] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [idMember, setIdMember] = useState('');

    const user = useAppSelector(state => state.token.user);

    const getUserInformation = () => {
        if (user) {
            setIsMember(user.member ?? false);
            setIdMember(user.id ? String(user.id) : '');
        }
    };

    useEffect(() => {
        getUserInformation();

        fetchData(queryAllTrainingCard, null, null, setData, setIsloading);

        fetchCategories();

        if (isMember) {
            fetchData(
                queryFavoritesCategories,
                idMember,
                'memberId',
                setFavoritesCategories,
                setLoader
            );
        }
    }, []);

    // useEffect(() => {
    //     getUserInformation()

    //     setIsloading(true)
    //     requestWithoutVariable(queryAllTrainingCard)

    //     requestWithoutVariable(queryCategories)
    //     setIsloading(false)

    //     if(isMember) {
    //         const variables = {
    //             idMember: idMember
    //         }
    //         setIsloading(true)
    //         requestWithVariable(queryFavoritesCategories, variables)
    //         setIsloading(false)
    //     }
    // }, []);

    return (
        <main className="flex flex-col gap-20 mb-20">
            <Hero />
            <Feature />
            <Guide />
            {data && isMember && favoritesCategories.member && (
                <>
                    <h3>Vos catégories préférées</h3>
                    {loader && <Loader active inline="centered" />}
                    {favoritesCategories.member.categories.map(categorie => (
                        <TrainingList
                            key={categorie.id}
                            data={data}
                            categoryChosen={categorie.label}
                        />
                    ))}
                </>
            )}
            {isloading && <Loader active inline="centered" />}
            {data && (
                <>
                    <h3>Découvrez notre selection</h3>
                    <TrainingList data={data} categoryChosen="Informatique" />
                    <TrainingList data={data} categoryChosen="Arts" />
                    <TrainingList data={data} categoryChosen="Finance" />
                    <TrainingList data={data} categoryChosen="Business" />
                </>
            )}
        </main>
    );
}

//
