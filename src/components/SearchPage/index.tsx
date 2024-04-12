import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { queryAllTrainingCard, queryTrainingFromCategory, queryTrainingsByRegions } from '../../query';
import { Loader } from 'semantic-ui-react';
import TrainingCard from '../HomePage/TrainingCard';
import './style.scss';
import { fetchData, requestWithVariable } from '../../utils';

export default function SearchPage() {
    const [dataFetch, setDataFetch] = useState([]);
    const [isloading, setIsloading] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categorie = params.get('category');
    const term = params.get('term');
    const id = params.get('id');
    const area = params.get('area')
    console.log(area)
    console.log(term)

    const getTrainingFromAreaFirst = async () => {
        if(area) {
            const variables = {
                regionName: area
            }
            const response = await requestWithVariable(queryTrainingsByRegions, variables)
            setDataFetch(response)
        }
    }

    useEffect(() => {
        getTrainingFromAreaFirst()
        if (term && !area) {
            fetchData(
                queryAllTrainingCard,
                null,
                null,
                setDataFetch,
                setIsloading
            );
        } else if (categorie && !term && !area) {
            fetchData(
                queryTrainingFromCategory,
                id,
                'categoryId',
                setDataFetch,
                setIsloading
            );
        }
    }, [categorie, term, id, area]);

    return (
        <>
            <div className="container-search">
                {categorie && term && (
                    <h5 className="mb-5">
                        Résultats de la recherche "{term}" dans la catégorie "
                        {categorie}"
                    </h5>
                )}
                {categorie && !term && (
                    <h5 className="mb-5">
                        Résultats de la recherche "{categorie}"
                    </h5>
                )}
                {term && !categorie && (
                    <h5>Résultats de la recherche "{term}"</h5>
                )}

                <div className="container-search-card">
                    {categorie &&
                        !term &&
                        dataFetch &&
                        dataFetch.category &&
                        dataFetch.category.trainings &&
                        dataFetch.category.trainings.map(training => (
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
                                .filter(training =>
                                    training.category.label === categorie &&
                                    training.label.toLowerCase().includes(term.toLowerCase())
                                )
                                .map(training => (
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
                            .filter(training => training.label.toLowerCase().includes(term.toLowerCase()))
                            .map(training => (
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

                        {area && term && !categorie && dataFetch.data && dataFetch.data.trainingsByRegion
                        .filter(training => training.label.toLowerCase().includes(term.toLowerCase()))
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

                        {area && term && categorie && dataFetch.data && dataFetch.data.trainingsByRegion
                        .filter(training =>
                            training.category.label === categorie &&
                            training.label.toLowerCase().includes(term.toLowerCase())
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

                        {area && !term && categorie && dataFetch.data && dataFetch.data.trainingsByRegion
                        .filter(training =>
                            training.category.label === categorie)
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

                        {area && !term && !categorie && dataFetch.data && dataFetch.data.trainingsByRegion.map((training) => (
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
                        dataFetch.trainings.filter(training =>
                            training.label.toLowerCase().includes(term.toLowerCase())
                        ).length === 0 && (
                            <p>Aucun résultat trouvé pour "{term}".</p>
                        )}

                    {isloading && <Loader active inline="centered" />}
                </div>
            </div>
        </>
    );
}
