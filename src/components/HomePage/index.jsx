import Hero from './Hero';
import TrainingList from './TrainingList';
import { useEffect, useState } from 'react';
import { fetchCategories, fetchData, requestWithVariable } from '../../utils';
import {
    queryAllTrainingCard,
    queryMemberInformationForHomePage,
} from '../../query';
import { Loader } from 'semantic-ui-react';
import Feature from './Feature';
import { useAppSelector } from '../../store/redux-hook/hook';
import Guide from './Guide';
import TrainingCard from './TrainingCard';
import React from 'react';



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
            memberId: user.id,
        };
        setIsMemberInfoLoaded(false);
        const response = await requestWithVariable(
            queryMemberInformationForHomePage,
            variables
        );
        setMemberInfo(response);
        setIsMemberInfoLoaded(true);
    };

    useEffect(() => {
        fetchData(queryAllTrainingCard, null, null, setData, setIsLoading);
        fetchCategories();
    }, []);

    useEffect(() => {
        getTokenInformation();
    }, [user]);

    useEffect(() => {
        if (isMember) {
            setIsMemberInfoLoaded(false);
            getMemberInformation().then(() => {
                setIsMemberInfoLoaded(true);
            });
        }
    }, [isMember]);

    let count = 0;
    return (
        <main className="flex flex-col gap-20 mb-20">
            <Hero />
            <Feature />
            <Guide />

            {isMemberInfoLoaded ? (
                <>
                    {isMemberInfoLoaded &&
                        memberInfo.data.member.categories.length > 0 && (
                            <>
                                <h3>Vos catégories préférées</h3>
                                {isLoading && (
                                    <Loader active inline="centered" />
                                )}
                                {memberInfo.data.member.categories.map(
                                    categorie => (
                                        <TrainingList
                                            key={categorie.id}
                                            data={data}
                                            categoryChosen={categorie.label}
                                        />
                                    )
                                )}
                            </>
                        )}

                    <h3>
                        Proche de chez vous, en {memberInfo.data.member.region}{' '}
                        :
                    </h3>
                    {isLoading && <Loader active inline="centered" />}
                    {memberInfo.data.member.nearestOrganizations.length > 0 ? (
                        <div className="flex overflow-scroll gap-5">
                            {memberInfo.data.member.nearestOrganizations.map(
                                organization =>
                                    organization.trainings.map(training => {
                                        if (count < 5) {
                                            count++;
                                            return (
                                                <TrainingCard
                                                    key={training.id}
                                                    dateCreated={
                                                        training.created_at
                                                    }
                                                    organizationId={
                                                        training.organization.id
                                                    }
                                                    trainingId={training.id}
                                                    label={training.label}
                                                    duration={training.duration}
                                                    price={training.price}
                                                    organization={
                                                        training.organization
                                                            .name
                                                    }
                                                    category={
                                                        training.category.label
                                                    }
                                                    image={training.image}
                                                    categoryId={
                                                        training.category.id
                                                    }
                                                    reviews={training.reviews}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    })
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="flex flex-col md:flex-row w-3/4 p-5 items-center justify-evenly gap-5 text-primary-color">
                                <img
                                    className="w-5/6"
                                    src="/src/assets/No data-bro.svg"
                                    alt="No data"
                                />
                                <p className="text-left text-xl md:text-3xl">
                                    Nous sommes navrés, nous ne disposons pas
                                    encore de formations disponibles dans votre
                                    région...
                                </p>
                            </div>
                        </div>
                    )}
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
