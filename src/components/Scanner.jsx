import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'
import './comonentStyle/ScannerStyle.css';
import QrScan from 'react-qr-reader';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const Scanner = ( {onChangeState} ) => {
    const [open, setOpen] = useState(true)

    const cerrar = () =>{
        onChangeState(false)
        let md = document.getElementById('modal');
        let modal = document.getElementById('md');

        modal.style.transform = "translateY(-200%)";

        setTimeout(() => {
            md.style.visibility = "";
        }, 1000);
    }
    
    
    const handleScan = async (data) => {
        if (data) {
            setOpen(false)
            await axios.get('http://localhost/proyectos/proyecto/getUser.php', {
                params: {id: data}
            }).then(
                async res => {
                    if (res.data) {
                        const fecha = moment().format("DD/MM/YYYY");
                        const horaEntrada = moment().format("HH:mm:ss A");
                        const horaSalida = "No se registro";
                        const idUser = data;
                        const rg = 0; 
                        
                        const hr = '08:10:00 AM'
                        const hr2 = '14:10:00 PM'

                        if(moment().format("A") == "AM"){
                            if(horaEntrada <= hr){
                                await axios.post('http://localhost/proyectos/proyecto/setAssistance.php',{
                                    idUser: idUser,
                                    fecha: fecha,
                                    horaEntrada: horaEntrada,
                                    horaSalida: horaSalida,
                                    rg: rg,
                                    control: 'Puntual',
                                    turno: res.data.turno
                                }).then(res => {
                                    if (res.data) {
                                        Swal.fire({
                                            title: 'Datos guardados',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }else{
                                        Swal.fire({
                                            title: 'Hubo un error al guardar los datos',
                                            icon: 'error',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }
                                })
                            }else{
                                await axios.post('http://localhost/proyectos/proyecto/setAssistance.php',{
                                    idUser: idUser,
                                    fecha: fecha,
                                    horaEntrada: horaEntrada,
                                    horaSalida: horaSalida,
                                    rg: rg,
                                    control: 'Atraso',
                                    turno: res.data.turno
                                }).then(res => {
                                    console.log(res.data);
                                    if (res.data) {
                                        Swal.fire({
                                            title: 'Datos guardados',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }else{
                                        Swal.fire({
                                            title: 'Hubo un error al guardar los datos',
                                            icon: 'error',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }
                                })
                            }
                        }else if(moment().format("A") == "PM"){
                            if(horaEntrada <= hr2){
                                await axios.post('http://localhost/proyectos/proyecto/setAssistance.php',{
                                    idUser: idUser,
                                    fecha: fecha,
                                    horaEntrada: horaEntrada,
                                    horaSalida: horaSalida,
                                    rg: rg,
                                    control: 'Puntual',
                                    turno: res.data.turno
                                }).then(res => {
                                    if (res.data) {
                                        Swal.fire({
                                            title: 'Datos guardados',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }else{
                                        Swal.fire({
                                            title: 'Hubo un error al guardar los datos',
                                            icon: 'error',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }
                                })
                            }else{
                                await axios.post('http://localhost/proyectos/proyecto/setAssistance.php',{
                                    idUser: idUser,
                                    fecha: fecha,
                                    horaEntrada: horaEntrada,
                                    horaSalida: horaSalida,
                                    rg: rg,
                                    control: 'Atraso',
                                    turno: res.data.turno
                                }).then(res => {
                                    console.log(res.data);
                                    if (res.data) {
                                        Swal.fire({
                                            title: 'Datos guardados',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }else{
                                        Swal.fire({
                                            title: 'Hubo un error al guardar los datos',
                                            icon: 'error',
                                            showConfirmButton: false,
                                            timer: 2500,
                                            timerProgressBar: true,
                                            allowEnterKey: false,
                                            allowOutsideClick: false,                            
                                        })
                                        setTimeout(() => {
                                            setOpen(true)
                                        }, 2000);
                                    }
                                })
                            }
                        }
                             
                        
                    }else{
                        Swal.fire({
                            title: 'Usuario no encontrado',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 2500,
                            timerProgressBar: true,
                            allowEnterKey: false,
                            allowOutsideClick: false,
                        })
                        setTimeout(() => {
                            setOpen(true)
                        }, 2000);
                    }
                }
            )
        }
    }
        const handleError = err => {
        console.error(err)
        console.log("Error Scanner");
    }

    return (
        <div id='modal' className='modal-container'>
            <div id='md' className='modal'>
                <AiFillCloseCircle onClick={cerrar} className='icon-close' id='btnClose'/>
                <div className='modal-text'>
                    <h2>Scanner Entrada</h2>                  
                </div>
                {open ?
                            <QrScan
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                className="qr"
                             />
                                
                            : <></>}
            </div>
        </div>
    );
}

export default Scanner;
