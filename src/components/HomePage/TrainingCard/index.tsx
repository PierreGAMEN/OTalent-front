import './style.scss'

interface TrainingCardProps {
  title: string;
  dateCreated: string;
  description: string;
  school?: string; 
}
export default function TrainingCard({ title, dateCreated, description, school }: TrainingCardProps) {
    return (
        <div className="card">
            <div className="image">
                <img src="https://picsum.photos/200" alt="Training" />
            </div>
            <div className="content">
                <a className="header">{title}</a>
                <div className="description">
                    {description}
                </div>
                {school && (
                    <div className="extra content">
                        <i className="university icon"></i> École :
                        <span className="right floated"> {school}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
