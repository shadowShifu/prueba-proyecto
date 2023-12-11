import React, { useEffect, useState } from 'react';
import './pagesStyles/LoginStyle.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import Scanner from '../components/Scanner';
import ScannerOut from '../components/ScannerOut';


const Login = ({ onSubmitLogin }) => {

    const  [ data ,  setData ]  =  useState ([]);
    
    useEffect(() => {
        getAdmin()
    }, []);

    const getAdmin = () => {
         axios.get("http://localhost/proyectos/proyecto/getAdmin.php")
                        .then(res => {
                            setData(res.data[0])
                        })        
    }

    const [open, setOpen] = useState(false);
    const [openOut, setOpenOut] = useState(false);

    const scanStart = () => {
        setOpen(true)

    }

    const scanOut = () => {
        setOpenOut(true)
    }

    const cerrar = () =>{
        setOpen(false)
    }

    const cerrarout = () =>{
        setOpenOut(false)
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
            allowEnterKey: true,
            preConfirm: () => {
              const loginUser = Swal.getPopup().querySelector('#login').value
              const passwordUser = Swal.getPopup().querySelector('#password').value
              if (!loginUser || !passwordUser) {
                Swal.showValidationMessage(`Debes llenar todos los campos`)
              }
              return { login: loginUser, password: passwordUser }
            }
          }).then((result) => {
            if(result.value.login === data.usuarioAdmin && result.value.password === data.contraAdmin){
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

        {
            openOut
            ?<ScannerOut onChangeState={cerrarout}/>
            :<></>
        }
        <section className='section-login'> 
            <div className='login'>
                <div className='contScan'>
                    <button type="submit" onClick={scanStart}>Scanner Entrada</button>
                    <button type="submit" onClick={scanOut}>Scanner Salida</button> 
                </div>
                <button type="submit" className='btnAdm' onClick={loginForm}>Modo Administrador</button>
            </div>
        </section>
        </>
        
    );
}

export default Login;
