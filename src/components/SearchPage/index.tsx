import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { queryAllTrainingCard, queryTrainingFromCategory } from "../../query";
import { Loader, Search } from "semantic-ui-react";
import TrainingCard from "../HomePage/TrainingCard";
import './style.scss'
import {fetchData} from '../../utils'
import SearchBar from "../LayoutElement/Header/SearchBar";

export default function SearchPage() {


    const [dataFetch, setDataFetch] = useState([])
    const [isloading, setIsloading] = useState(false)
    

    const params: string | undefined = useParams().arg1;
    const splittedValues = params.split('&');
    const categorie = splittedValues[0]
    const term = splittedValues[1]
    const id = parseInt(splittedValues[2])


    useEffect(() => {
        if(term) {
            fetchData(queryAllTrainingCard, null, null, setDataFetch, setIsloading )
        } else if (categorie && !term) {
            fetchData(queryTrainingFromCategory, id, "categoryId", setDataFetch, setIsloading)
          }
    }, [categorie, term, id])

    return (

        <>
        <SearchBar id={0} />
        <div className="container-search">
    {categorie && term && <h2>Voici toutes les formation incluant le mot "{term}" dans la catégorie "{categorie}"</h2>}
    {categorie && !term && <h2>Voici toutes les formations appartenant à la catégorie "{categorie}"</h2>}
    {term && !categorie && <h2>Voici toutes les formations incluant le mot "{term}"</h2>}

        <div className="container-search-card">
    {(categorie && !term) && dataFetch && dataFetch.category && dataFetch.category.trainings && dataFetch.category.trainings.map((training) => (
    <TrainingCard 
    key={training.id}
    label={training.label} 
    dateCreated={""} 
    duration={training.duration} 
    category={training.category.label} 
    image={training.image}
    categoryId={training.category.id} 
    organization ={training.organization.name}
    trainingId={training.id}
    reviews={training.reviews}
    organizationId={training.organization.id}
    />
))}

{(categorie && term) && dataFetch && dataFetch.trainings && dataFetch.trainings
    .filter(training => training.category.label === categorie)
    .filter(training => training.label.includes(term))
    .map((training) => (
        <TrainingCard 
            key={training.id}
            label={training.label} 
            dateCreated={""} 
            duration={training.duration} 
            category={training.category.label} 
            image={training.image}
            categoryId={training.category.id} 
            organization={training.organization.name}
            trainingId={training.id}
            reviews={training.reviews}
            organizationId={training.organization.id}
        />
    ))}

{(term && !categorie) && dataFetch && dataFetch.trainings && dataFetch.trainings
    .filter(training => training.label.includes(term))
    .map((training) => (
        <TrainingCard 
            key={training.id}
            label={training.label} 
            dateCreated={""} 
            duration={training.duration} 
            category={training.category.label} 
            image={training.image}
            categoryId={training.category.id} 
            organization={training.organization.name}
            trainingId={training.id}
            reviews={training.reviews}
            organizationId={training.organization.id}
        />
    ))}

{term && dataFetch && dataFetch.trainings && dataFetch.trainings
    .filter(training => training.label.includes(term))
    .length === 0 && (
        <p>Aucun résultat trouvé pour "{term}".</p>
)}

{isloading && <Loader active inline='centered' />}


</div>
</div>
</>
    )
    ;
}
