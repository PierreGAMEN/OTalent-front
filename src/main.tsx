import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage/index.tsx';
import store from './store/index.tsx';
import TrainingPage from './components/TrainingPage/index.tsx';
import CategoryTrainingPage from './components/CategoryTrainingPage/index.tsx';
import MemberProfilePage from './components/PageProfile/MemberProfilePage/index.tsx';
import OrganismProfilePage from './components/PageProfile/OrganizationProfilePage/index.tsx';
import FormPage from './components/Form/index.tsx';


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "training/category/:name", element: <CategoryTrainingPage /> },
      { path: "training/:title", element: <TrainingPage /> },
      { path: "member/:name", element: < MemberProfilePage/> },
      { path: "organism/:name", element: < OrganismProfilePage/> },
      { path: "edit/organism/:name", element: < OrganismProfilePage/> },
      { path: "edit/organism/:name", element: < OrganismProfilePage/> },
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
