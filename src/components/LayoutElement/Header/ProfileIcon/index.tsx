import './style.scss'


export default function ProfileIcon () {

    // L'icône doit être en position fixe pour permettre à l'utilisateur de se connecter en permanence 
    // Lors de l'appel de l'icone, une barre latéral doit s'ouvrir pour permettre à l'utilisateur de se connecter (affichage organisme/ étudiant)
    // Si l'utilisateur est connecté, il faut prévoir de pouvoir ouvrir une page spécifique à son profil

    // En mode téléphone, la modale, prendrai la largeur du screen 


    return (
    
           <button className="ui grey button">
            <i className="user icon"></i>
            </button> 
   
    )
}


