import { useState } from "react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Privacy Policy Sections
  const sections = [
    {
      title: "Introduction",
      content:
        "Welcome to [Your Company Name]. This Privacy Policy describes how we collect, use, and protect your personal information when you use our website located at [Your Website URL].",
    },
    {
      title: "Information We Collect",
      content:
        "We may collect personal information such as your name, email address, contact details, and browsing behavior when you interact with our website or services.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to provide and improve our services, personalize user experiences, and communicate important updates related to our offerings.",
    },
    {
      title: "Cookies & Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide targeted advertisements.",
    },
    {
      title: "Third-Party Sharing",
      content:
        "We do not sell or share your personal information with third parties, except as required by law or when necessary to provide our services.",
    },
    {
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or destruction.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. Changes will be posted on this page, and your continued use of our services constitutes acceptance of these changes.",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions regarding this Privacy Policy, please contact us at [Your Contact Email].",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl">
      <div className="mb-10 text-center">
        <div className="inline-block px-6 py-2 bg-green-600 text-white rounded-full mb-4">
          Privacy Policy
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Privacy & Policy
        </h1>
        <p className="text-gray-500">Last updated: March 10, 2025</p>
        <div className="mt-6 w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <section
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
              activeSection === index ? "bg-green-50" : "hover:bg-gray-50"
            }`}
            onMouseEnter={() => setActiveSection(index)}
            onMouseLeave={() => setActiveSection(null)}
          >
            <div className="flex items-start mb-4">
              <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mr-4 shrink-0">
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
        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-500 mr-2"
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
            <span className="font-semibold text-green-800">
              Important Notice
            </span>
          </div>
          <p className="text-green-700 text-center">
            By using our website, you consent to the collection and use of your
            information as outlined in this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
