
import { Outlet } from 'react-router'
import './App.css'
import Header from './components/LayoutElement/Header'
import Footer from './components/LayoutElement/Footer'
import 'semantic-ui-css/semantic.min.css'


function App() {


  return (
    <>
      <div>
        <Header />
        
        <Outlet />

        <Footer />
      </div>
      
    </>
  )
}

export default App
