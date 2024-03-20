
import SearchBar from "../../LayoutElement/Header/SearchBar";
import "./style.scss";

export default function HeroSearchBar() {



    const scrollDown = () => {

        window.scrollTo({
            top: 1000,
            behavior: "smooth",
          });
       
    };

    return (
            <>
            <section className={`container-Hero`}>
                <h2>Trouvez votre formation</h2>
                    <div className="info-category">
                        <p className="p-info">Ou tapez le nom de votre formation</p>
                        <img src="/fleche-hero-blanche.png" alt="" />
                    </div>
                    <div className="info-formation">
                        <p className="p-info">Choisissez votre catégorie</p>
                        <img src="/fleche-hero-blanche.png" alt="" />
                    </div>
                <div className="container-Hero-searchBar">
                    <SearchBar className={`searchBarHero`} />
                </div>
                <img src="/image-header.svg" alt="" />
            </section>

            </>
        
    );
}
