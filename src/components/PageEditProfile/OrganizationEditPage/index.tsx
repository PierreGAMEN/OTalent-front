import TrainingCreation from './Creation'
import FavoritesTrainings from './Favoris'
import HeaderOrganizationEditPage from './Header'
import './style.scss'

export default function OrganizationEditPage () {
    return (
        <div>
            <HeaderOrganizationEditPage data={undefined} />
            <TrainingCreation data={undefined}/>
            <FavoritesTrainings data={undefined}/>
        </div>
    )

}