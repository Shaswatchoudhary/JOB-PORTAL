import { useState, useEffect } from "react";

const PrivacyPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setIsVisible(true);
  }, []);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 1,
      title: "Introduction",
      content:
        "This Privacy Policy outlines how we collect, use, and protect your information when you visit our job portal website.",
      type: "text",
    },
    {
      id: 2,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information:",
          items: ["Name", "Email address", "Phone number", "Resume/CV"],
        },
        {
          subtitle: "Usage Data:",
          items: [
            "IP address",
            "Browser type",
            "Pages visited",
            "Time spent on pages",
          ],
        },
      ],
      type: "list-group",
    },
    {
      id: 3,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To notify you about changes to our services",
        "To allow you to participate in interactive features",
        "To provide customer support",
        "To gather analysis or valuable information so that we can improve our services",
        "To monitor the usage of our services",
        "To detect, prevent, and address technical issues",
      ],
      type: "list",
    },
    {
      id: 4,
      title: "Data Security",
      content:
        "We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it.",
      type: "highlight",
    },
    {
      id: 5,
      title: "Sharing Your Information",
      content: {
        text: "We do not sell or rent your personal information to third parties. We may share your information with:",
        items: [
          "Service providers who assist us in operating our website",
          "Law enforcement agencies if required by law",
        ],
      },
      type: "text-list",
    },
    {
      id: 6,
      title: "Your Rights",
      content: [
        {
          title: "Access",
          description: "Access your personal information",
        },
        {
          title: "Correct",
          description: "Request correction of your personal information",
        },
        {
          title: "Delete",
          description: "Request deletion of your personal information",
        },
      ],
      type: "cards",
    },
    {
      id: 7,
      title: "Changes to This Privacy Policy",
      content:
        "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      type: "text",
    },
    {
      id: 8,
      title: "Contact Us",
      content: {
        text: "If you have any questions about this Privacy Policy, please contact us at:",
        email: "shaswat@jobportal.com",
      },
      type: "contact",
    },
  ];

  // Function to render different section types
  const renderSectionContent = (section) => {
    const isActive = activeSection === section.id;

    switch (section.type) {
      case "text":
        return (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p
              className={`text-gray-700 leading-relaxed p-4 transform transition-all duration-500 ${
                isActive ? "translate-y-0" : "translate-y-8"
              }`}
            >
              {section.content}
            </p>
          </div>
        );

      case "list-group":
        return (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-4 p-4">
              {section.content.map((group, idx) => (
                <div
                  key={idx}
                  className={`bg-gray-50 p-4 rounded-md transform transition-all duration-500 delay-${
                    idx * 100
                  } ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {group.subtitle}
                  </h3>
                  <ul className="list-disc pl-8 text-gray-700 space-y-1">
                    {group.items.map((item, i) => (
                      <li
                        key={i}
                        className={`transition-all duration-300 delay-${
                          i * 50 + 150
                        } ${isActive ? "opacity-100" : "opacity-0"}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case "list":
        return (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4">
              <ul className="list-disc pl-8 text-gray-700 space-y-2 bg-gray-50 p-4 rounded-md">
                {section.content.map((item, i) => (
                  <li
                    key={i}
                    className={`transform transition-all duration-300 delay-${
                      i * 50
                    } ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "highlight":
        return (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p
              className={`text-gray-700 leading-relaxed bg-blue-50 p-4 m-4 rounded-md border-l-4 border-blue-500 transform transition-all duration-500 ${
                isActive ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
              }`}
            >
              {section.content}
            </p>
          </div>
        );

      case "text-list":
        return (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4">
              <p
                className={`text-gray-700 leading-relaxed mb-4 transition-all duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {section.content.text}
              </p>
              <ul className="list-disc pl-8 text-gray-700 space-y-2">
                {section.content.items.map((item, i) => (
                  <li
                    key={i}
                    className={`transition-all duration-300 delay-${
                      i * 200 + 150
                    } ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "cards":
        return (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4">
              <p
                className={`text-gray-700 leading-relaxed mb-4 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                You have the right to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {section.content.map((card, i) => (
                  <div
                    key={i}
                    className={`bg-gray-50 p-4 rounded-md text-center transform transition-all duration-500 delay-${
                      i * 100
                    } ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="text-blue-600 font-medium mb-2">
                      {card.title}
                    </div>
                    <div className="text-gray-600">{card.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`bg-gray-100 p-6 m-4 rounded-md text-center transform transition-all duration-500 ${
                isActive ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
              }`}
            >
              <p className="text-gray-700 mb-3">{section.content.text}</p>
              <a
                href={`mailto:${section.content.email}`}
                className="text-blue-600 font-medium hover:underline inline-block transition-all duration-300 hover:text-blue-800 hover:scale-105"
              >
                {section.content.email}
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8 transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <h1
        className={`text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        Privacy Policy for Job Portal
      </h1>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-md delay-${
              index * 100
            } ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button
              className={`w-full p-4 text-left font-semibold flex justify-between items-center transition-colors duration-300 ${
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700"
                  : "bg-gray-50 text-gray-800"
              }`}
              onClick={() => toggleSection(section.id)}
            >
              <span className="text-xl">
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

            {renderSectionContent(section)}
          </div>
        ))}
      </div>

      <div
        className={`mt-10 text-center transition-all duration-700 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-gray-500">Last updated: March 30, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
