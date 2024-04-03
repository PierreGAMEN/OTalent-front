import React from 'react';
import OneorganizationI from "../../../@Types/oneOrganization";
import './style.scss'

interface HeaderOrganizationProfilPageProps {
    data: OneorganizationI;
}

const HeaderOrganizationProfilPage: React.FC<HeaderOrganizationProfilPageProps> = ({ data }) => {

    

    return (
        <header className='header-organizationPage'>
            <div className='header-organizationPage-containerImage'>
                <img className='header-organizationPage-containerImage-image' 
                src={`https://res.cloudinary.com/${
                    import.meta.env.VITE_CDNY_CLOUDNAME
                }/image/upload/c_scale,w_780,h_520/v1/otalent/${
                    data.image
                }`} 
                alt="" />
            </div>
            <div className='header-organizationPage-texte'>
                <h2>{data.name}</h2>
                <p>Adresse : {data.address}, {data.postal_code}, {data.city}</p>
                <p>Email : {data.email}</p>
                <p>Téléphone : {data.phone_number}</p>
                <p>Site internet : <a href={data.url_site}>{data.url_site}</a></p>
            </div>
        </header>
    );
};

export default HeaderOrganizationProfilPage;
