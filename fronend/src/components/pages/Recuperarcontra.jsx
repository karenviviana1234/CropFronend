import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../NextUI/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../NextUI/EyeFilledIcon";
import axios from "axios";
import v from "../../styles/variables";

const ResetPassword = () => {
    const [isVisibleNew, setIsVisibleNew] = useState(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
    const [formData, setFormData] = useState({
        correo_user: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
    
        try {
            const response = await axios.put("http://localhost:3000/auth/cambiar", {
                token,
                password: formData.newPassword,
            });
            alert(response.data.message);
            navigate("/");
        } catch (err) {
            console.error(err.response);
            setError(
                err.response.data.message || "Error al restablecer la contraseña"
            );
        }
    };
    

    return (
        <div className='flex items-center flex-col justify-center min-h-screenbg-cover bg-center' style={{ backgroundImage: `url(${v.image18})`, height: '800px',  backgroundRepeat: 'no-repeat' }}>
            <div className="absolute top-8 left-8 flex items-center">
                <img
                    src="./src/assets/imagelogo.png"
                    alt="Placeholder Image"
                    className="w-12 h-12 mr-2"
                />
                <span className="text-[#39A800] font-bold text-3xl">Crop Link</span>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-2xl font-bold mb-6 text-[#39A800] text-center">Restablecer Contraseña</h2>
                    <Input
                        label=""
                        aria-label="Nueva Contraseña"
                        variant="bordered"
                        placeholder="Nueva Contraseña"
                        // startContent={<icono.iconoContraseña />}
                        endContent={
                            <button
                                type="button"
                                onClick={toggleVisibilityNew}
                                className="focus:outline-none"
                            >
                                {isVisibleNew ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisibleNew ? "text" : "password"}
                        value={formData.newPassword}


                        name="newPassword"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label=""
                        aria-label="Confirmar Contraseña"
                        variant="bordered"
                        placeholder="Confirmar Contraseña"
                        // startContent={<icono.iconoContraseña />}
                        endContent={
                            <button
                                type="button"
                                onClick={toggleVisibilityConfirm}
                                className="focus:outline-none"
                            >
                                {isVisibleConfirm ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisibleConfirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="text-[#FDFBF6] bg-[#39A800] h-10 px-8 rounded-lg font-bold flex justify-center items-center border-[#FDFBF6]"
                        >
                            Restablecer Contraseña
                        </Button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default ResetPassword;