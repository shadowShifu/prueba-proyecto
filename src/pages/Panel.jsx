import React, { Component, useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import './pagesStyles/Panel.css';
import Swal from 'sweetalert2';
import axios from 'axios';



const Panel = () => {

    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        getAdmin()
    }, []);

    const getAdmin = async () => {
        await axios.get('http://localhost/proyectos/proyecto/getAdmin.php')
                .then( res => {
                    setAdmin(res.data[0]);
               })
    }

    const cambiarAdmin = () => {
        Swal.fire({
            title: 'Cambiar datos de administrador',
            html: `<input type="text" id="user" class="swal2-input" placeholder="Usuario"/>
            <input type="text" id="password" class="swal2-input" placeholder="Contraseña"/>`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red',
            confirmButtonColor: 'orange',
            confirmButtonText: 'Confirmar',
            preConfirm: () => {
                const userAd = Swal.getPopup().querySelector('#user').value
              const passwordAd = Swal.getPopup().querySelector('#password').value
              if (!userAd || !passwordAd) {
                Swal.showValidationMessage(`Debes llenar todos los campos`)
              }
              return { adminForm: userAd, passwordForm: passwordAd }
            }   
        }).then(res => {
            axios.put('http://localhost/proyectos/proyecto/updateAdmin.php', {user: res.value.adminForm, password: res.value.passwordForm})
                .then( response => {
                    if (response) {
                        getAdmin()
                    }else{
                        Swal.fire({
                            title: 'Ocurrio un error al actualizar los datos',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: 'red'
                        })
                    }
            })
        })
    }
        return (
            <div >
                <Titulo titulo="Panel Principal"/>
                <section className='section-panel'>
                    <div className='cont-panel'>
                        <label>Usuario</label>
                        <p>{admin.usuarioAdmin}</p>
                        <label>Contraseña</label>
                        <p>{admin.contraAdmin}</p>
                        <button onClick={cambiarAdmin}>Cambiar</button>
                    </div>
                </section>
            </div>
        );
    }

export default Panel;


