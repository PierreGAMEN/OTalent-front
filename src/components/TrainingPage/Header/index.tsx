import { useState } from "react";
import { associateMemberTraining } from "../../../utils";
import "./style.scss"

// TODO : Gérer l'affichage ajouter au favoris si la l'utilisateur a déjà enregistré (afin d'éviter une erreur) (fetch userID)
// TODO : Gérer la fonction d'ajout au favoris. Si utilisateur connecté alors je peux ajouter, si non ouvrir la modal de connexion
// TODO : Si administration est connecté retirer le bouton Ajouter au favoris

export default function HeaderTrainingPage ({data}) {

    const [isAssociateToFavorite, setIsAssociateToFavoris] = useState(false)

            const addTrainingToFavorite = (e) => {
                const storedItemJSON = localStorage.getItem('itemKey');
                if (storedItemJSON) {
                const storedItem = JSON.parse(storedItemJSON);
                const idMember = storedItem.id
                const trainingId = e.target.id
                associateMemberTraining(idMember, trainingId)
                setIsAssociateToFavoris(true)
            }
        }

        const idMember = JSON.parse(localStorage.getItem('itemKey')).id;



    let ArrayReview = []
    data.reviews.forEach(element => {
        ArrayReview.push(element.rating)
    });

    const averageRating = parseInt(((ArrayReview.reduce((acc, curr) => acc + curr, 0))/data.reviews.length).toFixed(1))


    return (<header className="header-trainingpage">

        <div className="header-trainingpage-containerImage">
            <img className="header-trainingpage-containerImage-image" src={data.image} alt="" />
            
        </div>

        <div className="header-trainingpage-containerText">
            
            <h1 className="header-trainingpage-containerText-title">{data.label}</h1>
            {data.reviews.length > 0 ? <div className='container-star'>
                            <span className='note'>{averageRating} </span>
                            <i className={averageRating >= 1 ? "star yellow icon" : "star icon"}></i>
                            <i className={averageRating >= 2 ? "star yellow icon" : "star icon"}></i>
                            <i className={averageRating >= 3 ? "star yellow icon" : "star icon"}></i>
                            <i className={averageRating >= 4 ? "star yellow icon" : "star icon"}></i>
                            <i className={averageRating >= 5 ? "star yellow icon" : "star icon"}></i>
                            <span className='number-avis'>({data.reviews.length})</span>
                        </div> : <div><p>Pas de commentaire</p></div>}
            <p className="header-trainingpage-containerText-p">{data.excerpt}</p>
            <p className="header-trainingpage-containerText-p">Prix de la formation : <strong>{data.price} €</strong></p>
            <button onClick={(e) => addTrainingToFavorite(e)} className="header-trainingpage-containerText-button" id={data.id}>Ajouter à mes favoris</button>
            {isAssociateToFavorite && <div>L'enregistrement de cette formation a bien été enregistré dans vos favoris. Vous pouvez gérer vos favoris <a href={`/edit/member/${idMember}`}>ici</a></div>}
        </div>

    </header>)
}