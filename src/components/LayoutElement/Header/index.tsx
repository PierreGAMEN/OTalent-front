
import SearchBar from "./SearchBar"
import "./style.scss"

import { useAppSelector } from "../../../store/redux-hook/hook"
import ModalFormConnexion from "./ModalFormConnexion"

export default function Header () {

    const modalIsOpen = useAppSelector((state) => state.modal.state)

    return(
        <header className="headerApp">
            <h1>O'Talent</h1>
            <SearchBar className={'searchBar'}/>
            <ModalFormConnexion />

        </header>
    )
}



