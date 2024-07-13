import React, { useEffect, useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { icono } from "../atoms/IconsAtom";

function RecuperarPasswordUserLogin() {
  const navigate = useNavigate();
  const { errors, tokenPassword, mensaje, back, setBack } = useAuthContext();
  const [correo, setCorreo] = useState("");

  const handleChange = (e) => {
    setCorreo(e.target.value);
  };

  useEffect(() => {
    setBack(false)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tokenPassword({ correo });
      setCorreo("");
    } catch (error) {
      console.error("Error in tokenPassword:", error);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-[#F0F4F8] relative">
      <div className="absolute top-8 left-8 flex items-center">
        <img
          src="./src/assets/isotipo-SubCoffee.png"
          alt="Placeholder Image"
          className="w-12 h-12 mr-2"
        />
        <span className="text-[#39A800] font-bold text-3xl">SubCoffee</span>
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
          <h2 className="text-2xl font-bold mb-6 text-[#39A800] text-center">Restablecer Contraseña</h2>
          <Input
            label=""
            aria-label="correo de usuario"
            variant="bordered"
            placeholder="correo de usuario"
            startContent={icono?.iconoGmail ? <icono.iconoGmail /> : null}
            isRequired
            isClearable
            type="correo"
            value={correo}
            name="correo"
            onChange={handleChange}
            className="border-[#39A800]"
          />
          <div className="flex gap-x-4 w-full justify-center">
            {back ? (
              <Button
                type="button"
                color="default"
                onClick={() => navigate("/")}
                className="text-[#39A800] bg-[#FDFBF6] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#39A800] border-2"
              >
                Volver
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  color="default"
                  onClick={() => navigate("/")}
                  className="text-[#39A800] bg-[#FDFBF6] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#39A800] border-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="text-[#FDFBF6] bg-[#39A800] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#FDFBF6]"
                >
                  Enviar Gmail
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#39A800] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#39A800] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-[#39A800] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  );
}

export default RecuperarPasswordUserLogin;