import './style.scss'

interface TrainingCardProps {
  title: string;
  dateCreated: string;
  duration: string;
  school?: string;
  category: string; 
}



export default function TrainingCard({ title, duration, school, category }: TrainingCardProps) {
    return (
        <div className="card">
            <div className="image">
                <img src="https://picsum.photos/200" alt="Training" />
            </div>
            <div className="content">
                <a href={`/training/${title}`} className="header">{title}</a>
                
               
                    <div className="school school-link extra content">
                        <i className="school university icon"></i> École :
                        <a href={`/organization/${school}`} className="right floated"> {school}</a>
                    </div>

                    <div className="school school-link extra content">
                        <i className="folder icon"></i> Catégorie :
                        <a href={`/search/${category}`} className="right floated"> {category}</a>
                    </div>
                    
                    <div className="school extra content">
                        <i className="calendar alternate icon"></i> Durée :
                        <span className="right floated"> {duration}</span>
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

