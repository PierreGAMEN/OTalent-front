import { useEffect, useState } from 'react'
import { queryOneMember } from '../../../query'
import { fetchData } from '../../../utils'
import FavoritesEditProfilPageMember from './Favorites'
import HeaderEditProfilPageMember from './Header'
import ReviewsEditProfilPageMember from './Reviews'
import './style.scss'
import { useAppSelector } from '../../../store/redux-hook/hook'


export default function MemberEditPage () {

    const [dataFetch, setDataFetch] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [scriptFinished, setScriptFinished] = useState(false)

    const user = useAppSelector((state) => state.token.user);
    const idMember = user.id

        useEffect(() => {
            fetchData(queryOneMember, idMember, "memberId", setDataFetch, setIsLoading).then(() => setScriptFinished(true))
           
        }, [idMember])

        if (!dataFetch || !dataFetch.member) {
            return null; 
        }

        

        return (
            scriptFinished &&
            <> 
                <HeaderEditProfilPageMember data={dataFetch.member} memberId={idMember}/>
                <FavoritesEditProfilPageMember data={dataFetch.member} />
                <ReviewsEditProfilPageMember data={dataFetch.member}/>
            </>
        );
}