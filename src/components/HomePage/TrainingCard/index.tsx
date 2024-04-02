import './style.scss';

interface TrainingCardProps {
    label: string;
    dateCreated: string;
    duration: string;
    organization?: string;
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
        <div className="card">
            <div className="image">
                <img
                    src={`https://res.cloudinary.com/${
                        import.meta.env.VITE_CDNY_CLOUDNAME
                    }/image/upload/t_trainingcard/v1/otalent/${image}`}
                    alt="Training"
                />
            </div>
            <div className="content">
                <a href={`/training/${trainingId}`} className="header">
                    {label}
                </a>

                <div className="school school-link extra content">
                    <i className="school university icon"></i> École :
                    <a
                        href={`/organization/${organizationId}`}
                        className="right floated"
                    >
                        {' '}
                        {organization}
                    </a>
                </div>

                <div className="school school-link extra content">
                    <i className="folder icon"></i> Catégorie :
                    <a
                        href={`/search/${category}&&${categoryId}`}
                        className="right floated"
                    >
                        {' '}
                        {category}
                    </a>
                </div>

                <div className="school extra content">
                    <i className="calendar alternate icon"></i> Durée :
                    <span className="right floated"> {duration} heures</span>
                </div>

                {!isNaN(averageRating) ? (
                    <div className="container-star">
                        <span className="note">{averageRating}</span>
                        <i
                            className={
                                averageRating >= 1
                                    ? 'star yellow icon'
                                    : 'star icon'
                            }
                        ></i>
                        <i
                            className={
                                averageRating >= 2
                                    ? 'star yellow icon'
                                    : 'star icon'
                            }
                        ></i>
                        <i
                            className={
                                averageRating >= 3
                                    ? 'star yellow icon'
                                    : 'star icon'
                            }
                        ></i>
                        <i
                            className={
                                averageRating >= 4
                                    ? 'star yellow icon'
                                    : 'star icon'
                            }
                        ></i>
                        <i
                            className={
                                averageRating >= 5
                                    ? 'star yellow icon'
                                    : 'star icon'
                            }
                        ></i>
                        <span className="number-avis">({reviews.length})</span>
                    </div>
                ) : (
                    <p>Il n'y pas encore d'avis.</p>
                )}
            </div>
        </div>
    );
}
