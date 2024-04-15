import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import ContentOrganizationProfilPage from './Content';
import HeaderOrganizationProfilPage from './Header';
import { queryOneOrganization } from '../../query';
import { Loader } from 'semantic-ui-react';
import { requestWithVariable } from '../../utils';

export default function OrganizationPage() {
    const [loader, setLoader] = useState(false);
    const [dataFetch, setDataFetch] = useState([]);
    const params = useParams();

    const id = parseInt(params.id);

    const getTOrganization = async () => {
        const variables = {
            organizationId: id,
        };
        setLoader(false);
        const response = await requestWithVariable(
            queryOneOrganization,
            variables
        );
        setLoader(true);
        setDataFetch(response);
        return response;
    };

    useEffect(() => {
        getTOrganization();
    }, [id]);

    return (
        <>
            {loader && <Loader />}
            {dataFetch.data && (
                <>
                    <HeaderOrganizationProfilPage
                        data={dataFetch.data.organization}
                    />
                    <ContentOrganizationProfilPage
                        data={dataFetch.data.organization}
                    />
                </>
            )}
        </>
    );
}
