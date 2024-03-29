import "./style.scss"
import { jwtDecode } from "jwt-decode";

import ModalFormConnexion from "./ModalFormConnexion"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/redux-hook/hook"
import axios from "axios"
import { getTokenInformation } from "../../../store/actions/tokenActions";
import { getCategories } from "../../../store/actions/categoriesActions";



export default function Header () {

    const dispatch = useAppDispatch()

    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(false)

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
    
            // const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';
            const url = 'http://localhost:3000/graphql'
    
            const response = await axios.post(url, { query });
            const data = response.data.data;
            const fetchedCategories = data.categories || [];
   
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [isConnected, setIsConnected] = useState(false)

    const dispatchTokenInformation = () => {
        const token = localStorage.getItem('token')
        if(token) {
            const tokenValue = jwtDecode(token)
            dispatch(getTokenInformation(tokenValue))
            setIsConnected(true)
        }
    }

    
    
    useEffect (() => {
        dispatchTokenInformation()
    }, [dispatch])

    const user = useAppSelector((state) => state.token.user);
    
    
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
        <header className="headerApp">
            <NavLink to="/">
                <h1>O'Talent</h1>
            </NavLink>
         
            {!isConnected && <ModalFormConnexion />}

            {isConnected && <button onClick={handleLogout}>Se déconnecter</button>}
        </header>
    );
}