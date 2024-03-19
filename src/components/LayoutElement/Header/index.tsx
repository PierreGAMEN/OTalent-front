
import SearchBar from "./SearchBar"
import "./style.scss"
import ProfileIcon from "./ProfileIcon"

export default function Header () {

    return(
        <header className="headerApp">
            <h1>O'Talent</h1>
            <SearchBar className={'searchBar'}/>
            <ProfileIcon />
        </header>
    )
}



