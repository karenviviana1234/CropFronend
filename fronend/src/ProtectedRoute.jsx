import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

function ProtectedRoute() {
  const auth = window.localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false)

  return (
    auth ? <Outlet /> : 
    <Modal isOpen={() => setModalOpen(true)} placement="top-center" >
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <label> ¿No has iniciado sesión? </label>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => setModalOpen(false)}>
                  <Link to={'/iniciosesion'}>
                    Iniciar sesión
                  </Link>
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ProtectedRoute;