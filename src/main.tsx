import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage/index.tsx';
import store from './store/index.tsx';
import TrainingPage from './components/TrainingPage/index.tsx';
import FormPage from './components/Form/index.tsx';
import SearchPage from './components/SearchPage/index.tsx';
import OrganizationPage from './components/OrganizationPage/index.tsx';
import MemberEditPage from './components/PageEditProfile/MemberEditPage/index.tsx';
import OrganizationEditPage from './components/PageEditProfile/OrganizationEditPage/index.tsx';
import ResetPassword from './components/ResetPasswordPage/index.tsx';
import NotFoundPage from './components/ErrorPage/index.tsx';
import TeamPage from './components/TeamPage/index.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'search/:arg1', element: <SearchPage /> },
            { path: 'training/:id', element: <TrainingPage /> },
            { path: 'organization/:id', element: <OrganizationPage /> },
            { path: 'edit/organization', element: <OrganizationEditPage /> },
            { path: 'edit/member', element: <MemberEditPage /> },
            { path: 'signup', element: <FormPage /> },
            { path: 'reset-password', element: <ResetPassword /> },
            { path: 'team', element: <TeamPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
