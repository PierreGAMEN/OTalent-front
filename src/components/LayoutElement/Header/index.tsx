import { jwtDecode } from 'jwt-decode';

import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '../../../store/redux-hook/hook';

import { getTokenInformation } from '../../../store/actions/tokenActions';
import { getCategories } from '../../../store/actions/categoriesActions';
import { requestWithoutVariable } from '../../../utils';
import { queryAllCategories } from '../../../query';

import Navbar from './ModalProfile';
import ConnectionFormModal from './ConnectionFormModal/';
import SearchBar from './SearchBar';
import LogoTitle from '../../../assets/LogoTitle';
import Chat from './Chat';

export default function Header() {
    const dispatch = useAppDispatch();
    const [isConnected, setIsConnected] = useState(false);

    const getAllCategories = useCallback(async () => {
        try {
            const response = await requestWithoutVariable(queryAllCategories);
            const fetchedCategories = response.data.categories || [];
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    }, [dispatch]);

    const dispatchTokenInformation = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token && !isConnected) {
            const tokenValue: { member: string; id: string; iat: number } =
                jwtDecode(token);
            dispatch(getTokenInformation(tokenValue));
            setIsConnected(true);
        }
    }, [dispatch, isConnected]);

    useEffect(() => {
        dispatchTokenInformation();
    }, [dispatchTokenInformation]);

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    return (
        <>
            <header className="headerApp bg-primary-color flex items-center justify-evenly z-10 min-h-[10vh] p-2 sticky top-0">
                <Link
                    to="/"
                    aria-label="Accueil"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <LogoTitle />
                </Link>
                <Chat />
                <SearchBar />
                {!isConnected && <ConnectionFormModal />}
                {isConnected && <Navbar />}
            </header>
        </>
    );
}
