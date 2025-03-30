import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
        Privacy Policy for Job Portal
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This Privacy Policy outlines how we collect, use, and protect your
          information when you visit our job portal website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          2. Information We Collect
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Personal Information:
            </h3>
            <ul className="list-disc pl-8 text-gray-700 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Resume/CV</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Usage Data:
            </h3>
            <ul className="list-disc pl-8 text-gray-700 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          3. How We Use Your Information
        </h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <ul className="list-disc pl-8 text-gray-700 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our services
            </li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          4. Data Security
        </h2>
        <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          We take the security of your personal information seriously and
          implement appropriate technical and organizational measures to protect
          it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          5. Sharing Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We do not sell or rent your personal information to third parties. We
          may share your information with:
        </p>
        <ul className="list-disc pl-8 text-gray-700 space-y-2">
          <li>Service providers who assist us in operating our website</li>
          <li>Law enforcement agencies if required by law</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          6. Your Rights
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You have the right to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-blue-600 font-medium mb-2">Access</div>
            <div className="text-gray-600">
              Access your personal information
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-blue-600 font-medium mb-2">Correct</div>
            <div className="text-gray-600">
              Request correction of your personal information
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-blue-600 font-medium mb-2">Delete</div>
            <div className="text-gray-600">
              Request deletion of your personal information
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          7. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          8. Contact Us
        </h2>
        <div className="bg-gray-100 p-6 rounded-md text-center">
          <p className="text-gray-700 mb-3">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <a
            href="mailto:support@jobportal.com"
            className="text-blue-600 font-medium hover:underline"
          >
            support@jobportal.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
