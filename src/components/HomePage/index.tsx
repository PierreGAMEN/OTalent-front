import HeroSearchBar from "./HeroSearchBar";
import TrainingList from "./TrainingList";
import data from '../../data/data'; // Assurez-vous de spécifier le chemin correct vers vos données

export default function HomePage () {
    return (
        <main>
            <HeroSearchBar />
            <TrainingList data={data} />
        </main>
    );
}
