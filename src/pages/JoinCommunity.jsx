import React, { useEffect, useState } from 'react';

// Set your WhatsApp group link here
const WP_GROUP_LINK = 'https://whatsapp.com/channel/0029VbCQYTq0Vyc90ihgHn0U';

export default function JoinCommunity() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = WP_GROUP_LINK;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <img src="/VOGUE_PRISM_white.png" alt="Vogue Prism" className="w-40 mb-8" />

      <h1 className="text-2xl font-bold mb-2">Joining Our Community</h1>
      <p className="text-gray-400 mb-6 text-center">
        You're being redirected to our WhatsApp group in{' '}
        <span className="text-white font-bold">{countdown}</span>s...
      </p>

      <a
        href={WP_GROUP_LINK}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition"
      >
        Join Now
      </a>

      <p className="text-xs text-gray-600 mt-8">© Vogue Prism. No Refund. Exchange Only.</p>
    </div>
  );
}
