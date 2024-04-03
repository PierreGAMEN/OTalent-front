import React, { useEffect, useState } from "react";
import { associateMemberTraining } from "../../../utils";
import "./style.scss";
import { useAppSelector } from "../../../store/redux-hook/hook";


export default function HeaderTrainingPage({ data }) {
    const [isAssociateToFavorite, setIsAssociateToFavoris] = useState(false);
    const [isMember, setIsMember] = useState(false);

    const user = useAppSelector(state => state.token.user);
    const idMember = user.id;

    
    useEffect(() => {
        setIsMember(user.member)
    }, [user.member])

    const addTrainingToFavorite = e => {
        const trainingId = e.target.id;
        associateMemberTraining(idMember, trainingId);
        setIsAssociateToFavoris(true);
    };


    let ArrayReview: [] = [];
    data.reviews.forEach((element) => {
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
                    <div className="container-star">
                        <span className="note">{averageRating} </span>
                        {[1, 2, 3, 4, 5].map(index => (
                            <i
                                key={index}
                                className={
                                    averageRating >= index
                                        ? 'star yellow icon'
                                        : 'star icon'
                                }
                            ></i>
                        ))}
                        <span className="number-avis">
                            ({data.reviews.length})
                        </span>
                    </div>
                ) : (
                    <div>
                        <p>Pas de commentaire</p>
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
