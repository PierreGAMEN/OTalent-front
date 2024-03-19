import './style.scss'

interface TrainingCardProps {
  title: string;
  dateCreated: string;
  duration: string;
  school?: string;
  category: string; 
}
export default function TrainingCard({ title, dateCreated, duration, school, category }: TrainingCardProps) {
    return (
        <div className="card">
            <div className="image">
                <img src="https://picsum.photos/200" alt="Training" />
            </div>
            <div className="content">
                <a className="header">{title}</a>
                
                {school && (
                    <div className="school extra content">
                        <i className="university icon"></i> École :
                        <span className="right floated"> {school}</span>
                    </div>
                    
                )}
                    <div className="school extra content">
                        <i className="calendar alternate icon"></i> Durée :
                        <span className="right floated"> {duration}</span>
                    </div>
                    <div className="school extra content">
                        <i className="folder icon"></i> Catégorie :
                        <span className="right floated"> {category}</span>
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
