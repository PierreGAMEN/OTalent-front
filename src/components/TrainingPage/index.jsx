import { useParams } from 'react-router';
import ContentTrainingPage from './Content';
import HeaderTrainingPage from './Header';
import ReviewTrainingPage from './Review';
import { requestWithVariable } from '../../utils';
import { useEffect, useState } from 'react';
import { queryOneTraining } from '../../query';
import React from 'react';

const TrainingPage = () => {
    const [loader, setLoader] = useState(false);
    const [dataFetch, setDataFetch] = useState([]);
    const params = useParams();

    const id = params.id;

    const getTraining = async () => {
        const variables = {
            trainingId: id,
        };
        setLoader(false);
        const response = await requestWithVariable(queryOneTraining, variables);
        setLoader(true);
        setDataFetch(response);
        return response;
    };

    useEffect(() => {
        getTraining();
    }, [id]);

    return (
        <>
            {dataFetch.data && (
                <>
                    <HeaderTrainingPage data={dataFetch.data.training} />
                    <ContentTrainingPage data={dataFetch.data.training} />
                    <ReviewTrainingPage data={dataFetch.data.training} />
                </>
            )}
        </>
    );
};

export default TrainingPage;