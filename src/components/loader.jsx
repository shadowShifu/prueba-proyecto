import React, { Component } from 'react';
import './comonentStyle/loader.css';

class Loader extends Component {
    render() {
        return (
           <section className='sss'>
             <div className='center'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
           </section>
        );
    }
}

export default Loader;
