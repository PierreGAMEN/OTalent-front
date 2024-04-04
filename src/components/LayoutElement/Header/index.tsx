
import "./style.scss"
import { JwtPayload, jwtDecode } from "jwt-decode";

import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/redux-hook/hook"

import { getTokenInformation } from "../../../store/actions/tokenActions";
import { getCategories } from "../../../store/actions/categoriesActions";
import { requestWithoutVariable } from "../../../utils";
import { queryAllCategories, queryCategories } from "../../../query";

import Navbar from "./ModalProfile";
import NewModalConnexion from "./ModalFormConnexion/newModal";
import SearchBar from "./SearchBar";



export default function Header () {

    const dispatch = useAppDispatch()
    const [isConnected, setIsConnected] = useState(false)

    const getAllCategories = async () => {
    try {
       const response = await requestWithoutVariable(queryAllCategories)
       const fetchedCategories = response.categories || [];
       dispatch(getCategories(fetchedCategories));
    } catch (error) {
        console.error('Error:', error);
    }
}

    const dispatchTokenInformation = () => {
        const token = localStorage.getItem('token');
        if (token) {

            const tokenValue: {member: string, id: string, iat: number} = jwtDecode(token);
            dispatch(getTokenInformation(tokenValue));
            setIsConnected(true);
        }
    }
    
    useEffect (() => {
        dispatchTokenInformation()
    }, [dispatch])


    useEffect(() => {
        getAllCategories();
    }, []);


    return (
        <>
        <header className="headerApp">
            <NavLink to="/">
                <h1>O'Talent</h1>
            </NavLink>
            <SearchBar id={0} />
         
            {!isConnected && <NewModalConnexion />}

            {isConnected && <Navbar />}
        </header>
        
        </>
    );
}
