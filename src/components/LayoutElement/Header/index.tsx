
import SearchBar from "./SearchBar"
import "./style.scss"


import ModalFormConnexion from "./ModalFormConnexion"
import { NavLink, useLocation } from "react-router-dom"

export default function Header () {

    let location = useLocation();

    return(
        <header className="headerApp">
            <NavLink to={"/"}>
            <h1>O'Talent</h1>
            </NavLink>
            {location.pathname !== "/" && <SearchBar className={'searchBar'} />}
            <ModalFormConnexion />

        </header>
    )
}



