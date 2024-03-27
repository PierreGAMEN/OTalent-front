import "./style.scss"


import ModalFormConnexion from "./ModalFormConnexion"
import { NavLink, useLocation } from "react-router-dom"
import { fetchData } from "../../../utils"
import { useEffect, useState } from "react"
import { queryAllTrainingCard } from "../../../query"
import { useAppDispatch } from "../../../store/redux-hook/hook"
import { getCategories } from "../../../store/actions/categoriesActions"
import axios from "axios"

export default function Header () {

    const dispatch = useAppDispatch()

    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [categories, setCategories] = useState([])

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
    
            const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';
    
            const response = await axios.post(url, { query });
            const data = response.data.data;
            const fetchedCategories = data.categories || [];
            
            setCategories(fetchedCategories);
   
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    useEffect(() => {
        fetchCategories();
        
        const member = {id: 1}
        const memberJSON = JSON.stringify(member);
        localStorage.setItem('itemKey', memberJSON);
        const storedItemJSON = localStorage.getItem('itemKey');
        if (storedItemJSON) {
            const storedItem = JSON.parse(storedItemJSON);
            console.log('Élément récupéré du localStorage :', storedItem);}
    }, []);


    return(
        <header className="headerApp">
            <NavLink to={"/"}>
            <h1>O'Talent</h1>
            </NavLink>
            <ModalFormConnexion />

        </header>
    )
}



