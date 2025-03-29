import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Shield,
  FileText,
  Database,
  Share2,
  Lock,
  UserCheck,
  RefreshCw,
  Mail,
  Info,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-6 w-6 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
        <p className="text-green-800 text-sm flex items-start">
          <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>
            Your privacy matters to us. This policy describes how JobHunt
            collects, uses, and protects your personal information when you use
            our services.
          </span>
        </p>
      </div>

      <p className="text-gray-500 italic mb-6">Last updated: March 29, 2025</p>

      <ScrollArea className="border rounded-md p-6 bg-gray-50 h-[70vh]">
        <div className="space-y-8 pr-4">
          <Section icon={<FileText />} number="1" title="Introduction">
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy outlines how we collect, use, and protect your
              information when you visit our job portal website. At JobHunt, we
              are committed to ensuring that your privacy is protected and that
              you have a transparent understanding of how your data is handled.
            </p>
          </Section>

          <Section
            icon={<Database />}
            number="2"
            title="Information We Collect"
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Personal Information:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Name",
                    "Email address",
                    "Phone number",
                    "Resume/CV",
                    "Professional experience",
                    "Education details",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center p-2 bg-white rounded border border-gray-200"
                    >
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Usage Data:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "IP address",
                    "Browser type",
                    "Pages visited",
                    "Time spent on pages",
                    "Referring website",
                    "Device information",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center p-2 bg-white rounded border border-gray-200"
                    >
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section
            icon={<Info />}
            number="3"
            title="How We Use Your Information"
          >
            <div className="space-y-2">
              {[
                "To provide and maintain our services",
                "To notify you about changes to our services",
                "To allow you to participate in interactive features",
                "To provide customer support",
                "To gather analysis or valuable information to improve our services",
                "To monitor the usage of our services",
                "To detect, prevent, and address technical issues",
                "To match you with relevant job opportunities",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-2 hover:bg-gray-100 rounded"
                >
                  <div className="flex h-6 w-6 rounded-full bg-gray-200 items-center justify-center text-gray-700 mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<Lock />} number="4" title="Data Security">
            <p className="text-gray-700 leading-relaxed">
              We take the security of your personal information seriously and
              implement appropriate technical and organizational measures to
              protect it. These measures include:
            </p>
            <div className="mt-4 bg-white p-4 rounded-md border border-gray-200">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Encryption of sensitive data
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Regular security assessments
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Secure data storage practices
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Limited access to personal information
                  </span>
                </li>
              </ul>
            </div>
          </Section>

          <Section
            icon={<Share2 />}
            number="5"
            title="Sharing Your Information"
          >
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-md border-l-4 border-blue-400">
                <p className="text-gray-700">
                  <span className="font-medium">Service Providers:</span> Who
                  assist us in operating our website and providing our services
                </p>
              </div>
              <div className="p-3 bg-white rounded-md border-l-4 border-blue-400">
                <p className="text-gray-700">
                  <span className="font-medium">Employers:</span> When you apply
                  for jobs through our platform (with your consent)
                </p>
              </div>
              <div className="p-3 bg-white rounded-md border-l-4 border-blue-400">
                <p className="text-gray-700">
                  <span className="font-medium">Legal Entities:</span> If
                  required by law or to protect our rights
                </p>
              </div>
            </div>
          </Section>

          <Section icon={<UserCheck />} number="6" title="Your Rights">
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <div className="space-y-2">
              {[
                {
                  title: "Access Your Data",
                  desc: "Request a copy of the personal information we have about you",
                },
                {
                  title: "Rectify Your Data",
                  desc: "Request correction of inaccurate or incomplete information",
                },
                {
                  title: "Delete Your Data",
                  desc: "Request deletion of your personal information where applicable",
                },
                {
                  title: "Restrict Processing",
                  desc: "Request limits on how we use your data in certain circumstances",
                },
                {
                  title: "Data Portability",
                  desc: "Request your data in a structured, machine-readable format",
                },
              ].map((right, index) => (
                <div
                  key={index}
                  className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-green-700">{right.title}</h4>
                  <p className="text-sm text-gray-600">{right.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section
            icon={<RefreshCw />}
            number="7"
            title="Changes to This Privacy Policy"
          >
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date at the top of this policy.
            </p>
            <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm">
              We encourage you to review this Privacy Policy periodically for
              any changes.
            </div>
          </Section>

          <Section icon={<Mail />} number="8" title="Contact Us">
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-800">
                <span className="font-medium">Email:</span> privacy@jobhunt.com
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
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Decline
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            Accept Policy
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable section component
const Section = ({ icon, number, title, children }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
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

export default PrivacyPolicy;
