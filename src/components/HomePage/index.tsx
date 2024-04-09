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
    const [isloading, setIsloading] = useState(false);

    const [loader, setLoader] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [idMember, setIdMember] = useState('');
    const [memberInfo, setMemberInfo] = useState({})

    const user = useAppSelector(state => state.token.user);

    const getTokenInformation = () => {
        if (user) {
            setIsMember(user.member ?? false);
            setIdMember(user.id ? String(user.id) : '');
        }
    };

    const getMemberInformation = async () => {
        const variables = {
            memberId: user.id
        }
        const response = await requestWithVariable(queryMemberInformationForHomePage, variables)
        setMemberInfo(response)
        console.log(response)
    }

    useEffect(() => {
        getTokenInformation();

        fetchData(queryAllTrainingCard, null, null, setData, setIsloading);

        fetchCategories();

        
    }, []);

    useEffect(() => {
        if (isMember) {
            getMemberInformation()
        }
    }, [isMember])

    return (
        <main className="flex flex-col gap-20 mb-20">
            <Hero />
            <Feature />
            <Guide />
            {data && isMember && memberInfo.data && (
                <>
                    <h3>Vos catégories préférées</h3>
                    {loader && <Loader active inline="centered" />}
                    {memberInfo.data.member.categories.map(categorie => (
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
