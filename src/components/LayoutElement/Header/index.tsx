
import "./style.scss"
import { JwtPayload, jwtDecode } from "jwt-decode";

import ModalFormConnexion from "./ModalFormConnexion"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/redux-hook/hook"
import axios from "axios"
import { getTokenInformation } from "../../../store/actions/tokenActions";
import { getCategories } from "../../../store/actions/categoriesActions";
import { requestWithoutVariable } from "../../../utils";
import { queryCategories } from "../../../query";
import { Icon } from "semantic-ui-react";
import Navbar from "./ModalProfile";



export default function Header () {

    const dispatch = useAppDispatch()
    const [isConnected, setIsConnected] = useState(false)

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
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    

    const dispatchTokenInformation = () => {
        const token = localStorage.getItem('token');
        if (token) {

            const tokenValue: {member: string, id: string, iat: number} = jwtDecode(token);
            dispatch(getTokenInformation(tokenValue));
            setIsConnected(true);
        }
    }
    
    //Récupération des informations contenu dans le token a chaque dispatch
    useEffect (() => {
        dispatchTokenInformation()
    }, [dispatch])


    // Récupération des catégories
    useEffect(() => {
        fetchCategories();
    }, []);



    
    // Gestionnaire de déconnexion
    const handleLogout = () => {
        localStorage.clear();
        setIsConnected(false)
        location.reload();
    };

    return (
        <>
        <header className="headerApp">
            <NavLink to="/">
                <h1>O'Talent</h1>
            </NavLink>
         
            {!isConnected && <ModalFormConnexion />}

            {isConnected && <button onClick={handleLogout}>Se déconnecter</button>}
            
        </header>
        <Navbar />
        </>
    );
}
