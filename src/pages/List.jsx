import React, { Component } from 'react';
import Titulo from '../components/Titulo';
import './pagesStyles/List.css'
import { TiUserAdd } from 'react-icons/ti';
import Swal from 'sweetalert2';
import Lista from '../components/lista';

const agregarEmpleado = () => {
    Swal.fire({
        title: 'Agregar personal',
        html: `<input id="carnet" type="text" class="swal2-input" placeholder="Carnet"/>
                <input id="nombre" type="text" class="swal2-input" placeholder="Nombre(s)"/>
                <input id="apellidoP" type="text" class="swal2-input" placeholder="Apellido Paterno"/>
                <input id="apellidoM" type="text" class="swal2-input" placeholder="Apellido Materno"/>
                <input id="cargo" type="text" class="swal2-input" placeholder="Cargo"/>
                <input id="contacto" type="text" class="swal2-input" placeholder="Contacto"/>
                <input id="direccion" type="text" class="swal2-input" placeholder="Direccion"/>
                `,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: 'red',
        confirmButtonColor: 'blue',
        confirmButtonText: 'Registrar',
        preConfirm: () => {
            const carnetF = Swal.getPopup().querySelector('#carnet').value;
            const nombreF = Swal.getPopup().querySelector('#nombre').value;
            const apellidoPF = Swal.getPopup().querySelector('#apellidoP').value;
            const apellidoMF = Swal.getPopup().querySelector('#apellidoM').value;
            const cargoF = Swal.getPopup().querySelector('#cargo').value;
            const contactoF = Swal.getPopup().querySelector('#contacto').value;
            const direccionF = Swal.getPopup().querySelector('#direccion').value;
            
            if(!carnetF || !nombreF || !apellidoPF || !apellidoMF || !cargoF || !contactoF || !direccionF){
                Swal.showValidationMessage('Debes llenar todos los campos')
            }
            return { carnet: carnetF, nombre: nombreF, apellidoP: apellidoPF, apellidoM: apellidoMF, cargo: cargoF, contacto: contactoF, direccion: direccionF}   
        }
    }).then(res =>{
        if(res.value){
            Swal.fire({
                title: 'Datos registrados exitosamente'
            })
            console.log(res.value);
        }
    })
}

class List extends Component {

    render() {
        return (
            <div>
                <Titulo titulo="Lista de empleados"/>
                <section className='lista_empleados'>
                    <div className='cont-btn'>
                        <button className='btn-export'>Exportar a PDF</button>
                        <button className='btn-add' onClick={agregarEmpleado}><TiUserAdd /> Agregar personal</button>
                    </div>
                    <div className='linea-form'>
                        <div className='form-element'><b>Carnet</b></div>
                        <div className='form-element'><b>Nombre Completo</b></div>
                        <div className='form-element'><b>Cargo</b></div>
                        <div className='form-element'><b>Contacto</b></div>
                        <div className='form-element'><b>Direccion</b></div>
                        <div className='form-element'><b>Acción</b></div>
                    </div>
                    <Lista carnet="9134421" nombre="Romel Diego Rodriguez" cargo="Administrador" contacto="78993708" direccion="Av. 20 de octubre"/>
                </section>
            </div>
        );
    }
}

export default List;
