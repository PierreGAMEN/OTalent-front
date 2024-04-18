import { useEffect, useState } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../store/redux-hook/hook';
import { requestWithVariable, scrollTop } from '../../../../utils';
import { queryNameMember, queryNameOrganization } from '../../../../query';
import {
    getMemberInformationActions,
    getOrganizationInformationActions,
} from '../../../../store/actions/getUserInformation';

import { openModalChat } from '../../../../store/actions/modalChatAction';


export default function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const user = useAppSelector((state) => state.token.user);
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
                    avatar: userInfo.member.avatar
                        ? userInfo.member.avatar
                        : 'yocggnbjzfjygu3naanv',
                    id: user.id
                };
                dispatch(
                    getMemberInformationActions(MemberInformationDispatch)
                );
            }

            if (user.member === false) {
                const organizationInformationDispatch = {
                    name: userInfo.organization.name,
                    image: userInfo.organization.image
                        ? userInfo.organization.image
                        : 'yocggnbjzfjygu3naanv',
                    id: user.id
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
            <div className='hidden lg:inline-block'>
                {isMember && (
                    <p className="text-white p-5 hidden lg:block">
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
                className="btn btn-ghost btn-circle avatar w-16 h-16 border-4 border-white">
                <div className="rounded-full">
                    {isMember && (
                        <img
                            alt="Your profile image"
                            src={
                                userInformation.member &&
                                userInformation.member.avatar
                                    ? `${`https://res.cloudinary.com/${
                                          import.meta.env.VITE_CDNY_CLOUDNAME
                                      }/image/upload/c_scale,w_780,h_780/v1/otalent/${
                                          userInformation.member.avatar
                                      }`}`
                                    : `${`https://res.cloudinary.com/${
                                          import.meta.env.VITE_CDNY_CLOUDNAME
                                      }/image/upload/c_scale,w_780,h_780/v1/otalent/yocggnbjzfjygu3naanv`}`
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
                                      }/image/upload/c_scale,w_780,h_780/v1/otalent/${
                                          userInformation.organization.image
                                      }`
                                    : `${`https://res.cloudinary.com/${
                                          import.meta.env.VITE_CDNY_CLOUDNAME
                                      }/image/upload/c_scale,w_780,h_780/v1/otalent/yocggnbjzfjygu3naanv`}`
                            }
                        />
                    )}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="top-16 mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                {isMember && (
                    <li>
                        <NavLink to="/edit/member" onClick={scrollTop}>Voir le profil</NavLink>
                    </li>
                )}
                {!isMember && (
                    <li>
                        <NavLink onClick={scrollTop} to="/edit/organization">
                            Voir le profil
                        </NavLink>
                    </li>
                )}
                <li>

                    <a onClick={() => {dispatch(openModalChat(true))}}>Messagerie</a>

                </li>
                <li>
                    <a onClick={handleLogout}>Se deconnecter</a>
                </li>
            </ul>
        </div>
    );
}
