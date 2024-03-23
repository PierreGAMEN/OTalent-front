import { useParams } from "react-router";
import { fetchData } from "../../utils";
import { useState, useEffect } from "react";
import ContentOrganizationProfilPage from "./Content";
import HeaderOrganizationProfilPage from "./Header";
import { queryOneOrganization } from "../../query";

export default function PageProfileOrganization () {

    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])

    const params = useParams()
    console.log(params)

    useEffect(() => {
        // Fetch data when component mounts or params change
        fetchData(queryOneOrganization, params, setData, setLoader);
    }, [params]); // Add params to dependency array to refetch data when params change

    return (
        <>
            <HeaderOrganizationProfilPage data={data}/>
            <ContentOrganizationProfilPage data={data}/>
        </>
    );
}
