import TrainingCard from "../TrainingCard";
import "./style.scss";

export default function TrainingList({ data }) {
    return (
        <div className="container-trainingList">
            {data.LabelTraining.map((label) => (
                <div className="container-section" key={label.label}>
                    <h2>{label.label}</h2>
                    <div className="container-card">
                        {label.trainings.map((training, index) => (
                            <TrainingCard 
                                key={index} 
                                {...training}  
                                category={label.label} 
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
