// src/pages/ContactPage.jsx

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const textPhoneNumber = "+13089208128";
const displayTextPhone = "+1 308-920-8128";

const whatsappNumber = "+14056179293";
const displayWhatsapp = "+1 405-617-9293";

const emailAddress = "uotohol5@gmail.com";
const facebookUrl = "https://www.facebook.com/share/17u5bPzfKG/?mibextid=wwXIfr";
const instagramUrl = "/";

const bookingMessage =
  "Hi Katrina Studios, I would like to book a massage session. Please share your availability.";

function ContactPage() {
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(
    "+",
    ""
  )}?text=${encodeURIComponent(bookingMessage)}`;

  const smsLink = `sms:${textPhoneNumber}?body=${encodeURIComponent(
    bookingMessage
  )}`;

  return (
    <>
      <Helmet>
        <title>Contact | Katrina Studios</title>
        <meta
          name="description"
          content="Contact Katrina Studios by WhatsApp, text, phone, or email for massage appointments in Edmonton, Alberta and USA availability."
        />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">Book Appointment</span>
          <h1>Ready to relax? Text or WhatsApp Katrina Studios today.</h1>
          <p>
            Katrina Studios serves clients in Edmonton, Alberta and also offers
            massage availability in the USA. Message directly for location,
            timing, pricing, and booking details.
          </p>
        </div>
      </section>

      <section className="section contact-page-section">
        <div className="container contact-grid">
          <motion.div
            className="contact-info-card"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <h2>Contact Details</h2>

            <div className="contact-item">
              <MapPin />
              <div>
                <strong>Location</strong>
                <span>Edmonton, Alberta & USA</span>
              </div>
            </div>

            <div className="contact-item">
              <Phone />
              <div>
                <strong>Phone / Text</strong>
                <span>{displayTextPhone}</span>
              </div>
            </div>

            <div className="contact-item">
              <FaWhatsapp />
              <div>
                <strong>WhatsApp</strong>
                <span>{displayWhatsapp}</span>
              </div>
            </div>

            <div className="contact-item">
              <MessageCircle />
              <div>
                <strong>Booking Method</strong>
                <span>WhatsApp and normal text messages</span>
              </div>
            </div>

            <div className="contact-item">
              <Mail />
              <div>
                <strong>Email</strong>
                <span>{emailAddress}</span>
              </div>
            </div>

            <div className="contact-socials">
              <a href={smsLink}>
                <MessageCircle />
                Text Now
              </a>

              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <FaWhatsapp />
                WhatsApp
              </a>

              <a href={`tel:${textPhoneNumber}`}>
                <Phone />
                Call
              </a>

              <a href={`mailto:${emailAddress}`}>
                <Mail />
                Email
              </a>

              <a href={facebookUrl} target="_blank" rel="noreferrer">
                <FaFacebookF />
                Facebook
              </a>

              <a href={instagramUrl} aria-label="Instagram">
                <FaInstagram />
                Instagram
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div>
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>

            <div>
              <label>Phone</label>
              <input type="tel" placeholder="Your phone number" />
            </div>

            <div>
              <label>Preferred Location</label>
              <select>
                <option>Edmonton, Alberta</option>
                <option>USA</option>
              </select>
            </div>

            <div>
              <label>Preferred Session</label>
              <select>
                <option>30 Minute Massage - $100</option>
                <option>60 Minute Massage - $130</option>
                <option>90 Minute Massage - $160</option>
                <option>120 Minute Massage - $190</option>
                <option>All Night Massage - $270</option>
              </select>
            </div>

            <div>
              <label>Message</label>
              <textarea
                rows="6"
                placeholder="Tell us your preferred date, time, location, and session length"
              ></textarea>
            </div>

            <a
              className="btn primary-btn"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              Send WhatsApp Message
            </a>
          </motion.form>
        </div>
      </section>
    </>
  );
}

export default ContactPage;