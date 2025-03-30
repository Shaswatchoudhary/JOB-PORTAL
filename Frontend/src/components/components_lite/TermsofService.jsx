import React, { useState } from 'react';
const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Section data
  const sections = [
    {
      title: "Introduction",
      content:
        "Welcome to [Your Website Name]. These Terms and Conditions govern your use of our website located at [Your Website URL]. By accessing or using our website, you agree to comply with these terms.",
    },
    {
      title: "Acceptance of Terms",
      content:
        "By using our website, you confirm that you accept these Terms and Conditions and that you agree to comply with them. If you do not agree with any part of these terms, you must not use our website.",
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the website after any changes constitutes your acceptance of the new Terms and Conditions.",
    },
    {
      title: "User Responsibilities",
      content:
        "You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content, trademarks, and other intellectual property on the website are owned by or licensed to [Your Website Name]. You may not reproduce, distribute, or create derivative works from any content without our express written permission.",
    },
    {
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, [Your Website Name] shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the website.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions about these Terms and Conditions, please contact us at [Your Contact Information].",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl">
      <div className="mb-10 text-center">
        <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full mb-4 transform">
          Terms &amp; Conditions
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Terms of Service
        </h1>
        <p className="text-gray-500">Last updated: March 10, 2025</p>
        <div className="mt-6 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <section
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
              activeSection === index ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
            onMouseEnter={() => setActiveSection(index)}
            onMouseLeave={() => setActiveSection(null)}
          >
            <div className="flex items-start mb-4">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mr-4 shrink-0">
                {index + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {section.title}
              </h2>
            </div>
            <div className="ml-14">
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-gray-200">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold text-blue-800">
              Important Notice
            </span>
          </div>
          <p className="text-blue-700 text-center">
            By continuing to use our services, you acknowledge that you have
            read and understood these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
