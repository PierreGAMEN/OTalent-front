import { useEffect, useState } from 'react'
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
                    organizationId : user.id
                }

                const response = await requestWithVariable(queryOrganizationInformation, variables)
                setDataOrganization(response.data.organization)
      

            } catch(errors) {
                console.log(errors)
            }  finally {
                setIsLoading(false);
            }
        }

        const checkIsOrganization = () => {
            
             if(user.id !== null && user.member === false) {
                setIsOrganization(true)
             } else {
                window.location.href="/"
             }
        }

        useEffect(() => {
            if(user.id !== null){
            checkIsOrganization();}
            if (isOrganization) {
                getOrganizationData();
            }
        }, [user.id, isOrganization]);

    return (
        <div>
            <HeaderOrganizationEditPage data={dataOrganization} />
            <OrganizationTrainings data={dataOrganization}/>
        </div>
    )

}