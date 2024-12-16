import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 text-center text-white mt-auto">
      <p>© 2024 ArtIDE. Todos los derechos reservados.</p>
      <div className="mt-2">
        <a href="/privacy" className="text-gray-300 hover:text-white mx-2">Política de Privacidad</a>
        <span>|</span>
        <a href="/terms" className="text-gray-300 hover:text-white mx-2">Términos de Servicio</a>
      </div>
    </footer>
  );
};

export default Footer;
