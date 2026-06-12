// src/components/Pricing.jsx

import { motion } from "framer-motion";
import { Clock, Moon, Sparkles } from "lucide-react";

function Pricing() {
  const pricing = [
    {
      icon: Clock,
      title: "Starter Wellness Session",
      price: "$100",
      text: "A quick self-care option for clients who want a simple wellness visit.",
    },
    {
      icon: Sparkles,
      title: "Signature Beauty Service",
      price: "$130",
      text: "A balanced studio service designed for relaxation, beauty, and care.",
    },
    {
      icon: Sparkles,
      title: "Premium Wellness Package",
      price: "$160",
      text: "A complete package for clients who want a longer, more premium experience.",
    },
    {
      icon: Sparkles,
      title: "Luxury Studio Ritual",
      price: "$190",
      text: "An extended beauty and wellness service for a more elevated visit.",
    },
    {
      icon: Moon,
      title: "Custom Self-Care Package",
      price: "$270",
      text: "A flexible package option that can be customized for real studio needs.",
    },
  ];

  return (
    <section className="section pricing-section">
      <div className="container">
        <div className="section-heading center">
          <span className="section-kicker">Demo Pricing</span>
          <h2>Simple, clear pricing for beauty and wellness services.</h2>
          <p>
            Use this pricing section to present service packages in a clean,
            trustworthy, and easy-to-scan format.
          </p>
        </div>

        <div className="pricing-grid pricing-grid-large">
          {pricing.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                className={index === 2 ? "pricing-card featured-price" : "pricing-card"}
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Icon size={30} />
                <h3>{item.title}</h3>
                <strong>{item.price}</strong>
                <p>{item.text}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="pricing-note">
          For demo inquiries and availability, contact{" "}
          <a href="mailto:hello@mspixelpulse.com">hello@mspixelpulse.com</a>.
        </p>
      </div>
    </section>
  );
}

export default Pricing;
