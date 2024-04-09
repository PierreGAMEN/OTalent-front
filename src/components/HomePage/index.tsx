import Hero from './Hero';
import TrainingList from './TrainingList';
import { useEffect, useState } from 'react';
import {
    fetchCategories,
    fetchData,
    requestWithVariable,
} from '../../utils';
import {
    queryAllTrainingCard,
    queryCategories,
    queryFavoritesCategories,
    queryMemberInformationForHomePage,
} from '../../query';
import { Loader } from 'semantic-ui-react';
import Feature from './Feature';
import { useAppSelector } from '../../store/redux-hook/hook';
import Guide from './Guide';

// TODO : Récupérer ID via le Token et récupérer les infos idMember

// TODO : Gérer le fait de ne pas avoir des catégories similaire qui s'affiche
// (vérifier qu'une catégorie selectionnée par l'utilisateur ne puissent pas être affichés dans nos selection)

export default function HomePage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [memberInfo, setMemberInfo] = useState({});
    const [isMemberInfoLoaded, setIsMemberInfoLoaded] = useState(false);
    const user = useAppSelector(state => state.token.user);


    const getTokenInformation = () => {
        if (user && user.member === true) {
            setIsMember(true);
        } 
    };

    const getMemberInformation = async () => {
    
            const variables = {
                memberId: user.id
            };
            setIsMemberInfoLoaded(false);
            const response = await requestWithVariable(queryMemberInformationForHomePage, variables);
            setMemberInfo(response);
            setIsMemberInfoLoaded(true);
    };

    useEffect(() => {
        fetchData(queryAllTrainingCard, null, null, setData, setIsLoading);
        fetchCategories();        
    }, []);

    useEffect(() => {
        getTokenInformation()
    }, [user])

    useEffect(() => {
        if(isMember)
        {setIsMemberInfoLoaded(false)
            getMemberInformation().then(() => {
                setIsMemberInfoLoaded(true)})}
            
    },[isMember] )
;


    return (
        <main className="flex flex-col gap-20 mb-20">
            <Hero />
            <Feature />
            <Guide />
    
            {isMemberInfoLoaded ? (
                <>
                    <h3>Vos catégories préférées</h3>
                    {isLoading && <Loader active inline="centered" />}
                    {memberInfo.data.member.categories.map(categorie => (
                        <TrainingList
                            key={categorie.id}
                            data={data}
                            categoryChosen={categorie.label}
                        />
                    ))}
                </>
            ) : (
                <Loader active inline="centered" />
            )}
            
            {isLoading && <Loader active inline="centered" />}
            
            {data && (
                <>
                    <h3>Découvrez notre sélection</h3>
                    <TrainingList data={data} categoryChosen="Informatique" />
                    <TrainingList data={data} categoryChosen="Arts" />
                    <TrainingList data={data} categoryChosen="Finance" />
                    <TrainingList data={data} categoryChosen="Business" />
                </>
            )}
        </main>
    );
}