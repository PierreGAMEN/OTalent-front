import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import { requestWithVariable } from '../../../../utils';
import { queryNameMember, queryNameOrganization } from '../../../../query';

export default function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const user = useAppSelector(state => state.token.user);
    const [userInformation, setUserInformation] = useState({});

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

    const getUserInformation = async () => {
        try {
            let variables;
            let query;

            if (user.member === true) {
                variables = { memberId: user.id };
                query = queryNameMember;
            } else {
                variables = { organizationId: user.id };
                query = queryNameOrganization;
            }
            const responseWithErrors = await requestWithVariable(
                query,
                variables
            );

            const userInfo = responseWithErrors.data;
            setUserInformation(userInfo);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des informations utilisateur :',
                error
            );
        }
    };

    useEffect(() => {
        checkIsOrganization();
        getUserInformation();
    }, []);

    return (
        <div className="dropdown dropdown-end flex justify-center items-center">
            <div>
                {isMember && (
                    <p className="text-white p-5">
                        {userInformation.member &&
                            userInformation.member.firstname}
                    </p>
                )}
                {!isMember && (
                    <p className="text-white p-5">
                        {userInformation.organization &&
                            userInformation.organization.name}
                    </p>
                )}
            </div>
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar w-16 h-16 border-4 border-white"
            >
                <div className="rounded-full">
                    <img
                        alt="Your profile image"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="top-16 mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
