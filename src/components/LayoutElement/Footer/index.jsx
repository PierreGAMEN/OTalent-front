import LogoTitle from '/public/assets/LogoTitle';
import { Link } from 'react-router-dom';
import React from 'react';
import { scrollTop } from '../../../utils';

const Footer = () => (
  <>
    <footer className="p-10 text-white bg-primary-color bottom-0">
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center w-2/3 gap-10 lg:flex-row justify-evenly text-nowrap">
          <Link to="/" aria-label="Accueil" onClick={scrollTop}>
            <LogoTitle />
            <p className="mt-2">© 2024 O'Talent. Tous droits réservés</p>
          </Link>

          <div className="flex flex-col items-center leading-7">
            <p className="mb-5 uppercase">Services</p>
            <Link to="/" aria-label="Formations" onClick={scrollTop}>
              Formations
            </Link>
            <Link to="/" aria-label="Organismes" onClick={scrollTop}>
              Organismes
            </Link>
            <Link to="/" aria-label="Catégories" onClick={scrollTop}>
              Catégories
            </Link>
          </div>
          <div className="flex flex-col items-center leading-7">
            <p className="mb-5 uppercase">Contact</p>
            <a href="mailto:otalentoclock@gmail.com">Nous contacter</a>
            <Link to="/" aria-label="Nous rejoindre" onClick={scrollTop}>
              Nous rejoindre
            </Link>
            <Link to="/" aria-label="Aide" onClick={scrollTop}>
              Aide
            </Link>
          </div>
          <div className="flex flex-col items-center leading-7">
            <p className="mb-5 uppercase">A propos</p>
            <Link to="/team" aria-label="Notre équipe" onClick={scrollTop}>
              Notre équipe
            </Link>
            <Link to="/" aria-label="Avis clients" onClick={scrollTop}>
              Avis clients
            </Link>
            <Link to="/" aria-label="FAQ" onClick={scrollTop}>
              FAQ
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-5 gap-5 items-center justify-center lg:flex-row">
        <Link
          to="/"
          aria-label="Conditions générales d’utilisation"
          onClick={scrollTop}
        >
          Conditions générales d’utilisation
        </Link>
        <Link to="/" aria-label="Charte de confidentialité" onClick={scrollTop}>
          Charte de confidentialité
        </Link>
        <Link to="/" aria-label="Mentions légales" onClick={scrollTop}>
          Mentions légales
        </Link>
        <Link to="/" aria-label="Réclamations" onClick={scrollTop}>
          Réclamations
        </Link>
      </div>
    </footer>
  </>
);

export default Footer;
