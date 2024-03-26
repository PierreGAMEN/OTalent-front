import { useEffect, useState } from 'react'
import { queryOneMember } from '../../../query'
import { fetchData } from '../../../utils'
import FavoritesEditProfilPageMember from './Favorites'
import HeaderEditProfilPageMember from './Header'
import ReviewsEditProfilPageMember from './Reviews'
import './style.scss'


export default function MemberEditPage () {

    const [dataFetch, setDataFetch] = useState([])
    const [isloading, setIsLoading] = useState(false)

        let id = 1

        useEffect(() => {
            fetchData(queryOneMember, id, "memberId", setDataFetch, setIsLoading)
        }, [])

        return (
            dataFetch.member && 
            <> 
                <HeaderEditProfilPageMember data={dataFetch.member} />
                <FavoritesEditProfilPageMember data={dataFetch.member} />
                <ReviewsEditProfilPageMember data={dataFetch.member} />
            </>
        );
}