import React from 'react';
import OneorganizationI from '../../../@Types/oneOrganization';

interface HeaderOrganizationProfilPageProps {
    data: OneorganizationI;
}

const HeaderOrganizationProfilPage: React.FC<
    HeaderOrganizationProfilPageProps
> = ({ data }) => {
    return (
        <header
            className="flex h-screen flex-row items-center justify-center lg:justify-start gap-3 p-10 bg-no-repeat bg-cover bg-center"
            style={{
                backgroundImage: `url(https://res.cloudinary.com/${
                    import.meta.env.VITE_CDNY_CLOUDNAME
                }/image/upload/c_scale,w_1920,h_1080,e_blur:400/v1/otalent/${
                    data.image
                })`,
            }}
        >
            <div className="flex flex-col min-w-96 max-w-screen-sm  justify-between gap-5 bg-primary-background rounded-2xl p-5 border-4 border-primary-color">
                <h4>{data.name}</h4>
                <p>
                    Adresse : {data.address}, {data.postal_code}, {data.city}
                </p>
                <p>
                    {' '}
                    Email :{' '}
                    <a href={`mailto:${data.email}`} className="underline">
                        {data.email}
                    </a>
                </p>
                <p>Téléphone : {data.phone_number}</p>
                <p>
                    Site internet :{' '}
                    <a href={data.url_site} className="underline">
                        {data.url_site}
                    </a>
                </p>
            </div>
        </header>
    );
};

export default HeaderOrganizationProfilPage;
