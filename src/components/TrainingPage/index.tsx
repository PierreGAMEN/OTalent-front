import { useParams } from "react-router";
import ContentTrainingPage from "./Content";
import HeaderTrainingPage from "./Header";
import ReviewTrainingPage from "./Review";
import { fetchData } from "../../utils";
import { useEffect, useState } from "react";
import { queryOneTraining } from "../../query";
import { Loader } from "semantic-ui-react";
import TrainingDataI from "../../@Types/training";


const TrainingPage = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [dataFetch, setDataFetch] = useState<TrainingDataI[]>([]);
    const params = useParams<{ id: string }>();
    
    const id: number = params.id ? parseInt(params.id) : 0


    useEffect(() => {

        fetchData(queryOneTraining, id, "trainingId", setDataFetch, setLoader);
    }, [id]); 

    return (
        <>
            {loader && <Loader />}
            {dataFetch.training  && (
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
