import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'
import './comonentStyle/ScannerStyle.css';
import QrScan from 'react-qr-reader';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const ScannerOut = ( {onChangeState} ) => {
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
                res => {
                    if (res.data) {

                        const horaSalida = moment().format("HH:mm:ss A");
                        const idUser = data;
                        const rg = 1; 
                        
                        axios.post('http://localhost/proyectos/proyecto/updateAssistance.php', {
                            horaSalida: horaSalida,
                            rg: rg,
                            idUser: idUser
                        })
                               
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
                    <h2>Scanner Salida</h2>                     
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

export default ScannerOut;
