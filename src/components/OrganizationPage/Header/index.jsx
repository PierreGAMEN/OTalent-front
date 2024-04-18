import React from 'react';

const HeaderOrganizationProfilPage = ({ data }) => {
    return (
        <header
            className="flex lg:h-screen flex-row text-white items-center justify-center lg:justify-start gap-3 p-10 bg-no-repeat lg:bg-cover bg-center"
            style={{
                backgroundImage: `url(https://res.cloudinary.com/${
                    import.meta.env.VITE_CDNY_CLOUDNAME
                }/image/upload/c_scale,w_1920,h_1080/v1/otalent/${data.image})`,
            }}>
            <div className="flex flex-col max-w-screen-sm justify-between gap-5 bg-transparent/50 backdrop-blur-md rounded-2xl p-2 md:p-5 border-4 border-white">
                <h4 className='text-2xl'>{data.name}</h4>
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
