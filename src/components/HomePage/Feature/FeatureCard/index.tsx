import React from 'react';

/**
 * Interface for FeatureCard properties
 */
interface FeatureCardProps {
    title: string;
    description: string;
    image: string;
}

/**
 * FeatureCard component
 * @param {FeatureCardProps} props - Properties passed to the component
 */
const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    image,
}) => {
    return (
        <section className="p-5 flex flex-col items-center justify-evenly text-center gap-5 rounded-2xl shadow-2xl bg-primary-color text-white shadow-teal-800">
            <img src={image} alt={title} className="w-48" />
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
