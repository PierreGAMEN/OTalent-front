import { useParams } from "react-router";
import ContentTrainingPage from "./Content";
import HeaderTrainingPage from "./Header";
import ReviewTrainingPage from "./Review";
import { fetchData } from "../../utils";
import { useState } from "react";

export default function TrainingPage () {

    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])

    const params = useParams()
    console.log(params)

    // fetchData(null, params, setData, setLoader)

    return (<>
        <HeaderTrainingPage />
        <ContentTrainingPage />
        <ReviewTrainingPage />
    </>)
}