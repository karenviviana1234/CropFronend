import { createContext, useContext, useEffect, useState } from "react";
import {
  getUser,
  getUserForId,
  createUser,
  updateUser,
  activarUser,
  desactivarUser,
  loginUser,
  updatePasswordUser,
  restartTokenPassword,
  restartPassword
} from "../api/api.users";
import ModalMessage from "../nextui/ModalMessage";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Debes usar AuthProvider en el App')
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([])
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [idUser, setIdUser] = useState([])
  const [onClose, setOnClose] = useState(false)
  const [cerrarModal, setCerrarModal] = useState(false)
  const [back, setBack] = useState(false);

  const getUsers = async () => {
    try {
      const response = await getUser();
      setUsers(response.data.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }

  const getUserID = async (id) => {
    try {
      const response = await getUserForId(id)
      setUser(response.data.data[0]);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }

  const loginUsers = async (dataForm) => {
    try {
      const response = await loginUser(dataForm)
      const { token, user } = response.data;
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }

  const createUsers = async (data) => {
    try {
      const response = await createUser(data)
      if(response.status === 200) {
        getUsers()
        setMensaje(response.data.message)
        setModalMessage(true)
        setOnClose(true)
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }

  const updateUsers = async (id, data) => {
    try {
      const response = await updateUser(id, data)
      if(response.status === 200) {
        getUsers()
        setMensaje(response.data.message)
        setModalMessage(true)
        getUserID(id)
        setOnClose(true)
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const updatePassword = async (id, data) => {
    try {
      const response = await updatePasswordUser(id, data)
      if(response.status === 200) {
        getUsers()
        setMensaje(response.data.message)
        getUserID(id)
        setModalMessage(true)
        setOnClose(true)
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const updateUserActive = async (id) => {
    try {
      const response = await activarUser(id)
      getUsers()
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const updateUserDesactive = async (id) => {
    try {
      const response = await desactivarUser(id)
      getUsers()
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const tokenPassword = async (data) => {
    try {
      const response = await restartTokenPassword(data)
      setMensaje(response.data.message)
      setModalMessage(true)
      setBack(true)
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al procesar la solicitud"]);
    }
  }

  const updatePasswordFinish = async (data) => {
    try {
      const response = await restartPassword(data)
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const logout = () => {
    try {
      localStorage.clear();
      setIsAuthenticated(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        users,
        errors,
        idUser,
        user,
        onClose,
        back, 
        setBack,
        logout,
        setUser,
        setIdUser,
        getUserID,
        setIsAuthenticated,
        loginUsers,
        getUsers,
        createUsers,
        updatePassword,
        updateUsers,
        updateUserActive,
        updateUserDesactive,
        setUsers,
        cerrarModal,
        setCerrarModal,
        tokenPassword,
        updatePasswordFinish
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;