import Header from '../components/Header';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <Header />
      <div className="contact-container">
        <div className="contact-content">
          <h1>Contacto</h1>
          <div className="contact-info">
            <div className="contact-item">
              <h3>📍 Dirección</h3>
              <p>Tu dirección aquí</p>
            </div>
            <div className="contact-item">
              <h3>📞 Teléfono</h3>
              <p>Tu teléfono aquí</p>
            </div>
            <div className="contact-item">
              <h3>✉️ Email</h3>
              <p>tu@email.com</p>
            </div>
            <div className="contact-item">
              <h3>🕐 Horarios</h3>
              <p>Lunes a Domingo: 12:00 - 23:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

