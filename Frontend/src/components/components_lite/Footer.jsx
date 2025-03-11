import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* Footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f1f1f1",
          borderTop: "2px solid #6A38C2",
        }}
      >
        <p>© 2024 Shaswat Choudhary. All rights reserved.</p>
        <div style={{ margin: "10px 0" }}>
          <p>Contact Me:</p>
          <p>
            <a
              href="mailto:shaswat@example.com"
              style={{ marginRight: "15px" }}
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/shaswatchoudhary/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "15px" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/shaswat"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
        <p>
          <Link to="/PrivacyPolicy">Privacy Policy</Link> |
          <Link to="/TermsofService"> Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
