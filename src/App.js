import './App.css';
import { Fragment, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { ImExit } from 'react-icons/im'
import Logo from './imgs/logo.jpg'
import { Routes, Route, Link } from 'react-router-dom';
import List from './pages/List';
import Panel from './pages/Panel';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  const [acceso, setAcceso] = useState(false)

  const handleSubmit = (data) =>{
    setAcceso(true)
  }

  const handleClose = () => {
    setAcceso(false)
  }

  return (
    <Fragment>
     {
       acceso
      ?  <section className='App-header'>
          <header className='header'>
          <ImExit className='ico-exit' onClick={handleClose}/>

          <div className='barra'>
              <img src={Logo} className='logo'></img>
            <IoMenu className='ico-menu'/>
            
            <ul className='list'>
              <li className='list_item'><Link to='/panel_principal' className='nav_link'>Panel Principal</Link></li>
            </ul>

            <ul className='list'>
              <li className='list_item'><Link to='/lista_empleados' className='nav_link'>Lista del personal</Link></li>
              <li className='list_item'><Link to='/reportes' className='nav_link'>Reportes</Link></li>
            </ul>
          </div>
          </header>

          <Routes>
              <Route path='/panel_principal' element={<Panel />} />
              <Route path='/lista_empleados' element={<List />} />
              <Route path='/reportes' element={<Reports />} />
              <Route path='*' element={<Panel/>} />
          </Routes>
        </section>
      : <Login onSubmitLogin={handleSubmit}/> 
     }
    </Fragment>
  );
}

export default App;
