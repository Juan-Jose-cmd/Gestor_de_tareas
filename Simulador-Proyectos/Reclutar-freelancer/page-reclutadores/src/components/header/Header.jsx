import { useTypewriter } from '../../hooks/useTypewriter'
import './Header.css'

const Header = () => {
    const { text: titleText, isTyping: isTitleTyping } = useTypewriter(
        "No Busques un Trabajo. Encuentra tu Próximo Proyecto.",
        150,
        150
    )

    const { text: subtitleText, isTyping: isSubtitleTyping } = useTypewriter(
        "Tu Talento, Tu Reglas",
        150,
        9000
    )

    const scrollToForm = () => {
        const formSection = document.getElementById('form-section')
        if (formSection) {
            formSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    return (
        <header className="header">
            <div className="title-container">
                <h1 id='title-principal'>
                    {titleText || " "}
                    {isTitleTyping && <span className="blinking-cursor">|</span>}
                </h1>
            </div>
            
            <div className="subtitle-container">
                <h2 id='subtitle-principal'>
                    {subtitleText || " "}
                    {isSubtitleTyping && <span className="blinking-cursor">|</span>}
                </h2>
            </div>

            <button onClick={scrollToForm} className='btn'>REGISTRATE!!</button>
        </header>
    )
}

export default Header
