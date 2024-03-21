import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { queryAllTrainingCard, queryTrainingFromCategory } from "../../query";
import { Loader } from "semantic-ui-react";
import TrainingCard from "../HomePage/TrainingCard";
import './style.scss'

export default function SearchPage() {


    const [dataFetch, setDataFetch] = useState([])
    const [isloading, setIsloading] = useState(false)
    
    const fetchData = async (query: string, idCategorie = null) => {
        try {
            const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';
    
            const variables = idCategorie !== null ? { categoryId: idCategorie } : {};

            setIsloading(true)
            const response = await axios.post(url, {
                query,
                variables
            });
            const data = response.data.data;
            setDataFetch(data || []);
            setIsloading(false)
            console.log(data)
            
        } catch (error) {
            console.error('Error:', error);
            setIsloading(false)
        } 
    };
    

    const params: string | undefined = useParams().arg1;
    const splittedValues = params.split('&');
    const categorie = splittedValues[0]
    const term = splittedValues[1]
    const idCategorie = parseInt(splittedValues[2])

    useEffect(() => {
        if(term) {
            fetchData(queryAllTrainingCard)
        } else if (categorie && !term) {
            fetchData(queryTrainingFromCategory, idCategorie)
          }
    }, [categorie, term, idCategorie])

    return (
        <div>
    {categorie && term && <p>Voici toutes les formation incluant le mot "{term}" dans la catégorie "{categorie}"</p>}
    {categorie && !term && <p>Voici toutes les formations appartenant à la catégorie "{categorie}"</p>}
    {term && !categorie && <p>Voici toutes les formations incluant le mot "{term}"</p>}

        <div className="container-search">
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
    );
}
