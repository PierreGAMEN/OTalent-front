import './style.scss';
import { jwtDecode } from 'jwt-decode';

import ModalFormConnexion from './ModalFormConnexion';
import ImageUpload from './Upload';
import { NavLink, useLocation } from 'react-router-dom';
import { fetchData } from '../../../utils';
import { useEffect, useState } from 'react';
import { queryAllTrainingCard } from '../../../query';
import { useAppDispatch, useAppSelector } from '../../../store/redux-hook/hook';
import { getCategories } from '../../../store/actions/categoriesActions';
import axios from 'axios';
import { getTokenInformation } from '../../../store/actions/tokenActions';

export default function Header() {
    const dispatch = useAppDispatch();

    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const query = `
                query Categories {
                    categories {
                        id
                        label
                    }
                }
            `;

            const url = import.meta.env.VITE_GRAPHQL_API;

            const response = await axios.post(url, { query });
            const data = response.data.data;
            const fetchedCategories = data.categories || [];

            setCategories(fetchedCategories);

            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const dispatchTokenInformation = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenValue = jwtDecode(token);
            dispatch(getTokenInformation(tokenValue));
        }
    };

    useEffect(() => {
        dispatchTokenInformation();
    }, [dispatch]);

    const user = useAppSelector(state => state.token.user);
    console.log(user);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <header className="headerApp">
            <NavLink to={'/'}>
                <h1>O'Talent</h1>
            </NavLink>
            <ModalFormConnexion />
        </header>
    );
}
