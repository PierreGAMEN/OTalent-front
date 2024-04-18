import './style.scss';
import { useState } from 'react';
import FormMember from './FormMember';
import FormOrganization from './FormOrganization';
import React from 'react';

export default function FormPage() {
  const [activeButton, setActiveButton] = useState('');

  const handleClickMember = () => {
    setActiveButton('member');
  };

  const handleClickOrganization = () => {
    setActiveButton('organization');
  };

  return (
    <>
      {!activeButton && (
        <>
          <h4 className="mb-5">Vous êtes ?</h4>
          <div className="flex flex-col">
            <section
              onClick={handleClickMember}
              className="btn btn-outline btn-info mb-3"
              id="member"
            >
              <p>Un(e) futur(e) étudiant(e)</p>
            </section>
            <section
              onClick={handleClickOrganization}
              className="btn btn-outline btn-success"
              id="organization"
            >
              <p>Un organisme de formation</p>
            </section>
          </div>
        </>
      )}
      {activeButton === 'member' && (
        <div>
          <FormMember />{' '}
          <button
            className="btn btn-outline mt-5 btn-info"
            onClick={() => {
              setActiveButton('');
            }}
          >
            {' '}
            <span className="material-symbols-rounded text-sky-400">
              arrow_back
            </span>
            Retour vers le choix des profils
          </button>
        </div>
      )}
      {activeButton === 'organization' && (
        <div>
          <FormOrganization />{' '}
          <button
            className="btn btn-outline mt-5 btn-info"
            onClick={() => {
              setActiveButton('');
            }}
          >
            {' '}
            <span className="material-symbols-rounded text-sky-400">
              arrow_back
            </span>
            Retour vers le choix des profils
          </button>
        </div>
      )}
    </>
  );
}
