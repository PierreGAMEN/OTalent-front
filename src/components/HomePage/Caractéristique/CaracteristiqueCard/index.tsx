import React from 'react';
import './style.scss'

interface CaracteristiqueCardProps {
    title: string;
    description: string;
    image: string
}

const CaracteristiqueCard: React.FC<CaracteristiqueCardProps> = ({ title, description }) => {
    return (
        <section className='caracteristique-card'>
            <h1>{title}</h1>
            <p>{description}</p>
        </section>
    );
}

export default CaracteristiqueCard;
