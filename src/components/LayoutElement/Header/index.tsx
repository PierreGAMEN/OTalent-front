import './style.scss';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/redux-hook/hook';

import { getTokenInformation } from '../../../store/actions/tokenActions';
import { getCategories } from '../../../store/actions/categoriesActions';
import { requestWithoutVariable } from '../../../utils';
import { queryAllCategories } from '../../../query';

import Navbar from './ModalProfile';
import NewModalConnexion from './ModalFormConnexion/newModal';
import SearchBar from './SearchBar';

import OtalentLogo from '/src/assets/otalent.svg';

export default function Header() {
    const dispatch = useAppDispatch();
    const [isConnected, setIsConnected] = useState(false);
    const userInfo = useAppSelector(state => state.token.user);

    const getAllCategories = async () => {
        try {
            const response = await requestWithoutVariable(queryAllCategories);
            const fetchedCategories = response.data.categories || [];
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
            {/*  <div className="btm-nav lg:hidden">
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
            </div> */}
            <header className="headerApp bg-primary-color flex items-center justify-evenly z-10 min-h-[10vh] p-2 sticky top-0">
                <NavLink to="/">
                    <div className="inline-flex items-center text-white">
                        <svg
                            width="40"
                            viewBox="0 0 23 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect transform="translate(2 1)" fill="none" />
                            <path
                                d="M11.3203 28C17.1193 28 21.8203 21.9558 21.8203 14.5C21.8203 7.04416 17.1193 1 11.3203 1C6.18569 1 1.91187 5.73858 1 12H5L8 5L11 12H18L12.5 17.5L14.5 24L8 20L3.78448 23.9008C5.69272 26.429 8.36382 28 11.3203 28Z"
                                stroke="currentColor"
                                stroke-width="2.0"
                            />
                        </svg>

                        <h1>O'Talent</h1>
                    </div>
                </NavLink>
                <SearchBar id={0} />

                {!isConnected && <NewModalConnexion />}

                {isConnected && <Navbar />}
            </header>
        </>
    );
}
