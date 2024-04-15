import { Link } from 'react-router-dom';
import React from 'react';

/**
 * TrainingCard component
 * @param {TrainingCardProps} props - Properties passed to the component
 */
export default function TrainingCard({
    organizationId,
    trainingId,
    label,
    duration,
    price,
    organization,
    category,
    image,
    categoryId,
    reviews,
}) {
    const ArrayReview = [];

    // If reviews exist, push each rating to ArrayReview
    if (reviews) {
        reviews.forEach((element) => {
            if (element.rating !== undefined) {
                ArrayReview.push(element.rating);
            }
        });
    }

    // Calculate the average rating
    const averageRating = parseInt(
        (
            ArrayReview.reduce((acc, curr) => acc + curr, 0) / reviews.length
        ).toFixed(1)
    );

    return (
        <div className="flex flex-col border-4 border-primary-color rounded-2xl">
            <div className="flex flex-col w-[300px] h-[550px]">
                <Link
                    to={`/training/${trainingId}`}
                    aria-label="Lien vers la formation"
                >
                    <img
                        src={`https://res.cloudinary.com/${
                            import.meta.env.VITE_CDNY_CLOUDNAME
                        }/image/upload/t_trainingcard/v1/otalent/${image}`}
                        alt="Image de la formation"
                        className="w-[350px] h-[200px] rounded-t-xl"
                    />
                </Link>
                <div className="flex flex-col p-2 items-stretch h-full justify-between">
                    <Link
                        to={`/training/${trainingId}`}
                        aria-label="Lien vers la formation"
                    >
                        <h5>{label}</h5>
                    </Link>
                    <div className="flex flex-col gap-3 h-full justify-end">
                        <Link
                            to={`/organization/${organizationId}`}
                            className="flex gap-2 items-center"
                            aria-label="Lien vers l'organisation"
                        >
                            <span className="material-symbols-rounded">
                                school
                            </span>
                            {organization}
                        </Link>
                        <Link
                            to={`/search/${category}&&${categoryId}`}
                            className="flex gap-2 items-center"
                            aria-label="Lien vers la catégorie"
                        >
                            <span className="material-symbols-rounded">
                                sell
                            </span>
                            {category}
                        </Link>
                        <p className="flex gap-2 items-center">
                            <span className="material-symbols-rounded">
                                schedule
                            </span>
                            {duration} heures
                        </p>
                        <div>
                            {!isNaN(averageRating) ? (
                                <div className="rating rating-md flex gap-2 items-center">
                                    <h5 className="ml-1 mr-1">
                                        {averageRating}/5
                                    </h5>
                                    {[...Array(5)].map((_, i) => (
                                        <input
                                            key={i}
                                            className={
                                                averageRating >= i + 1
                                                    ? 'mask mask-star-2 bg-orange-400 cursor-default'
                                                    : "mask mask-star-2 bg-orange-400' checked bg-gray-300 cursor-default"
                                            }
                                            disabled
                                        ></input>
                                    ))}
                                    <span className="m-2">
                                        ({reviews.length})
                                    </span>
                                </div>
                            ) : (
                                <p>Il n'y pas encore d'avis.</p>
                            )}
                        </div>
                        <h4 className="flex gap-2 items-center justify-center">
                            <span className="material-symbols-rounded text-4xl">
                                payments
                            </span>
                            {price} €
                        </h4>
                    </div>
                    <Link
                        to={`/training/${trainingId}`}
                        className="button filled"
                        aria-label="Voir la formation"
                    >
                        Voir la formation
                    </Link>
                </div>
            </div>
        </div>
    );
}
