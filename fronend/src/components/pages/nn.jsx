import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { RiSettings4Line, RiPlantFill } from "react-icons/ri";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { MdDashboard, MdOutlineCoffeeMaker } from "react-icons/md";
import { GiCoffeeCup, GiFarmTractor } from "react-icons/gi";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoIosPaper } from "react-icons/io";
import { BsCardChecklist } from "react-icons/bs";
import { IoDocuments } from "react-icons/io5";
import { FaX } from "react-icons/fa6";
import Control from './../../assets/control.png'
import logo from './../../assets/icons/logoHeader.jpeg'


export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [sidebar, setSidebar] = useState(false)

  const stored = localStorage.getItem('user')
  const user = stored ? JSON.parse(stored) : null

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebar(false);
      } else {
        setSidebar(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);

  const Menus = [
    { title: "Dashboard", link: "/dashboard", icon: MdDashboard },
    { title: "Usuarios", link: "/usuarios", icon: AiOutlineUser },
    { title: "Cultivos", link: "/cultivos", icon: GiFarmTractor},
    { title: "Variedades", link: "/variedades", icon: GiCoffeeCup },
    { title: "Muestras", link: "/muestras", icon: BiSolidCoffeeBean},
    { title: "Análisis", link: "/analisis", icon: MdOutlineCoffeeMaker},
    { title: "Variables", link: "/variables", icon: IoIosPaper},
    { title: "Resultados", link: "/resultados", icon: BsCardChecklist},
    { title: "Sensorial", link: "/sensorial", icon: BsCardChecklist},
    { title: "Reportes", link: "/reportes", icon: IoDocuments}
];
const MenusCatador = [
  { title: "Dashboard", link: "/dashboard", icon: MdDashboard },
  { title: "Resultados", link: "/resultadosCatador", icon: BsCardChecklist},
  { title: "Sensorial", link: "/resultadosSensorial", icon: BsCardChecklist},
  { title: "Reportes", link: "/reportes", icon: IoDocuments}
];

  return (
    <>
      <div className="flex min-h-screen z-10">
        {sidebar ? (
          <div
          className={`${open ? "w-56" : "w-20"
            } bg-[#273468] max-h-full p-5 pt-5 h-full fixed duration-300`}
        >
          <img
            src={Control}
            className={`absolute cursor-pointer -right-3 mt-11 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className={`flex items-center`}>
          <img
            src={logo}
            className={`cursor-pointer duration-500 h-10 w-10 rounded-full ${open ? "rotate-[360deg] w-20 h-20 rounded-full" : ""}`}
          />
          <h1
            className={`text-[#fff] origin-left ml-2 font-bold  text-xl duration-200 overflow-hidden whitespace-nowrap ${
              !open && "scale-0 flex flex-col"
            }`}
            style={{ maxWidth: "calc(100% - 4rem)" }}
            title="Madac-coffee"
          >
            <span className="flex"> MADAC - </span>
            <span className="flex"> Coffee </span>
          </h1>
          </div>
          <ul className="pt-6">
            { user.tipo_usuario === 'admin' ? Menus.map((Menu, index) => (
              <Link
                to={Menu?.link}
                key={index}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#EAEDF6] text-white hover:text-black text-lg font-bold items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"
                  } ${activeLink === Menu.link ? "border-2 border-[#EAEDF6]" : ""}`}
              >
                <div>{React.createElement(Menu?.icon, { size: "20"  })}</div>
                <span
                  className={`${!open && "hidden"}
                         origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            )) : MenusCatador.map((Menu, index) => (
              <Link
                to={Menu?.link}
                key={index}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#EAEDF6] text-white hover:text-black text-lg font-bold items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"
              } ${activeLink === Menu.link ? "border-2 border-[#EAEDF6]" : ""}`}
              >
                <div>{React.createElement(Menu?.icon, { size: "20" })}</div>
                <span
                  className={`${!open && "hidden"}
                         origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            ))}
          </ul>
          <div className="flex justify-center items-center my-5 sm:hidden">
          
          </div>
        </div>
        ) : []}
      </div>
    </>
  );
};