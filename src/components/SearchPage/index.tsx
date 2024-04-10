import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { queryAllTrainingCard, queryTrainingFromCategory } from '../../query';
import { Loader } from 'semantic-ui-react';
import TrainingCard from '../HomePage/TrainingCard';
import './style.scss';
import { fetchData } from '../../utils';

export default function SearchPage() {
    const [dataFetch, setDataFetch] = useState([]);
    const [isloading, setIsloading] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categorie = params.get('category');
    const term = params.get('term');
    const id = params.get('id');
    useEffect(() => {
        if (term) {
            fetchData(
                queryAllTrainingCard,
                null,
                null,
                setDataFetch,
                setIsloading
            );
        } else if (categorie && !term) {
            fetchData(
                queryTrainingFromCategory,
                id,
                'categoryId',
                setDataFetch,
                setIsloading
            );
        }
    }, [categorie, term, id]);

    return (
        <>
            <div className="container-search">
                {categorie && term && (
                    <h4 className="mb-5">
                        Résultats de la recherche "{term}" dans la catégorie "
                        {categorie}"
                    </h4>
                )}
                {categorie && !term && (
                    <h4 className="mb-5">
                        Résultats de la recherche "{categorie}"
                    </h4>
                )}
                {term && !categorie && (
                    <h4>Résultats de la recherche "{term}"</h4>
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
                            .filter(
                                training =>
                                    training.category.label === categorie
                            )
                            .filter(training => training.label.includes(term))
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
                            .filter(training => training.label.includes(term))
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
                        dataFetch &&
                        dataFetch.trainings &&
                        dataFetch.trainings.filter(training =>
                            training.label.includes(term)
                        ).length === 0 && (
                            <p>Aucun résultat trouvé pour "{term}".</p>
                        )}

                    {isloading && <Loader active inline="centered" />}
                </div>
            </div>
        </>
    );
}
