import React, { useState } from 'react';
import './comonentStyle/lista.css';
import { FaListAlt, FaEdit } from 'react-icons/fa'
import { TiUserDelete } from 'react-icons/ti'
import QRCode from 'qrcode';
import Swal from 'sweetalert2';
import axios from 'axios';
import jsPDF from 'jspdf';
import Fondo from '../imgs/fondo.jpg'
import Loader from './loader';

const Lista = ({carnet, nombre, cargo, ap, am, direccion, contacto, fechaN, turno, doc, genero, reload}) => {
    const [loader, setLoader] = useState(false);

    const verUsuario = () => {

        QRCode.toDataURL(carnet)
            .then(url => {
                Swal.fire({
                    title: 'Datos del personal',
                    imageUrl: url,
                    imageHeight: 250,
                    imageWidth: 250,
                    confirmButtonText: 'Descargar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: 'green',
                    cancelButtonColor: 'red',
                    showCancelButton: 'true',
                    showDenyButton: true,
                    denyButtonText: 'Mostrar documento',
                    denyButtonColor: 'blue', 
                    html: `<b>Nombre: </b>${nombre} <br><br>
                    <b>Cargo: : </b>${cargo}`
                }).then((res) => {
                    
                    if (res.isConfirmed){
                        var img = new Image;
                    QRCode.toDataURL(carnet).then(data => {
                        img=data
                        let pdf = new jsPDF('portrait', 'cm', 'A4', 'false')
                        pdf.addImage(Fondo, 'JPG', 8, 2, 5,8)
                        pdf.setFont("Helvetica", "bold")
                        pdf.setFontSize(9.5)
                        pdf.setTextColor("white")
                        pdf.text("DATOS DEL PERSONAL", 8.6,7)
                        pdf.addImage(img, 'PNG', 8.8 , 2.5, 3.5, 3.5)
                        pdf.setFont("Helvetica", "bold")
                        pdf.setFontSize(8)
                        pdf.setTextColor("white")
                        pdf.text("Nombre", 10,7.8)
                        pdf.text("Cargo", 10.1,8.8)
                        pdf.setFont("Helvetica", "normal")
                        pdf.setFontSize(8)
                        pdf.text(nombre, 10.5-(nombre.length/2)/7, 8.2)
                        pdf.text(cargo, 10.5-(cargo.length/2)/7, 9.2)
                        pdf.save(nombre+'.pdf')
                    })
            }else if(res.isDenied){
                axios.get('http://localhost/proyectos/proyecto/getPath.php')
                .then(res => {
                    Swal.fire({
                        html: `
                            <iframe id="iframePDF" frameborder="0" scrolling="no" width="90%" height="800px" src="http://localhost/proyectos/proyecto/${doc}"}"></iframe>
                        `,
                        width: 1500,
                        showCloseButton: true,
                        showConfirmButton: false
                    })
                })
                .catch(error => {
                    console.log('Error', error)
                    Swal.fire({
                        title: 'Hubo un error en el servidor',
                        icon: 'error'
                    })
                })
            }
        })
            })
    }    

    const editarUsuario = () =>{
        const formData = new FormData();
        Swal.fire({
            title: 'Editar personal',
            width: 1000,
            html: `
            <input type="text" id="car" class="swal2-input" value=${carnet} placeholder="Carnet"/>
            <input type="text" id="nom" class="swal2-input" value=${nombre} placeholder="Nombre(s)"/>
            <input type="text" id="ap" class="swal2-input" value=${ap} placeholder="Apellido Paterno"/>
            <input type="text" id="am" class="swal2-input" value=${am} placeholder="Apellido Materno"/>
            <input type="text" id="carg" class="swal2-input" value=${cargo} placeholder="Cargo"/>
            <input type="text" id="dir" class="swal2-input" value=${direccion} placeholder="Direccion"/>
            <input type="text" id="con" class="swal2-input" value=${contacto} placeholder="Contacto"/>

            <label>Fecha de nacimiento:</label>
            <input id="fecha" type="date" class="swal2-input" value="${fechaN}"/>
            <br>

            <label>Turno:</label>

            ${turno=="tarde" ? 

            `<select id="turno" class="swal2-input">
                <option>mañana</option>
                <option selected>tarde</option>
             </select> `
            : 
            `<select id="turno" class="swal2-input">
                <option selected>mañana</option>
               <option>tarde</option>
             </select>  `}

          

            <label>Género:</label>
           
            ${genero=="hombre" ? 

            `<select id="genero" class="swal2-input">
                <option selected>hombre</option>
                <option>mujer</option>
            </select> `
            : 
            `<select id="genero" class="swal2-input">
                <option>hombre</option>
                <option selected>mujer</option>
            </select> `}
            
            <br>
            <label>Carnet de manipulacion y sanidad:</label>
            <i>(${doc.slice(10)})</i>
            <input id="docSanidad" type="file" class="swal2-input" accept="application/pdf""/>

             `,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "red",
            confirmButtonColor: "blue",
            preConfirm: () => {
                const carnetF = Swal.getPopup().querySelector('#car').value;
                const nombreF = Swal.getPopup().querySelector('#nom').value;
                const apellidoPF = Swal.getPopup().querySelector('#ap').value;
                const apellidoMF = Swal.getPopup().querySelector('#am').value;
                const cargoF = Swal.getPopup().querySelector('#carg').value;
                const contactoF = Swal.getPopup().querySelector('#con').value;
                const direccionF = Swal.getPopup().querySelector('#dir').value;
                const fechaNF = Swal.getPopup().querySelector('#fecha').value;
                const turnoF = Swal.getPopup().querySelector('#turno').value;
                const generoF = Swal.getPopup().querySelector('#genero').value;
                const docSanidad = Swal.getPopup().querySelector('#docSanidad').files;

                formData.append("archivo", docSanidad[0]);
                
                if(!carnetF || !nombreF || !apellidoPF || !apellidoMF || !cargoF || !contactoF || !direccionF || !fechaNF || !turnoF || !generoF){
                    Swal.showValidationMessage('Debes llenar todos los campos')
                }
                return { carnet: carnetF, 
                    nombre: nombreF, 
                    apellidoP: apellidoPF, 
                    apellidoM: apellidoMF, 
                    cargo: cargoF, 
                    contacto: contactoF, 
                    direccion: direccionF,
                    fecha: fechaNF,
                    turno: turnoF,
                    genero: generoF}   
            }
        }).then(async res => {
            
            if(res.isConfirmed){
                setLoader(true)
                formData.append("id", res.value.carnet);
                formData.append("nombre", res.value.nombre);
                formData.append("apellidoP", res.value.apellidoP);
                formData.append("apellidoM", res.value.apellidoM);
                formData.append("cargo", res.value.cargo);
                formData.append("contacto", res.value.contacto);
                formData.append("direccion", res.value.direccion);
                formData.append("fechaN", res.value.fecha);
                formData.append("genero", res.value.genero);
                formData.append("turno", res.value.turno);
                formData.append("id2", carnet);

                await axios.post('http://localhost/proyectos/proyecto/updateUser.php/', formData)    
                    .then(res =>{
                        if (res) {
                            setLoader(false)
                        Swal.fire({
                            title: 'Datos actualizados exitosamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: 'blue'
                        }).then(res => {
                                reload("reload")
                        })
                        }else{
                        setLoader(false)
                        Swal.fire({
                            title: 'Hubo un error al editar los datos',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: 'red'
                        })
                        }
                    })
           
           }
        })
    } 

    const borrarUsuario = () => {
        Swal.fire({
            title: '¿Estas seguro de borrar este personal?',
            icon: 'question',
            confirmButtonColor: 'red',
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'blue'
        }).then((rs) => {
            if (rs.isConfirmed) {
                axios.delete("http://localhost/proyectos/proyecto/deleteUser.php", {
                data: {id: carnet}
            })
                .then(res => {
                    if (res) {
                        Swal.fire({
                            title: 'Datos borrados exitosamente',
                            showConfirmButton: 'Aceptar'
                        })
                        reload(true)
                    }else{
                        Swal.fire({
                            title: 'Hubo un error al borrar este usuario'
                        })
                    }

                })
            }
        })
    }

    return (
        <>
        {loader ? <Loader /> : <></>}
        <div className='linea-form'>
            <div className='form-element'>{carnet}</div>
            <div className='form-element'>{nombre}</div>
            <div className='form-element'>{cargo}</div>
            <div className='form-element'>{contacto}</div>
            <div className='form-element'>{direccion}</div>
            <div className='form-element'>
                <FaListAlt className='icon-list' onClick={verUsuario}/>
                <FaEdit className='icon-edit' onClick={editarUsuario}/>
                <TiUserDelete className='icon-delete' onClick={borrarUsuario}/>
            </div>
        </div>
        </>
        
    );
}

export default Lista;
