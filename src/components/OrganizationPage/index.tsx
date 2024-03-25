import { useParams } from "react-router";
import { fetchData } from "../../utils";
import { useState, useEffect } from "react";
import ContentOrganizationProfilPage from "./Content";
import HeaderOrganizationProfilPage from "./Header";
import { queryOneOrganization } from "../../query";
import { Loader } from "semantic-ui-react";

export default function OrganizationPage () {

    interface OrganizationData {
    
    }

    const [loader, setLoader] = useState(false)
    const [dataFetch, setDataFetch] = useState<OrganizationData[]>([]);
    const params = useParams<{ id: string }>();
    
    const id  = parseInt(params.id)


    useEffect(() => {

        fetchData(queryOneOrganization, id, "organizationId", setDataFetch, setLoader);
    }, [id]); 

    return (
        <>
            {loader && <Loader />}
            {dataFetch.organization && (
                <>
                    <HeaderOrganizationProfilPage data={dataFetch.organization} />
                    <ContentOrganizationProfilPage data={dataFetch.organization} />
                </>
            )}
        </>
    );
}
