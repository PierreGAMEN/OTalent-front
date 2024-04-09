export default function Footer() {
    return (
        <footer className="p-5 bg-primary-color text-white bottom-0">
            <div className="flex flex-col lg:flex-row justify-evenly items-center">
                <div className="flex flex-col w-1/2 items-center gap-5">
                    <a href="/" className="flex flex-row items-center">
                        <svg
                            width="40"
                            viewBox="0 0 23 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect transform="translate(2 1)" fill="none" />
                            <path
                                d="M11.3203 28C17.1193 28 21.8203 21.9558 21.8203 14.5C21.8203 7.04416 17.1193 1 11.3203 1C6.18569 1 1.91187 5.73858 1 12H5L8 5L11 12H18L12.5 17.5L14.5 24L8 20L3.78448 23.9008C5.69272 26.429 8.36382 28 11.3203 28Z"
                                stroke="currentColor"
                                stroke-width="2.0"
                            />
                        </svg>
                        <h1 className="ml-5">O'Talent</h1>
                    </a>
                    <div className="flex flex-col gap-2 items-center">
                        <p className="">
                            © 2024 O'Talent. Tous droits réservés
                        </p>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-evenly">
                    <div className="flex flex-col items-start leading-7">
                        <p className="mb-5 uppercase">Services</p>
                        <a href="/" className="">
                            Formations
                        </a>
                        <a href="/" className="">
                            Organismes
                        </a>
                        <a href="/" className="">
                            {' '}
                            Catégories
                        </a>
                    </div>
                    <div className="flex flex-col items-start leading-7">
                        <p className="mb-5 uppercase">Contact</p>
                        <a href="/" className="">
                            Nous contacter
                        </a>
                        <a href="/" className="">
                            Nous rejoindre
                        </a>
                        <a href="/" className="">
                            {' '}
                            Aide
                        </a>
                    </div>
                    <div className="flex flex-col items-start leading-7">
                        <p className="mb-5 uppercase">A propos</p>
                        <a href="/team" className="">
                            Notre équipe
                        </a>
                        <a href="/" className="">
                            Avis clients
                        </a>
                        <a href="/" className="">
                            {' '}
                            FAQ
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full mt-5 gap-5 items-center justify-center">
                <a href="/" className="">
                    Conditions générales d’utilisation
                </a>
                <a href="/" className="">
                    Charte de confidentialité
                </a>
                <a href="/" className="">
                    {' '}
                    Mentions légales
                </a>
                <a href="/" className="">
                    {' '}
                    Réclamations
                </a>
            </div>
        </footer>
    );
}
