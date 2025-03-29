import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  FileText,
  Shield,
  Settings,
  Info,
  Copy,
  AlertTriangle,
  Scale,
  Mail,
} from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-8">
        <FileText className="h-6 w-6 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">
          Terms and Conditions
        </h1>
      </div>

      <p className="text-gray-500 italic mb-6">Last updated: March 29, 2025</p>

      <ScrollArea className="border rounded-md p-6 bg-gray-50 h-[70vh]">
        <div className="space-y-8 pr-4">
          <Section icon={<Info />} number="1" title="Introduction">
            <p className="text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold">JobHunt</span>. These
              Terms and Conditions govern your use of our website located at{" "}
              <a
                href="https://jobhunt.com"
                className="text-blue-600 hover:underline"
              >
                https://jobhunt.com
              </a>
              . By accessing or using our website, you agree to comply with
              these terms.
            </p>
          </Section>

          <Section icon={<Shield />} number="2" title="Acceptance of Terms">
            <p className="text-gray-700 leading-relaxed">
              By using our website, you confirm that you accept these Terms and
              Conditions and that you agree to comply with them. If you do not
              agree with any part of these terms, you must not use our website.
            </p>
          </Section>

          <Section icon={<Settings />} number="3" title="Changes to Terms">
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be effective immediately upon posting on
              this page. Your continued use of the website after any changes
              constitutes your acceptance of the new Terms and Conditions.
            </p>
          </Section>

          <Section
            icon={<AlertTriangle />}
            number="4"
            title="User Responsibilities"
          >
            <p className="text-gray-700 leading-relaxed">
              You agree to use the website only for lawful purposes and in a way
              that does not infringe the rights of, restrict, or inhibit anyone
              else's use and enjoyment of the website.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
              <li>Respect the privacy and rights of other users</li>
              <li>Do not share false or misleading information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
          </Section>

          <Section icon={<Copy />} number="5" title="Intellectual Property">
            <p className="text-gray-700 leading-relaxed">
              All content, trademarks, and other intellectual property on the
              website are owned by or licensed to{" "}
              <span className="font-semibold">JobHunt</span>. You may not
              reproduce, distribute, or create derivative works from any content
              without our express written permission.
            </p>
          </Section>

          <Section
            icon={<AlertTriangle />}
            number="6"
            title="Limitation of Liability"
          >
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law,{" "}
              <span className="font-semibold">JobHunt</span> shall not be liable
              for any direct, indirect, incidental, special, consequential, or
              punitive damages arising from your use of the website.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-3">
              <p className="text-amber-700 text-sm">
                This limitation of liability applies to all damages of any kind,
                including (without limitation) damages for loss of data or
                profit, or due to business interruption.
              </p>
            </div>
          </Section>

          <Section icon={<Scale />} number="7" title="Governing Law">
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of India. Any disputes arising in
              connection with these terms shall be subject to the exclusive
              jurisdiction of the courts of India.
            </p>
          </Section>

          <Section icon={<Mail />} number="8" title="Contact Information">
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </p>
            <div className="bg-gray-100 p-4 rounded-md mt-3">
              <p className="text-gray-800">
                <span className="font-medium">Email:</span> support@jobhunt.com
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Phone:</span> +91 123 456 7890
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Address:</span> Bhopal, MP, India
              </p>
            </div>
          </Section>
        </div>
      </ScrollArea>

      <div className="mt-8 flex justify-between items-center border-t pt-6">
        <p className="text-sm text-gray-500">
          © 2025 JobHunt. All rights reserved.
        </p>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          I Accept
        </button>
      </div>
    </div>
  );
};

// Reusable section component
const Section = ({ icon, number, title, children }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {number}. {title}
        </h2>
      </div>
      <Separator className="my-3" />
      <div className="pl-11">{children}</div>
    </div>
  );
};

export default TermsOfService;
