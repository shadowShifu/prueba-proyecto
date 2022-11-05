import React, { useState } from 'react';
import './pagesStyles/LoginStyle.css';
import Swal from 'sweetalert2'

import Scanner from '../components/Scanner';

const admin = {
    user: 'Shadow',
    password: 'smmres0123'
} 

const Login = ({ onSubmitLogin }) => {

    const  [ data ,  setData ]  =  useState ( 'Sin resultado' ) ;
    const [open, setOpen] = useState(false);

    const cambiar = () => {
        setOpen(true)
    }
    const cerrar = () =>{
        setOpen(false)
    }

    const loginForm = () =>{
        Swal.fire({
            title: 'Iniciar Sesion',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
            <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
            confirmButtonText: 'Acceder',
            confirmButtonColor: 'blue',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red',
            focusConfirm: false,
            preConfirm: () => {
              const loginUser = Swal.getPopup().querySelector('#login').value
              const passwordUser = Swal.getPopup().querySelector('#password').value
              if (!loginUser || !passwordUser) {
                Swal.showValidationMessage(`Debes llenar todos los campos`)
              }
              return { login: loginUser, password: passwordUser }
            }
          }).then((result) => {
            if(result.value.login === admin.user && result.value.password === admin.password){
                Swal.fire({
                    title: 'Bienvenido',
                    icon: 'success'
                }).then(() => {
                    onSubmitLogin(true)
                })
            }else{
                Swal.fire({
                    title: 'Usuario no reconocido',
                    icon: 'error'
                })
            }
          })
    }

    return (
        <>
        {
            open
            ?<Scanner onChangeState={cerrar}/>
            :<></>
        }
        <section className='section-login'> 
            <div className='login'>
                <button type="submit" onClick={cambiar}>Abrir Scanner</button>
                <button type="submit" onClick={loginForm}>Modo Administrador</button>
            </div>
        </section>
        </>
        
    );
}

export default Login;
