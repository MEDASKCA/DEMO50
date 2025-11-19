'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden" style={{ background: 'black' }}>
              <img
                src="https://raw.githubusercontent.com/MEDASKCA/OPS/main/logo-medaskca.png"
                alt="MEDASKCA"
                style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen' }}
              />
            </div>
            <h1 className="text-3xl font-bold">MEDASKCA</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-300">Non-Disclosure Agreement</h2>
          <p className="text-sm text-gray-500 mt-2">Last updated: November 2024</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h3 className="text-xl font-semibold text-white mb-3">1. Purpose</h3>
            <p>
              This Non-Disclosure Agreement ("Agreement") is entered into between MEDASKCA and you ("Recipient")
              to protect confidential and proprietary information disclosed through this demonstration platform.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">2. Confidential Information</h3>
            <p className="mb-2">
              "Confidential Information" includes but is not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Software features, functionality, and technical specifications</li>
              <li>Business strategies, operational workflows, and methodologies</li>
              <li>User interface designs and user experience elements</li>
              <li>Data models, algorithms, and analytical approaches</li>
              <li>Any information marked as confidential or proprietary</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">3. Obligations</h3>
            <p className="mb-2">
              The Recipient agrees to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maintain the confidentiality of all disclosed information</li>
              <li>Use the information solely for evaluation purposes in connection with the NHS Clinical Entrepreneur Programme</li>
              <li>Not disclose, copy, distribute, or transmit any Confidential Information without prior written consent</li>
              <li>Protect the information with at least the same degree of care used for their own confidential information</li>
              <li>Not reverse engineer, decompile, or attempt to derive source code from the software</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">4. Exceptions</h3>
            <p className="mb-2">
              This Agreement does not apply to information that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Is or becomes publicly available through no breach of this Agreement</li>
              <li>Was rightfully in the Recipient's possession prior to disclosure</li>
              <li>Is independently developed by the Recipient without use of Confidential Information</li>
              <li>Must be disclosed by law or court order (with prior notice to MEDASKCA where possible)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">5. NHS Context</h3>
            <p>
              This demonstration is provided as part of the NHS Clinical Entrepreneur Programme.
              Any patient data, clinical scenarios, or operational information presented is simulated
              and anonymized for demonstration purposes only. No real patient information is used.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">6. Data Protection</h3>
            <p>
              MEDASKCA is committed to compliance with UK GDPR, NHS Data Security and Protection Toolkit (DSPT),
              and all applicable healthcare data protection regulations. All demonstration data is stored securely
              with UK data residency and encryption in transit and at rest.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">7. Term and Termination</h3>
            <p>
              This Agreement remains in effect for the duration of your access to the platform and for a period
              of two (2) years thereafter. Confidentiality obligations survive termination of this Agreement.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">8. Contact</h3>
            <p>
              For questions regarding this Agreement or to request permission to use Confidential Information,
              please contact: <span className="text-cyan-400">legal@medaskca.com</span>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <p className="text-center text-sm text-gray-500">
            © 2024 MEDASKCA. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-600 mt-2">
            Demo for NHS Clinical Entrepreneur Programme
          </p>
        </div>
      </div>
    </div>
  );
}
