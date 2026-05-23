import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2 text-sm text-gray-500">Effective Date: May 23, 2026</p>

      <p className="mb-6">
        We collect customer information such as phone numbers, billing details, and transaction
        information for billing and WhatsApp notification purposes.
      </p>

      <h2 className="text-xl font-semibold mb-2">How We Use Your Data</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Invoice generation</li>
        <li>Customer communication</li>
        <li>WhatsApp utility messaging</li>
        <li>Service improvement</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
      <p className="mb-6">We do not sell user data to third parties.</p>

      <h2 className="text-xl font-semibold mb-2">Data Storage</h2>
      <p className="mb-6">
        We may store data securely using cloud services and databases for operational purposes.
      </p>

      <h2 className="text-xl font-semibold mb-2">Data Deletion</h2>
      <p className="mb-6">
        Users may request deletion of their data by contacting us at:{' '}
        <a href="mailto:vogue.prism.contact@gmail.com" className="text-blue-600 underline">
          vogue.prism.contact@gmail.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact</h2>
      <p>
        For any questions regarding this Privacy Policy, reach us at:{' '}
        <a href="mailto:vogue.prism.contact@gmail.com" className="text-blue-600 underline">
          vogue.prism.contact@gmail.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
