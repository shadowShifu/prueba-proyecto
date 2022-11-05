import './comonentStyle/Titulo.css';

const Titulo = (props) => {
    return (
        <div>
            <h1 className="titulo">{props.titulo}</h1>            
        </div>
    );
}

export default Titulo;
