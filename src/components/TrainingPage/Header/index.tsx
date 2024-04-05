import React, { useEffect, useState } from 'react';
import { associateMemberTraining } from '../../../utils';
import './style.scss';
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
        <header className="header-trainingpage">
            <div className="header-trainingpage-containerImage">
                <img
                    className="header-trainingpage-containerImage-image"
                    src={`https://res.cloudinary.com/${
                        import.meta.env.VITE_CDNY_CLOUDNAME
                    }/image/upload/c_scale,w_780,h_520/v1/otalent/${
                        data.image
                    }`}
                    alt="Training"
                />
            </div>
            <div className="header-trainingpage-containerText">
                <h1 className="header-trainingpage-containerText-title">
                    {data.label}
                </h1>
                {data.reviews.length > 0 ? (
                    <div className="rating rating-md flex items-center">
                        <h5 className="ml-1">{averageRating}</h5>
                        {[...Array(5)].map((_, i) => (
                            <input
                                key={i}
                                className={
                                    averageRating >= i + 1
                                        ? 'mask mask-star-2 bg-orange-400 cursor-default'
                                        : "mask mask-star-2 bg-orange-400' checked cursor-default"
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
                <p className="header-trainingpage-containerText-p">
                    {data.excerpt}
                </p>
                <p className="header-trainingpage-containerText-p">
                    Prix de la formation : <strong>{data.price} €</strong>
                </p>
                {isMember && (
                    <button
                        onClick={e => addTrainingToFavorite(e)}
                        className="header-trainingpage-containerText-button"
                        id={data.id}
                    >
                        Ajouter à mes favoris
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
