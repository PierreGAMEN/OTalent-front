import { useParams } from "react-router";
import ContentTrainingPage from "./Content";
import HeaderTrainingPage from "./Header";
import ReviewTrainingPage from "./Review";
import { fetchData } from "../../utils";
import { useEffect, useState } from "react";
import { queryOneTraining } from "../../query";
import { Loader } from "semantic-ui-react";


interface TrainingData {
    
}

interface TrainingPageProps {
   
}

const TrainingPage: React.FC<TrainingPageProps> = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [dataFetch, setDataFetch] = useState<TrainingData[]>([]);
    const params = useParams<{ id: string }>();
    
    const id  = parseInt(params.id)


    useEffect(() => {

        fetchData(queryOneTraining, id, "trainingId", setDataFetch, setLoader);
    }, [id]); 

    return (
        <>
            {loader && <Loader />}
            {dataFetch.training && (
                <>
                    <HeaderTrainingPage data={dataFetch.training} />
                    <ContentTrainingPage data={dataFetch.training} />
                    <ReviewTrainingPage data={dataFetch.training} />
                </>
            )}
        </>
    );
};

export default TrainingPage;
