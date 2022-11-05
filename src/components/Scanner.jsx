import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'
import './comonentStyle/ScannerStyle.css';
import { QrReader } from 'react-qr-reader';



const Scanner = ( {onChangeState} ) => {
    const [data, setData] = useState('No result');

    const cerrar = () =>{
        onChangeState(false)
        let md = document.getElementById('modal');
        let modal = document.getElementById('md');

        modal.style.transform = "translateY(-200%)";

        setTimeout(() => {
            md.style.visibility = "";
        }, 1000);
    }
    return (
        <div id='modal' className='modal-container'>
            <div id='md' className='modal'>
                <AiFillCloseCircle onClick={cerrar} className='icon-close' />
                <div className='modal-text'>
                    <h2>Scanner</h2>
                    <QrReader
                        onResult={(result, error) => {
                            if (result) {
                              setData(result?.text);
                            }else if(error) {
                              console.info(error);
                            }
                          }}
                        className='qr'
                    />
                    <p>{data}</p>
                </div>
            </div>
        </div>
    );
}

export default Scanner;
