
import { Outlet } from 'react-router'
import Header from './components/LayoutElement/Header'
import Footer from './components/LayoutElement/Footer'
// import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from 'react-toastify'


function App() {


  return (
    <>
      <div>
        <ToastContainer />
        <Header />
        
        <Outlet />

        <Footer />
      </div>
      
    </>
  )
}

export default App
