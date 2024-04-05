interface TrainingCardProps {
    label: string;
    dateCreated: string;
    duration: string;
    organization?: string;
    price: number;
    category: string;
    image: string;
    categoryId: number;
    trainingId: number;
    organizationId: number;
    reviews: [];
}

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
}: TrainingCardProps) {
    const ArrayReview: number[] = [];

    if (reviews) {
        reviews.forEach((element: { rating?: number }) => {
            if (element.rating !== undefined) {
                ArrayReview.push(element.rating);
            }
        });
    }

    const averageRating = parseInt(
        (
            ArrayReview.reduce((acc, curr) => acc + curr, 0) / reviews.length
        ).toFixed(1)
    );

    return (
        <div className="flex flex-col border-4 rounded-2xl border-primary-color">
            <div className="flex flex-col h-[550px] w-[300px]">
                <a href={`/training/${trainingId}`}>
                    <img
                        src={`https://res.cloudinary.com/${
                            import.meta.env.VITE_CDNY_CLOUDNAME
                        }/image/upload/t_trainingcard/v1/otalent/${image}`}
                        alt="Training"
                        className="rounded-t-xl w-[350px] h-[200px]"
                    />
                </a>
                <div className="flex flex-col p-2 h-full justify-between items-stretch ">
                    <a href={`/training/${trainingId}`}>
                        <h5>{label}</h5>
                    </a>
                    <div className="flex flex-col h-full justify-end gap-3">
                        <a
                            href={`/organization/${organizationId}`}
                            className="flex items-center gap-2"
                        >
                            <span className="material-symbols-rounded">
                                school
                            </span>
                            {organization}
                        </a>

                        <a
                            href={`/search/${category}&&${categoryId}`}
                            className="flex items-center gap-2"
                        >
                            <span className="material-symbols-rounded">
                                sell
                            </span>
                            {category}
                        </a>

                        <p className="flex items-center gap-2">
                            <span className="material-symbols-rounded">
                                schedule
                            </span>
                            {duration} heures
                        </p>
                        <div>
                            {!isNaN(averageRating) ? (
                                <div className="rating rating-md flex items-center">
                                    <h5 className="ml-1">{averageRating}</h5>
                                    {[...Array(5)].map((_, i) => (
                                        <input
                                            key={i}
                                            className={
                                                averageRating >= i + 1
                                                    ? 'mask mask-star-2 bg-orange-400'
                                                    : "mask mask-star-2 bg-orange-400' checked"
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
                        <h4 className="flex items-center justify-center gap-2">
                            <span className="material-symbols-rounded text-4xl">
                                payments
                            </span>
                            {price} €
                        </h4>
                    </div>
                    <a
                        href={`/training/${trainingId}`}
                        className="bg-primary-color text-white p-2 m-2 rounded-xl text-center hover:bg-transparent hover:text-primary-color border-primary-color border-2"
                    >
                        Voir la formation
                    </a>
                </div>
            </div>
        </div>
    );
}
