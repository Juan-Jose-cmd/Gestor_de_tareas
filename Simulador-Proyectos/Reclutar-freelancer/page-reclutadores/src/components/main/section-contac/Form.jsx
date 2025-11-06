import './Form.css';

const Form = () => {
    return (
        <section id="form-section" className="form-section">
            <h2>Formulario de Registro</h2>
            <form>
                <input type="text" placeholder="Nombre completo" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Contraseña" />
                <button type="submit">Enviar</button>
            </form>
        </section>
    )
}

export default Form
