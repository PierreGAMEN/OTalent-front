import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar () {
  
  const [isConnected, setIsConnected] = useState(false)

  // Gestionnaire de déconnexion
  const handleLogout = () => {
    localStorage.clear();
    setIsConnected(false)
    location.reload();
};



    return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-15 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li><NavLink to="/edit/member">Voir le profil</NavLink></li>
        <li><a onClick={handleLogout}>Se deconnecter</a></li>
      </ul>
    </div>
)
}
