import React, { useState } from "react";

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
      <div className="bg-white text-center p-10 rounded shadow-md w-90">
        <h1 className="text-3xl font-bold mb-4">Digite las siguientes 4 letras: VEJV</h1>
        <input
          type="text"
          value={rfc}
          onChange={(e) => setRfc(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleValidate}
          className="w-full bg-pink-500 text-white p-2 rounded"
        >
          Validar
        </button>
        <div className="mt-4 text-center text-lg">
          {isValid ? (
            <p className="text-green-500">RFC válido</p>
          ) : (
            <p className="text-red-500">RFC inválido</p>
          )}
        </div>
        <div className="mt-4">
          <img
            src="src/assets/img/automata.png"
            alt="autómata"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default App;