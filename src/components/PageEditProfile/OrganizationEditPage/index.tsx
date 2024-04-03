import { useEffect, useState } from 'react'
import TrainingCreation from './Creation'
import FavoritesTrainings from './Trainings'
import HeaderOrganizationEditPage from './Header'
import './style.scss'
import { requestWithVariable } from '../../../utils'
import { useAppSelector } from '../../../store/redux-hook/hook'
import { queryOrganizationInformation } from '../../../query'
import OrganizationTrainings from './Trainings'

export default function OrganizationEditPage () {

    const [isLoading, setIsLoading] = useState(false)
    const [isOrganization, setIsOrganization] = useState(false)
    const [dataOrganization, setDataOrganization] = useState([])

    const user = useAppSelector((state) => state.token.user);

        const getOrganizationData = async () => {
            setIsLoading(true)
            try {

                const variables = 
                {
                    organizationId : 2
                }

                const response = await requestWithVariable(queryOrganizationInformation, variables)
                setDataOrganization(response.organization)
      

            } catch(errors) {
                console.log(errors)
            }  finally {
                setIsLoading(false);
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
            if(user.id && !isOrganization) {
                checkIsOrganization();
            }
            
            if (isOrganization) {
                getOrganizationData();
            }
        }, [user.id, isOrganization]);

    return (
        <div>
            <HeaderOrganizationEditPage data={dataOrganization} />
            <TrainingCreation data={dataOrganization}/>
            <OrganizationTrainings data={dataOrganization}/>
        </div>
    )

}