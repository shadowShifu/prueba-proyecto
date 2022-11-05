import React from 'react';
import './comonentStyle/lista.css';
import { FaListAlt, FaEdit } from 'react-icons/fa'
import { TiUserDelete } from 'react-icons/ti'

const verUsuario = (valor) => {

}

const Lista = (props) => {
    return (
        <div className='linea-form'>
            <div className='form-element'>{props.carnet}</div>
            <div className='form-element'>{props.nombre}</div>
            <div className='form-element'>{props.cargo}</div>
            <div className='form-element'>{props.contacto}</div>
            <div className='form-element'>{props.direccion}</div>
            <div className='form-element'>
                <FaListAlt className='icon-list' onClick={verUsuario(props.carnet)}/>
                <FaEdit className='icon-edit'/>
                <TiUserDelete className='icon-delete'/>
            </div>
        </div>
    );
}

export default Lista;
