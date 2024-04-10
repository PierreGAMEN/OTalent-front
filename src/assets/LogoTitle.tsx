/**
 * LogoTitle component
 * @returns {JSX.Element} The LogoTitle component
 */
const LogoTitle = () => (
    <div className="inline-flex items-center text-white">
        <svg
            width="40"
            viewBox="0 0 23 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Logo O'Talent"
        >
            <rect transform="translate(2 1)" fill="none" />
            <path
                d="M11.3203 28C17.1193 28 21.8203 21.9558 21.8203 14.5C21.8203 7.04416 17.1193 1 11.3203 1C6.18569 1 1.91187 5.73858 1 12H5L8 5L11 12H18L12.5 17.5L14.5 24L8 20L3.78448 23.9008C5.69272 26.429 8.36382 28 11.3203 28Z"
                stroke="currentColor"
                strokeWidth="2.0"
            />
        </svg>
        <h1>O'Talent</h1>
    </div>
);

export default LogoTitle;
