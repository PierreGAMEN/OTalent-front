import React, { useEffect, useState } from 'react';
import { queryOneMember } from '../../../query';
import { requestWithVariable } from '../../../utils';
import FavoritesEditProfilPageMember from './Favorites';
import HeaderEditProfilPageMember from './Header';
import './style.scss';
import { useAppSelector } from '../../../store/redux-hook/hook';

export default function MemberEditPage() {
    const [dataFetch, setDataFetch] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [scriptFinished, setscriptFinished] = useState(false);
    const [isMember, setIsMember] = useState(false);

    const user = useAppSelector((state) => state.token.user);
    const idMember = user.id;

    const getMemberInformation = async () => {
        const variables = {
            memberId: user.id,
        };
        setscriptFinished(false);
        const response = await requestWithVariable(queryOneMember, variables);
        setDataFetch(response.data);
        setscriptFinished(true);
    };

    const checkIsMember = () => {
        if (user.id !== null && user.member === true) {
            setIsMember(true);
        } else {
            window.location.href = '/';
        }
    };

    useEffect(() => {
        if (user.id) {
            checkIsMember();
        }
        if (isMember) {
            getMemberInformation();
        }
    }, [user.id, isMember]);

    return (
        scriptFinished && (
            <>
                <HeaderEditProfilPageMember
                    data={dataFetch.member}
                    memberId={idMember}
                />
                <FavoritesEditProfilPageMember data={dataFetch.member} />
            </>
        )
    );
}
