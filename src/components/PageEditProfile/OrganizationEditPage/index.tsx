import { useEffect, useState } from 'react'
import TrainingCreation from './Creation'
import FavoritesTrainings from './Favoris'
import HeaderOrganizationEditPage from './Header'
import './style.scss'
import { requestWithVariable } from '../../../utils'
import { useAppSelector } from '../../../store/redux-hook/hook'

export default function OrganizationEditPage () {

    const [isLoading, setIsLoading] = useState(false)
    const [isOrganization, setIsOrganization] = useState(false)

    const user = useAppSelector((state) => state.token.user);
    const IdOrganization = user.id 

        const getOrganizationData = () => {
            setIsLoading(true)
            try {

                requestWithVariable()

            } catch(errors) {
                console.log(errors)
            }
        }

        const checkIsOrganization = () => {
             if(user.id && user.member === false) {
                setIsOrganization(true)
             } else {
                window.location.href="/"
             }
        }

        useEffect(() => {
            checkIsOrganization();
        
            if (isOrganization) {
                getOrganizationData();
            }
        }, []);

    return (
        <div>
            <HeaderOrganizationEditPage data={undefined} />
            <TrainingCreation data={undefined}/>
            <FavoritesTrainings data={undefined}/>
        </div>
    )

}