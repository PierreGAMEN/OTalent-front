import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
    queryAllTrainingCard,
    queryTrainingFromCategory,
    queryTrainingsByRegions,
} from '../../query';
import { Loader } from 'semantic-ui-react';
import TrainingCard from '../HomePage/TrainingCard';
import './style.scss';
import { requestWithVariable, requestWithoutVariable } from '../../utils';
import React from 'react';

export default function SearchPage() {
    const [dataFetch, setDataFetch] = useState([]);
    const [isloading, setIsloading] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categorie = params.get('category');
    const term = params.get('term');
    const id = params.get('id');
    const area = params.get('area');
    const getTrainingFromAreaFirst = async () => {
        if (area) {
            const variables = {
                regionName: area,
            };
            const response = await requestWithVariable(
                queryTrainingsByRegions,
                variables
            );
            setDataFetch(response);
        }
    };

    const getTrainingFromTerm = async () => {
        setIsloading(false)
        const response = await requestWithoutVariable(queryAllTrainingCard)
        setIsloading(true)
        setDataFetch(response.data);
    }

    const getTrainingFromCategories = async () => {
        const variables = {
            categoryId: id
        }
        setIsloading(false)
        const response = await requestWithVariable(queryTrainingFromCategory, variables)
        setIsloading(true)
        setDataFetch(response.data);
    }

    useEffect(() => {
        getTrainingFromAreaFirst();
        if (term && !area) {
            getTrainingFromTerm()
        } else if (categorie && !term && !area) {
            getTrainingFromCategories()
        }
    }, [categorie, term, id, area]);

    return (
        <>
            <div className="container-search">
                <h4 className='mb-5 ml-5 text-xl sm:text-3xl'>
                    Résultats de la recherche "{term}"
                    {categorie ? (
                        <span> pour la catégorie {categorie}</span>
                    ) : null}
                    {area ? (
                        <span> dans la région {area}</span>
                    ) : null}
                </h4>
                <div className="container-search-card mb-5">
                    {categorie &&
                        !term &&
                        dataFetch &&
                        dataFetch.category &&
                        dataFetch.category.trainings &&
                        dataFetch.category.trainings.map((training) => (
                            <TrainingCard
                                key={training.id}
                                label={training.label}
                                dateCreated={''}
                                duration={training.duration}
                                price={training.price}
                                category={training.category.label}
                                image={training.image}
                                categoryId={training.category.id}
                                organization={training.organization.name}
                                trainingId={training.id}
                                reviews={training.reviews}
                                organizationId={training.organization.id}
                            />
                        ))}

                    {categorie &&
                        term &&
                        dataFetch &&
                        dataFetch.trainings &&
                        dataFetch.trainings
                            .filter(
                                (training) =>
                                    training.category.label === categorie &&
                                    training.label
                                        .toLowerCase()
                                        .includes(term.toLowerCase())
                            )
                            .map((training) => (
                                <TrainingCard
                                    key={training.id}
                                    label={training.label}
                                    dateCreated={''}
                                    duration={training.duration}
                                    price={training.price}
                                    category={training.category.label}
                                    image={training.image}
                                    categoryId={training.category.id}
                                    organization={training.organization.name}
                                    trainingId={training.id}
                                    reviews={training.reviews}
                                    organizationId={training.organization.id}
                                />
                            ))}

                    {term &&
                        !categorie &&
                        dataFetch &&
                        dataFetch.trainings &&
                        dataFetch.trainings
                            .filter((training) =>
                                training.label
                                    .toLowerCase()
                                    .includes(term.toLowerCase())
                            )
                            .map((training) => (
                                <TrainingCard
                                    key={training.id}
                                    label={training.label}
                                    dateCreated={''}
                                    duration={training.duration}
                                    price={training.price}
                                    category={training.category.label}
                                    image={training.image}
                                    categoryId={training.category.id}
                                    organization={training.organization.name}
                                    trainingId={training.id}
                                    reviews={training.reviews}
                                    organizationId={training.organization.id}
                                />
                            ))}

                    {area &&
                        term &&
                        !categorie &&
                        dataFetch.data &&
                        dataFetch.data.trainingsByRegion
                            .filter((training) =>
                                training.label
                                    .toLowerCase()
                                    .includes(term.toLowerCase())
                            )
                            .map((training) => (
                                <TrainingCard
                                    key={training.id}
                                    label={training.label}
                                    dateCreated={''}
                                    duration={training.duration}
                                    price={training.price}
                                    category={training.category.label}
                                    image={training.image}
                                    categoryId={training.category.id}
                                    organization={training.organization.name}
                                    trainingId={training.id}
                                    reviews={training.reviews}
                                    organizationId={training.organization.id}
                                />
                            ))}

                    {area &&
                        term &&
                        categorie &&
                        dataFetch.data &&
                        dataFetch.data.trainingsByRegion
                            .filter(
                                (training) =>
                                    training.category.label === categorie &&
                                    training.label
                                        .toLowerCase()
                                        .includes(term.toLowerCase())
                            )
                            .map((training) => (
                                <TrainingCard
                                    key={training.id}
                                    label={training.label}
                                    dateCreated={''}
                                    duration={training.duration}
                                    price={training.price}
                                    category={training.category.label}
                                    image={training.image}
                                    categoryId={training.category.id}
                                    organization={training.organization.name}
                                    trainingId={training.id}
                                    reviews={training.reviews}
                                    organizationId={training.organization.id}
                                />
                            ))}

                    {area &&
                        !term &&
                        categorie &&
                        dataFetch.data &&
                        dataFetch.data.trainingsByRegion
                            .filter(
                                (training) =>
                                    training.category.label === categorie
                            )
                            .map((training) => (
                                <TrainingCard
                                    key={training.id}
                                    label={training.label}
                                    dateCreated={''}
                                    duration={training.duration}
                                    price={training.price}
                                    category={training.category.label}
                                    image={training.image}
                                    categoryId={training.category.id}
                                    organization={training.organization.name}
                                    trainingId={training.id}
                                    reviews={training.reviews}
                                    organizationId={training.organization.id}
                                />
                            ))}

                    {area &&
                        !term &&
                        !categorie &&
                        dataFetch.data &&
                        dataFetch.data.trainingsByRegion.map((training) => (
                            <TrainingCard
                                key={training.id}
                                label={training.label}
                                dateCreated={''}
                                duration={training.duration}
                                price={training.price}
                                category={training.category.label}
                                image={training.image}
                                categoryId={training.category.id}
                                organization={training.organization.name}
                                trainingId={training.id}
                                reviews={training.reviews}
                                organizationId={training.organization.id}
                            />
                        ))}

                    {term &&
                        dataFetch &&
                        dataFetch.trainings &&
                        dataFetch.trainings.filter((training) =>
                            training.label
                                .toLowerCase()
                                .includes(term.toLowerCase())
                        ).length === 0 && (
                            <p>Aucun résultat trouvé pour "{term}".</p>
                        )}

                    {isloading && <Loader active inline="centered" />}
                </div>
            </div>
        </>
    );
}
