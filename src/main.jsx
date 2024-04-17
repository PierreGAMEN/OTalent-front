import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage/index.jsx';
import store from './store/index.js';
import TrainingPage from './components/TrainingPage/index.jsx';
import FormPage from './components/Form/index.jsx';
import SearchPage from './components/SearchPage/index.jsx';
import OrganizationPage from './components/OrganizationPage/index.jsx';
import MemberEditPage from './components/PageEditProfile/MemberEditPage/index.jsx';
import OrganizationEditPage from './components/PageEditProfile/OrganizationEditPage/index.jsx';
import ResetPassword from './components/ResetPasswordPage/index.jsx';
import { NotFoundPage, ServerErrorPage } from './components/ErrorPage/index.jsx';
import TeamPage from './components/TeamPage/index.jsx';
import React from 'react';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'search/', element: <SearchPage /> },
            { path: 'training/:id', element: <TrainingPage /> },
            { path: 'organization/:id', element: <OrganizationPage /> },
            { path: 'edit/organization', element: <OrganizationEditPage /> },
            { path: 'edit/member', element: <MemberEditPage /> },
            { path: 'signup', element: <FormPage /> },
            { path: 'reset-password', element: <ResetPassword /> },
            { path: 'team', element: <TeamPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'error', element: <ServerErrorPage />},
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
