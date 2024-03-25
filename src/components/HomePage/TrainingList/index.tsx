import { Loader } from "semantic-ui-react";
import TrainingCard from "../TrainingCard";
import "./style.scss";

export default function TrainingList({ data, categoryChosen }) {
    return (
        <div className="container-trainingList">
            <h2>{categoryChosen}</h2>
            <div className="container-card">
            {data && data.trainings && data.trainings
            .filter(training => training.category.label === categoryChosen)
            .map((training) => (
            
        <TrainingCard 
            key={training.id}
            label={training.label} 
            dateCreated={""} 
            duration={training.duration} 
            category={training.category.label} 
            image={training.image}
            categoryId={training.category.id} 
            organization={training.organization.name}
            trainingId={training.id}
            organizationId={training.organization.id}
            reviews={training.reviews}
        />
        
    ))}
    </div>
        </div>
    );
}
