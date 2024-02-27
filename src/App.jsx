import React, { useState } from "react";
import Automata from "../src/components/graph"; // Asegúrate de que la ruta sea correcta

function App() {

  const [rfc, setRfc] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validaRfc = (rfc) => {
    const pattern = /^V[EJV]{3}$/i;
    return pattern.test(rfc);
  };

  const handleValidate = () => {
    setIsValid(validaRfc(rfc));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white-200 text-center py-8 px-6 rounded-md shadow-md max-w-md">
        <h1 className="text-3xl font-bold mb-6">Ingrese la combinación del RFC: VEJV</h1>
        <input
          type="text"
          value={rfc}
          onChange={(e) => setRfc(e.target.value)} 
          className="w-full p-3 border border-purple-500 rounded-md mb-6 focus:outline-none focus:border-purple-700"
          placeholder="Escriba VEJV aquí"
        />
        <button
          onClick={handleValidate} // Valida el RFC cuando se hace clic en el botón
          className="w-full bg-pink-500 text-white p-3 rounded-md hover:bg-pink-600 transition duration-300"
        >
          Validar
        </button>
        <div className="mt-6 text-center text-lg">
          {isValid ? (
            <p className="text-green-500">RFC válido</p>
          ) : (
            <p className="text-red-500">RFC inválido</p>
          )}
        </div>
        <div className="mt-6">
          <Automata rfc={rfc} /> {/* Utiliza el componente Automata, pasando el estado 'rfc' como prop */}
        </div>
      </div>
    </div>
  );
}

export default App;