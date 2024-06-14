
"use client"
import { useEffect } from 'react';

const DarkModeToggle = () => {
  useEffect(() => {
    const darkModeToggle = document.querySelector('#darkModeToggle');

    const toggleDarkMode = () => {
      document.body.classList.toggle('dark');
    };

    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    return () => {
      if (darkModeToggle) {
        darkModeToggle.removeEventListener('click', toggleDarkMode);
      }
    };
  }, []);

  return (
    <button id="darkModeToggle" className="bg-gray-900 text-white px-4 py-2 rounded">
      Toggle Dark Mode
    </button>
  );
};

export default DarkModeToggle;
