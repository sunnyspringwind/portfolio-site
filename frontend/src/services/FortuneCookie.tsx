// when backend is implemented add an automation for quote from google search

import React, { useState } from 'react';

const fortunes = [
  "It's okay if you don't find beauty. It's okay to give up.",
  "You will find luck in unexpected places.",
  "A thrilling time is in your immediate future.",
  "Be gentle with yourself. You're doing your best.",
  "Great things are coming your way.",
  "Someone will appreciate your quiet effort.",
];

const FortuneCookie: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [broken, setBroken] = useState(false);
  const [fortune, setFortune] = useState('');

  const handleClick = () => {
    if (!broken) {
      setBroken(true);
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
    }
  };

  const reset = () => {
    setVisible(false);
    setBroken(false);
    setFortune('');
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setVisible(true)}
        className="p-2 bg-yellow-400 rounded-md hover:bg-yellow-500 shadow text-pink-600 font-semibold"
      >
        Open Fortune Cookie 🍪
      </button>

      {/* Fortune Cookie Modal */}
      {visible && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] p-6 rounded-xl shadow-lg relative w-80 z-50 text-center">
            <button
              onClick={reset}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            {/* Cookie Image */}
            <img
              src={
                broken
                  ? 'https://cdn-icons-png.flaticon.com/512/1046/1046862.png' // broken cookie
                  : 'https://cdn-icons-png.flaticon.com/512/1046/1046790.png' // whole cookie
              }
              alt="Fortune Cookie"
              onClick={handleClick}
              className="h-24 mx-auto cursor-pointer transition-transform hover:scale-110"
            />

            {/* Fortune Text */}
            {broken && (
              <p className="mt-4 font-medium text-gray-300">
                “{fortune}”
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FortuneCookie;
