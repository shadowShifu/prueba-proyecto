import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import './pagesStyles/List.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import Loader from '../components/loader';
import Select from 'react-select';
import jsPDF from 'jspdf';
import MUIDataTable from 'mui-datatables';
import { FaListAlt, FaEdit } from 'react-icons/fa'
import { TiUserAdd, TiUserDelete } from 'react-icons/ti';
import QRCode from 'qrcode';
import Fondo from '../imgs/fondo.jpg'

const List = () => {

    const [lista, setLista] = useState([]);
    const [loader, setLoader] = useState(false);
    const [turno, setTurno] = useState('mañana');

    const options = [
        {label: 'Mañana', value: 'mañana'},
        {label: 'Tarde', value: 'tarde'}
    ]

    useEffect(() => { 
        const getU = async () => {
            const url = 'http://localhost/proyectos/proyecto/getUsersT.php'
            const result = await axios.get(url, {params: {turno: 'mañana'}})
            setLista(result.data)
        }
        getU()
    }, []);

    const getUsers = async () => {
        const peticion = await axios.get("http://localhost/proyectos/proyecto/getUsersT.php", {params: {turno: turno}});
        setLista(peticion.data);
    }

    const agregarEmpleado = async () => {
        const formData = new FormData();

        Swal.fire({
            title: 'Agregar personal',
            html: `
                    <input id="carnet" type="text" class="swal2-input" placeholder="Carnet"/>
                    <input id="nombre" type="text" class="swal2-input" placeholder="Nombre(s)"/>
                    <input id="apellidoP" type="text" class="swal2-input" placeholder="Apellido Paterno"/>
                    <input id="apellidoM" type="text" class="swal2-input" placeholder="Apellido Materno"/>
                    <input id="cargo" type="text" class="swal2-input" placeholder="Cargo"/>
                    <input id="contacto" type="text" class="swal2-input" placeholder="Contacto"/>
                    <input id="direccion" type="text" class="swal2-input" placeholder="Direccion"/>
                    <label>Fecha de nacimiento:</label>
                    <input id="fecha" type="date" class="swal2-input"/>
                    <br>
                    <label>Turno:</label>
                    <select id="turno" class="swal2-input">
                        <option>mañana</option>
                        <option>tarde</option>
                    </select> 
                    <label>Género:</label>
                    <select id="genero" class="swal2-input">
                        <option>hombre</option>
                        <option>mujer</option>
                    </select> 
                    <br>
                    <label>Carnet de manipulacion y sanidad:</label>
                    <input id="docSanidad" type="file" class="swal2-input" accept="application/pdf"/>
                    `,
            showCancelButton: true,
            width: 1000,
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
                const fechaN = Swal.getPopup().querySelector('#fecha').value;
                const turno = Swal.getPopup().querySelector('#turno').value;
                const genero = Swal.getPopup().querySelector('#genero').value;
                const docSanidad = Swal.getPopup().querySelector('#docSanidad').files;
                
                formData.append("archivo", docSanidad[0]);
                
                if(!carnetF || !nombreF || !apellidoPF || !apellidoMF || !cargoF || !contactoF || !direccionF || !fechaN || !turno || !genero || !docSanidad){
                    Swal.showValidationMessage('Debes llenar todos los campos')
                }
                return { 
                    carnet: carnetF, 
                    nombre: nombreF, 
                    apellidoP: apellidoPF, 
                    apellidoM: apellidoMF, 
                    cargo: cargoF, 
                    contacto: contactoF, 
                    direccion: direccionF,
                    fechaN: fechaN,
                    turno: turno,
                    genero: genero,}   
            }
        }).then(async res =>{
            
            await axios.get("http://localhost/proyectos/proyecto/getUser.php", {params: {id: res.value.carnet}})
                .then(async result => {
                    setLoader(true);
                    if(!result.data){
                        formData.append("id", res.value.carnet);
                        formData.append("nombre", res.value.nombre);
                        formData.append("apellidoP", res.value.apellidoP);
                        formData.append("apellidoM", res.value.apellidoM);
                        formData.append("cargo", res.value.cargo);
                        formData.append("contacto", res.value.contacto);
                        formData.append("direccion", res.value.direccion);
                        formData.append("fechaN", res.value.fechaN);
                        formData.append("genero", res.value.genero);
                        formData.append("turno", res.value.turno);
                        await axios.post("http://localhost/proyectos/proyecto/addUser.php", formData).then(res =>{
                           if (res) {
                            setLoader(false)
                            Swal.fire({
                                title: 'Datos registrados exitosamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: 'blue'
                            }).then(() => {
                                getUsers();
                            })
                           }else{
                            Swal.fire({
                                title: 'Hubo un error al guardar los datos',
                                icon: 'error',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: 'red'
                            })
                           }
                        })
                    }else{
                        setLoader(false)
                        Swal.fire({
                            title: 'Este usuario ya existe',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: 'red'
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
                
        })
    }

    const cambiarTurno = async ( {value} ) => {
        setTurno(value)
        const peticion = await axios.get("http://localhost/proyectos/proyecto/getUsersT.php", {params: {turno: value}});
        setLista(peticion.data);
    }

    const exportarPDF = () => {
        let pdf = new jsPDF('portrait', 'cm', 'A4', 'false')
                        pdf.setFont("Helvetica", "bold")
                        pdf.setFontSize(9.5)
                        pdf.setTextColor("white")
                        pdf.text("DATOS DEL PERSONAL", 8.6,7)
                        
                        pdf.setFont("Helvetica", "bold")
                        pdf.setFontSize(8)
                        pdf.setTextColor("white")
                        pdf.text("Nombre", 10,7.8)
                        pdf.text("Cargo", 10.1,8.8)
                        pdf.setFont("Helvetica", "normal")
                        pdf.setFontSize(8)
                        pdf.save('credencial.pdf')
    }
    

    const columns = [
        {
            name: 'id',
            label: 'Carnet'
        },
        {
            name: 'nomcomp',
            label: 'Nombre completo', 
        },
        {
            name: 'nombre',
            label: 'Nombre',
            options: {
                display: false
            }
        },
        {
            name: 'apellidoP',
            label: 'Apellido Paterno',
            options: {
                display: false
            }
        },
        {
            name: 'apellidoM',
            label: 'Apellido Materno',
            options: {
                display: false
            }
        },
        {
            name: 'fechaN',
            label: 'Fecha de nacimiento',
            options: {
                display: false
            }
        },
        {
            name: 'genero',
            label: 'Genero',
            options: {
                display: false
            }
        },
        {
            name: 'turno',
            label: 'Turno',
            options: {
                display: false
            }
        },
        {
            name: 'docSanidad',
            label: 'Documento',
            options: {
                display: false
            }
        },
        {
            name: 'cargo',
            label: 'Cargo'
        },
        {
            name: 'contacto',
            label: 'Contacto'
        },
        {
            name: 'direccion',
            label: 'Direccion'
        },
        {
            name: 'id',
            label: 'Accion',
            options: {
                customBodyRender: (value, tableMeta, updatevalue) => {
                    return (
                        <>
                            <FaListAlt className='icon-list' onClick={() => {verUsuario(tableMeta.rowData[0],
                                                                                        tableMeta.rowData[1],
                                                                                        tableMeta.rowData[9],
                                                                                        tableMeta.rowData[8],
                                                                                        tableMeta.rowData[0],)}}/>
                            <FaEdit className='icon-edit' onClick={() => {editarUsuario(tableMeta.rowData[0],
                                                                                        tableMeta.rowData[2],
                                                                                        tableMeta.rowData[3],
                                                                                        tableMeta.rowData[4],
                                                                                        tableMeta.rowData[9],
                                                                                        tableMeta.rowData[11],
                                                                                        tableMeta.rowData[10],
                                                                                        tableMeta.rowData[5],
                                                                                        tableMeta.rowData[7],
                                                                                        tableMeta.rowData[6],
                                                                                        tableMeta.rowData[8]
                                                                                        )}}/>
                            <TiUserDelete className='icon-delete' onClick={() => {borrarUsuario(value)}}/>
                        </>
                    )
                }
            }
        }
    ];

    const opt = {
        
        textLabels: {
            pagination: {
              next: "Página siguiente",
              previous: "Página anterior",
              rowsPerPage: "Filas por página:",
              displayRows: "of",
            },
            toolbar: {
              search: "Buscar",
              downloadCsv: "Descargar Excel",
              print: "Imprimir",
              viewColumns: "Ver columnas",
              filterTable: "Filtrar",
            },
            filter: {
              all: "Todo",
              title: "Filtrar",
              reset: "Restablecer",
            },
            viewColumns: {
              title: "Mostrar columnas",
              titleAria: "Mostrar/Ocultar columnas",
            },
            selectedRows: {
              text: "fila(s) seleccionada(s)",
              delete: "Borrar",
              deleteAria: "Borrar seleccionados",
            },
          },
          selectableRows: false
    }

    const verUsuario = (carnet, nombre, cargo, doc) => {

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

    const borrarUsuario = (carnet) => {
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
                        }).then(()=>{
                            getUsers()
                        })
                        
                    }else{
                        Swal.fire({
                            title: 'Hubo un error al borrar este usuario'
                        })
                    }

                })
            }
        })
    }

    const editarUsuario = (carnet, nombre, ap, am, cargo, direccion, contacto, fechaN, turno, genero, doc) =>{
        const formData = new FormData();
        Swal.fire({
            title: 'Editar personal',
            width: 1000,
            html: `
            <input type="text" id="car" class="swal2-input" value="${carnet}" placeholder="Carnet"/>
            <input type="text" id="nom" class="swal2-input" value="${nombre}" placeholder="Nombre(s)"/>
            <input type="text" id="ap" class="swal2-input" value=${ap} placeholder="Apellido Paterno"/>
            <input type="text" id="am" class="swal2-input" value=${am} placeholder="Apellido Materno"/>
            <input type="text" id="carg" class="swal2-input" value="${cargo}" placeholder="Cargo"/>
            <input type="text" id="dir" class="swal2-input" value="${direccion}" placeholder="Direccion"/>
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
                        }).then(() => {
                                getUsers();
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

        return (
            
            <div>
                <Titulo titulo="Lista de empleados"/>
                <section className='lista_empleados'>
                    <div className='cont-btn'>
                        <button className='btn-export' onClick={exportarPDF}>Exportar a PDF</button>
                        
                        <button className='btn-add' onClick={agregarEmpleado}><TiUserAdd /> Agregar personal</button>
                        
                    </div>
                    <div className='contSelect'>
                            <label className='lbl'>Turno</label>
                           
                            <Select 
                                className='selectStyle'
                                defaultValue={options[0]}
                                options={options}
                                onChange={ cambiarTurno }
                            />
                        </div>
                    
                    {loader ? <Loader /> : <></>}
                    
                    <MUIDataTable 
                        columns={columns}
                        data={lista}
                        options={opt}
                    />

                </section>
            </div>
        );
    }
export default List;
