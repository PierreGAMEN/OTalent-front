import "./style.scss"
export default function HeaderTrainingPage ({data}) {


    let ArrayReview = []
    data.reviews.forEach(element => {
        ArrayReview.push(element.rating)
    });

    const averageRating = (ArrayReview.reduce((acc, curr) => acc + curr, 0))/data.reviews.length


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
            <button className="header-trainingpage-containerText-button" >Ajouter à mes favoris</button>
        </div>

    </header>)
}