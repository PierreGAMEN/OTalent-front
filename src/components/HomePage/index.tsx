import HeroSearchBar from "./HeroSearchBar";
import TrainingList from "./TrainingList";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils";
import { queryAllTrainingCard } from "../../query";
import { Loader } from "semantic-ui-react";

export default function HomePage () {

    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(false)

    useEffect( () => {
        fetchData(queryAllTrainingCard, null, setData, setIsloading)
    }, [])
    
    return (
        <main>
            <HeroSearchBar />
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
