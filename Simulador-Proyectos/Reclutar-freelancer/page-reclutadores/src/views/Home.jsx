import Header from '../components/header/Header';
import SectionMain from '../components/main/SectionMain';
import Form from '../components/main/section-contac/Form';
import Footer from '../components/footer/Footer';
import './Home.css'

const Home = () => {
    return (
        <div className="app-container">
            <div className="cover-header">
                <Header />
            </div>
            
            <div className="section-container">
                <SectionMain />
            </div>
            
            <div className="section-container">
                <Form />
            </div>
            
            <div className="section-container">
                <Footer />
            </div>
        </div>
    );
}

export default Home;