import TrainingDataI from "../../../@Types/training"
import './style.scss'

export default function ReviewTrainingPage ({ data }: { data: TrainingDataI }) {
    return (<section className="reviews-section">
        <h2 className="reviews-section-title">Ce qu'en pense la communauté</h2>
        <button className="reviews-section-button">Je donne mon avis</button>
        {(data.reviews.length > 0) && <>
        {data.reviews.map((review, index) => (
            <div className={`review ${index === 0 ? 'first-review' : ''}`} key={review.id}>
                <div className="review-containerImage">
                    {review.member.avatar ? <img className="review-containerImage-image" src={review.member.avatar} alt="" /> 
                    : <div className="review-containerImage-image">{review.member.firstname.charAt(0)}</div>}
                    
                </div>
                <div className="review-containerText">
                <span>{review.rating} </span>
                <i className={review.rating >= 1 ? "star yellow icon" : "star icon"}></i>
                            <i className={review.rating >= 2 ? "star yellow icon" : "star icon"}></i>
                            <i className={review.rating >= 3 ? "star yellow icon" : "star icon"}></i>
                            <i className={review.rating >= 4 ? "star yellow icon" : "star icon"}></i>
                            <i className={review.rating >= 5 ? "star yellow icon" : "star icon"}></i>
                    
                    <p>{review.member.firstname} {review.member.lastname}</p>
                    <p>{review.comment ? review.comment : "Pas de commentaire disponible sur cet avis"}</p>
                </div>
            </div>
        ))}
        </>}
        {!data.reviews.length && <p>Il n'y a pas encore de commentaire sur cette formation</p>}

    </section>)
} 