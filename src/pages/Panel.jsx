import React, { Component } from 'react';
import Titulo from '../components/Titulo';
import './pagesStyles/Panel.css';
import Swal from 'sweetalert2';

const cambiarAdmin = () => {
    Swal.fire({
        title: 'Cambiar datos de administrador',
        html: `<input type="text" id="user" class="swal2-input" placeholder="Shadow"/>
        <input type="password" id="password" class="swal2-input" placeholder="smmres0123"/>`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: 'red',
        confirmButtonColor: 'orange',
        confirmButtonText: 'Confirmar'   
    })
}

class Panel extends Component {
    render() {
        return (
            <div >
                <Titulo titulo="Panel Principal"/>
                <section className='section-panel'>
                    <div className='cont-panel'>
                        <label>Usuario</label>
                        <p>Shadow</p>
                        <label>Contraseña</label>
                        <p>smmres0123</p>
                        <button onClick={cambiarAdmin}>Cambiar</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default Panel;

