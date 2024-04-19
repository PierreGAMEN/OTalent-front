import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '../../../store/redux-hook/hook';

import { getTokenInformation } from '../../../store/actions/tokenActions';
import { getCategories } from '../../../store/actions/categoriesActions';
import { requestWithoutVariable, scrollTop } from '../../../utils';
import { queryAllCategories } from '../../../query';

import Navbar from './ModalProfile';
import ConnectionFormModal from './ConnectionFormModal';
import SearchBar from './SearchBar';
import LogoTitle from '/public/assets/LogoTitle';

import Chat from '../Chat';
import ModalSearchBar from './modalSearchBar';

export default function Header() {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState(false);

  const getAllCategories = useCallback(async () => {
    try {
      const response = await requestWithoutVariable(queryAllCategories);
      const fetchedCategories = response.data.categories || [];
      dispatch(getCategories(fetchedCategories));
    } catch (error) {
      console.error('Error:', error);
    }
  }, [dispatch]);

  const dispatchTokenInformation = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token && !isConnected) {
      const tokenValue = jwtDecode(token);
      dispatch(getTokenInformation(tokenValue));
      setIsConnected(true);
    }
  }, [dispatch, isConnected]);

  useEffect(() => {
    dispatchTokenInformation();
  }, [dispatchTokenInformation]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <>
      <header className=" bg-primary-color flex justify-between items-center z-10 min-h-[10vh] p-2 sticky top-0 lg:gap-32">
        <div className="ml-3">
          <Link to="/" aria-label="Accueil" onClick={scrollTop}>
            <LogoTitle />
          </Link>
        </div>
        <Chat />
        <div className="hidden grow mr-5 lg:block">
          <SearchBar />
        </div>
        <div className="mr-5 grow flex justify-end lg:hidden">
          <ModalSearchBar />
        </div>

        {!isConnected && <ConnectionFormModal />}
        {isConnected && <Navbar />}
      </header>
    </>
  );
}
