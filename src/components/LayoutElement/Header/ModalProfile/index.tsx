import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../store/redux-hook/hook';
import { requestWithVariable } from '../../../../utils';
import { queryNameMember, queryNameOrganization } from '../../../../query';
import {
    getMemberInformationActions,
    getOrganizationInformationActions,
} from '../../../../store/actions/getUserInformation';

export default function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const user = useAppSelector(state => state.token.user);
    const [userInformation, setUserInformation] = useState({});
    const dispatch = useAppDispatch();

    // Gestionnaire de déconnexion
    const handleLogout = () => {
        localStorage.clear();
        setIsConnected(false);
        window.location.href = '/';
    };

    const checkIsOrganization = () => {
        setIsMember(!(user.id && user.member === false));
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

            if (user.member === true) {
                const MemberInformationDispatch = {
                    firstname: userInfo.member.firstname,
                    name: userInfo.member.lastname,
                    avatar: userInfo.member.avatar,
                };
                dispatch(
                    getMemberInformationActions(MemberInformationDispatch)
                );
            }

            if (user.member === false) {
                const organizationInformationDispatch = {
                    name: userInfo.organization.name,
                    image: userInfo.organization.image,
                };
                dispatch(
                    getOrganizationInformationActions(
                        organizationInformationDispatch
                    )
                );
            }
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
                    {isMember && (
                        <img
                            alt="Your profile image"
                            src={
                                userInformation.member &&
                                userInformation.member.avatar
                                    ? `${userInformation.member.avatar}`
                                    : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'
                            }
                        />
                    )}

                    {!isMember && (
                        <img
                            alt="Your profile image"
                            src={
                                userInformation.organization &&
                                userInformation.organization.image
                                    ? `https://res.cloudinary.com/${
                                          import.meta.env.VITE_CDNY_CLOUDNAME
                                      }/image/upload/c_scale,w_780,h_520/v1/otalent/${
                                          userInformation.organization.image
                                      }`
                                    : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'
                            }
                        />
                    )}
                    {isMember && (
                        <img
                            alt="Your profile image"
                            src={
                                userInformation.member &&
                                userInformation.member.avatar
                                    ? `${`https://res.cloudinary.com/${
                                          import.meta.env.VITE_CDNY_CLOUDNAME
                                      }/image/upload/c_scale,w_1920,h_1080/v1/otalent/${
                                          userInformation.member.avatar
                                      }`}`
                                    : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'
                            }
                        />
                    )}

                    {!isMember && (
                        <img
                            alt="Your profile image"
                            src={
                                userInformation.organization &&
                                userInformation.organization.image
                                    ? `https://res.cloudinary.com/${
                                          import.meta.env.VITE_CDNY_CLOUDNAME
                                      }/image/upload/c_scale,w_780,h_520/v1/otalent/${
                                          userInformation.organization.image
                                      }`
                                    : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'
                            }
                        />
                    )}
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
