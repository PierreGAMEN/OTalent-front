import React from 'react';
import './style.scss';

interface FeatureCardProps {
    title: string;
    description: string;
    image: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    image,
}) => {
    return (
        <section className="p-5 flex flex-col gap-5 rounded-2xl shadow-teal-800 shadow-2xl items-center justify-evenly text-center bg-primary-color text-white ">
            <img src={image} className="w-48" />
            <h4>{title}</h4>
            <p>
                {description.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        <br />
                    </span>
                ))}
            </p>
        </section>
    );
};

export default FeatureCard;
