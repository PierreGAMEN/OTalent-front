import TrainingCard from "../TrainingCard";
import "./style.scss";
import data from '../../../data/data.ts'

export default function TrainingList() {


  return (
    <div className="container-trainingList">

{data.LabelTraining.map((label) => (
  <div className="container-section" key={label.label}>
    <h2>{label.label}</h2>
    <div className="container-card">
    {label.trainings.map((training, index) => (
      <TrainingCard 
      key={index} 
      title={training.title}
      description={training.description}
      school={training.school}
      dateCreated={'FictiveDate'} />
      
    ))}
    </div>
  </div>
))}
    
    </div>
  );
}
