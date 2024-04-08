import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import { requestWithVariable } from '../../../../utils';
import { queryNameMember, queryNameOrganization } from '../../../../query';

export default function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const user = useAppSelector(state => state.token.user);
    const [userInformation, setUserInformation] = useState({})

    // Gestionnaire de déconnexion
    const handleLogout = () => {
        localStorage.clear();
        setIsConnected(false);
        window.location.href = '/';
    };

    const checkIsOrganization = () => {
        if (user.id && user.member === false) {
            setIsMember(false);
        } else {
            setIsMember(true);
        }
    };

    const getMemberInformation = async () => {
        if(user.member === true) {
            const variables = {
                memberId: user.id
        } 
           const userInfo = await requestWithVariable(queryNameMember, variables)
            setUserInformation(userInfo)

    }
        if(user.member === false) {
            const variables = {
                organizationId: user.id
            }
            const userInfo = await requestWithVariable(queryNameOrganization, variables)
            setUserInformation(userInfo)
        }
        
        }

    useEffect(() => {
        checkIsOrganization();
        getMemberInformation()
        console.log(userInformation)
    }, [user.id]);

    return (
        <div className="dropdown dropdown-end flex justify-center items-center">
            <div>
               {isMember && <p className="text-white p-5">{userInformation.member && userInformation.member.firstname}</p>}
               {!isMember && <p className="text-white p-5">{userInformation.prganization && userInformation.organization.name}</p>}
            </div>
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar w-16 h-16 border-4 border-white"
            >
                <div className="rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
                {isMember && (
                    <li>
                        <NavLink to="/edit/member">Voir le profil</NavLink>
                    </li>
                )}
                {!isMember && (
                    <li>
                        <NavLink to="/edit/organization">
                            Voir le profil
                        </NavLink>
                    </li>
                )}
                <li>
                    <a onClick={handleLogout}>Se deconnecter</a>
                </li>
            </ul>
        </div>
    );
}
