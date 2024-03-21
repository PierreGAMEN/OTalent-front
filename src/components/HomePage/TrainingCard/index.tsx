import './style.scss'

interface TrainingCardProps {
    label: string;
  dateCreated: string;
  duration: string;
  organization?: string;
  category: string; 
  image: string;
  categoryId: number;
}



export default function TrainingCard({ label, duration, organization, category, image, categoryId }: TrainingCardProps) {
    return (
        <div className="card">
            <div className="image">
                <img src={image} alt="Training" />
            </div>
            <div className="content">
                <a href={`/training/${label}`} className="header">{label}</a>
                
               
                    <div className="school school-link extra content">
                        <i className="school university icon"></i> École :
                        <a href={`/organization/${organization}`} className="right floated"> {organization}</a>
                    </div>

                    <div className="school school-link extra content">
                        <i className="folder icon"></i> Catégorie :
                        <a href={`/search/${category}&&${categoryId}`} className="right floated"> {category}</a>
                    </div>
                    
                    <div className="school extra content">
                        <i className="calendar alternate icon"></i> Durée :
                        <span className="right floated"> {duration} heures</span>
                    </div>
                    
                 
                        <div className='container-star'>
                            <span className='note'>3,3</span>
                            <i className="star yellow icon"></i>
                            <i className="star yellow icon"></i>
                            <i className="star yellow icon"></i>
                            <i className="star icon"></i>
                            <i className="star icon"></i>
                            <span className='number-avis'>(32)</span>
                        </div>
    
            </div>
        </div>
    );
}

// Je souhaite afficher mes étoile. POur cela je recois un nombre.
// if j'ai un nombre avec je passe le className à star yellow icon
// if not je passe a star icon

