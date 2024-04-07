import './style.scss';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/redux-hook/hook';

import { getTokenInformation } from '../../../store/actions/tokenActions';
import { getCategories } from '../../../store/actions/categoriesActions';
import { requestWithVariable, requestWithoutVariable } from '../../../utils';
import { queryAllCategories, queryCategories, queryNameMember, queryNameOrganization } from '../../../query';

import Navbar from './ModalProfile';
import NewModalConnexion from './ModalFormConnexion/newModal';
import SearchBar from './SearchBar';

import OtalentLogo from '/src/assets/otalent.svg';

export default function Header() {
    const dispatch = useAppDispatch();
    const [isConnected, setIsConnected] = useState(false);
    const userInfo = useAppSelector((state) => state.token.user)
    

    const getAllCategories = async () => {
        try {
            const response = await requestWithoutVariable(queryAllCategories);
            const fetchedCategories = response.categories || [];
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const dispatchTokenInformation = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenValue: { member: string; id: string; iat: number } =
                jwtDecode(token);
            dispatch(getTokenInformation(tokenValue));
            setIsConnected(true);
        }
    };

    
    

    useEffect(() => {
        dispatchTokenInformation();
    }, [dispatch]);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <div className="btm-nav lg:hidden">
                <button className="active">
                    <span className="material-symbols-rounded">home</span>
                </button>
                <button>
                    <span className="material-symbols-rounded">search</span>
                </button>
                <button>
                    <span className="material-symbols-rounded">
                        account_circle
                    </span>
                </button>
            </div>
            <header className="headerApp bg-primary-color flex items-center justify-evenly z-10 min-h-[10vh] p-2 sticky top-0">
                <NavLink to="/">
                    <div className="inline-flex items-center">
                        <img src={OtalentLogo} className="w-12" />
                        <h1 className="ml-5">O'Talent</h1>
                    </div>
                </NavLink>
                <SearchBar id={0} />

                {!isConnected && <NewModalConnexion />}

                {isConnected && <Navbar />}
            </header>
        </>
    );
}
