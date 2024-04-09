import React, { useEffect, useState } from 'react';
import { associateMemberTraining } from '../../../utils';
import { useAppSelector } from '../../../store/redux-hook/hook';

export default function HeaderTrainingPage({ data }) {
    const [isAssociateToFavorite, setIsAssociateToFavoris] = useState(false);
    const [isMember, setIsMember] = useState(false);

    const user = useAppSelector(state => state.token.user);
    const idMember = user.id;

    useEffect(() => {
        setIsMember(user.member);
    }, [user.member]);

    const addTrainingToFavorite = e => {
        const trainingId = e.target.id;
        associateMemberTraining(idMember, trainingId);
        setIsAssociateToFavoris(true);
    };

    const ArrayReview: [] = [];
    data.reviews.forEach(element => {
        ArrayReview.push(element.rating);
    });

    const averageRating =
        data.reviews.length > 0
            ? parseInt(
                  (
                      ArrayReview.reduce((acc, curr) => acc + curr, 0) /
                      data.reviews.length
                  ).toFixed(1)
              )
            : 0;

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
                <h4 className="">{data.label}</h4>
                {data.reviews.length > 0 ? (
                    <div className="rating rating-md flex items-center">
                        <h5 className="ml-1 mr-1">{averageRating}/5</h5>
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
                        <span className="m-2">({data.reviews.length})</span>
                    </div>
                ) : (
                    <div>
                        <p>Il n'y pas encore d'avis.</p>
                    </div>
                )}
                <h5 className="">{data.excerpt}</h5>
                <h4 className="flex items-center justify-center gap-2">
                    <span className="material-symbols-rounded text-4xl">
                        payments
                    </span>
                    {data.price} €
                </h4>
                {isMember && (
                    <button
                        onClick={e => addTrainingToFavorite(e)}
                        className="bg-primary-color text-white p-2 rounded-md hover:bg-transparent border-4 border-primary-color hover:text-primary-color"
                        id={data.id}
                    >
                        <h5 className="text-2xl flex flex-row justify-center gap-2 items-center">
                            Ajouter aux favoris
                            <span className="material-symbols-rounded text-4xl">
                                favorite
                            </span>
                        </h5>
                    </button>
                )}
                {isAssociateToFavorite && (
                    <div>
                        L'enregistrement de cette formation a bien été
                        enregistré dans vos favoris. Vous pouvez gérer vos
                        favoris <a href={`/edit/member`}>ici</a>
                    </div>
                )}
            </div>
        </header>
    );
}
