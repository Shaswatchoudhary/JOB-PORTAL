import React, { useState, useEffect } from "react";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [mounted, setMounted] = useState(false);

  const sections = [
    {
      id: 1,
      title: "Introduction",
      content:
        "Welcome to Shaswat.com. These Terms and Conditions govern your use of our website located at [Your Website URL]. By accessing or using our website, you agree to comply with these terms.",
    },
    {
      id: 2,
      title: "Acceptance of Terms",
      content:
        "By using our website, you confirm that you accept these Terms and Conditions and that you agree to comply with them. If you do not agree with any part of these terms, you must not use our website.",
    },
    {
      id: 3,
      title: "Changes to Terms",
      content:
        "We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the website after any changes constitutes your acceptance of the new Terms and Conditions.",
    },
    {
      id: 4,
      title: "User Responsibilities",
      content:
        "You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.",
    },
    {
      id: 5,
      title: "Intellectual Property",
      content:
        "All content, trademarks, and other intellectual property on the website are owned by or licensed to Shaswat.com. You may not reproduce, distribute, or create derivative works from any content without our express written permission.",
    },
    {
      id: 6,
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, Shaswat.com shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the website.",
    },
    {
      id: 7,
      title: "Governing Law",
      content:
        "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of India.",
    },
    {
      id: 8,
      title: "Contact Information",
      content:
        "If you have any questions about these Terms and Conditions, please contact us at shaswat@jobportal.com.",
    },
  ];

  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8 transition-all duration-500 ease-in-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10 pb-4 border-b-2 border-indigo-100">
        Terms and Conditions
      </h1>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md"
          >
            <button
              className={`w-full p-4 text-left font-semibold text-lg flex justify-between items-center transition-colors duration-300 ${
                activeSection === section.id
                  ? "bg-indigo-100 text-indigo-800"
                  : "bg-gray-50"
              }`}
              onClick={() => toggleSection(section.id)}
            >
              <span>
                {section.id}. {section.title}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  activeSection === section.id ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeSection === section.id
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 bg-white text-gray-700 leading-relaxed">
                <p
                  className={`transform transition-all duration-500 ${
                    activeSection === section.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-10 p-6 bg-indigo-50 rounded-lg text-center transition-all duration-700 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-gray-700 mb-2">
          By using our services, you agree to these Terms and Conditions.
        </p>
        <a
          href="mailto:support@yourwebsite.com"
          className="inline-block mt-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default TermsOfService;
