// src/pages/ContactPage.jsx

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const phoneNumber = "+10000000000";
const displayPhone = "+1 (000) 000-0000";
const emailAddress = "hello@mspixelpulse.com";
const facebookUrl = "#";
const instagramUrl = "#";
const whatsappUrl = "#";

const bookingMessage =
  "Hi MS PixelPulse, I would like to learn more about this wellness studio demo website.";

function ContactPage() {
  const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(bookingMessage)}`;
  const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
    "Wellness Studio Demo Inquiry"
  )}&body=${encodeURIComponent(bookingMessage)}`;

  return (
    <>
      <Helmet>
        <title>Contact | MS PixelPulse Wellness Studio</title>
        <meta
          name="description"
          content="Contact MS PixelPulse Wellness Studio demo using placeholder contact details for a beauty and wellness website template in Toronto, Ontario, Canada."
        />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">Book Appointment</span>
          <h1>Ready to turn this wellness demo into a real business website?</h1>
          <p>
            This contact page uses safe demo details for Toronto, Ontario,
            Canada. Replace the placeholder contact information when adapting the
            template for a real beauty or wellness business.
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
                <span>Toronto, Ontario, Canada</span>
              </div>
            </div>

            <div className="contact-item">
              <Phone />
              <div>
                <strong>Phone / Text</strong>
                <span>{displayPhone}</span>
              </div>
            </div>

            <div className="contact-item">
              <FaWhatsapp />
              <div>
                <strong>WhatsApp</strong>
                <span>{displayPhone}</span>
              </div>
            </div>

            <div className="contact-item">
              <MessageCircle />
              <div>
                <strong>Booking Method</strong>
                <span>Demo contact form, email, or social links</span>
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

              <a href={whatsappUrl} aria-label="WhatsApp">
                <FaWhatsapp />
                WhatsApp
              </a>

              <a href={`tel:${phoneNumber}`}>
                <Phone />
                Call
              </a>

              <a href={emailLink}>
                <Mail />
                Email
              </a>

              <a href={facebookUrl} aria-label="Facebook">
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
                <option>Toronto, Ontario</option>
                <option>Online consultation</option>
              </select>
            </div>

            <div>
              <label>Preferred Service</label>
              <select>
                <option>Relaxation Wellness Session</option>
                <option>Beauty Consultation</option>
                <option>Skin Care Treatment</option>
                <option>Body Care Ritual</option>
                <option>Wellness Package</option>
              </select>
            </div>

            <div>
              <label>Message</label>
              <textarea
                rows="6"
                placeholder="Tell us your preferred date, service, and any questions about this demo website"
              ></textarea>
            </div>

            <a className="btn primary-btn" href={emailLink}>
              Send Demo Inquiry
            </a>
          </motion.form>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
