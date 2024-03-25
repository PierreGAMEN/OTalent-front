import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage/index.tsx';
import store from './store/index.tsx';
import TrainingPage from './components/TrainingPage/index.tsx'; 
import FormPage from './components/Form/index.tsx';
import SearchPage from './components/SearchPage/index.tsx';
import OrganizationPage from './components/OrganizationPage/index.tsx';


const router = createBrowserRouter([
  
  { index: true, element: <HomePage /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "search/:arg1", element: <SearchPage /> },
      { path: "training/:id", element: <TrainingPage /> },
      { path: "organization/:id", element: <OrganizationPage/> },
      { path: "edit/organization/:id", element: <HomePage /> },
      { path: "signup", element: <FormPage />},
      
    ],
  },
  
 
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
