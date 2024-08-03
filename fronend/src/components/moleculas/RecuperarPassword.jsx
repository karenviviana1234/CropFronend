import React, { useContext, useEffect, useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PasswordContext from '../../context/PasswordContext.jsx';

function RecuperarPasswordUserLogin() {
  const navigate = useNavigate();
  const { errors, tokenPassword, mensaje,back } = useContext(PasswordContext);
  const [correo, setCorreo] = useState("");

  const handleChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tokenPassword({ correo });
      console.log(correo);
      setCorreo("");
    } catch (error) {
      console.error("Error en tokenPassword:", error);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen  relative">
      <div className="absolute top-8 left-8 flex items-center">
        <img
          src="./src/assets/logoverde.png"
          alt="Placeholder Image"
          className="w-12 h-12 mr-2"
        />
        <span className="text-[#006000] font-bold text-3xl">Crop Link</span>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          {errors && errors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center rounded-md" key={i}>
              {error}
            </div>
          ))}
          {mensaje && (
            <div className="bg-green-500 p-2 text-white text-center rounded-md">
              {mensaje}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-6 text-[#006000] text-center">Restablecer Contraseña</h2>
          <Input
            label=""
            aria-label="Ingrese su Correo"
            variant="bordered"
            placeholder="Ingrese su Correo"
          //  startContent={Icon?.iconoGmail ? <Icon.iconoGmail /> : null}
            isRequired
            isClearable
            type="correo"
            value={correo}
            name="correo"
            onChange={handleChange}
            className="border-[#006000]"
          />
          <div className="flex gap-x-4 w-full justify-center">
              <>
                <Button
                  type="button"
                  color="default"
                  onClick={() => navigate("/iniciosesion")}
                  className="text-[#006000] bg-[#FDFBF6] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#006000] border-2"
                >
                  Volver
                </Button>
                <Button
                  type="submit"
                  className="text-[#FDFBF6] bg-[#006000] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#FDFBF6]">
                  Enviar Gmail
                </Button>
              </>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecuperarPasswordUserLogin;