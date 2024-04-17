import React from 'react';


/**
 * FeatureCard component
 * @param {FeatureCardProps} props - Properties passed to the component
 */
const FeatureCard = ({
    title,
    description,
    image,
}) => {
    return (
        <section className="p-5 flex flex-col items-center justify-evenly text-center gap-5 rounded-2xl shadow-2xl bg-primary-color text-white shadow-teal-800">
            <div alt={title} className="w-48">{image}</div>
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
