import Link from "next/link";
import { useState } from "react";

const MenuMobile = () => {
    const [isOpen, setIsOpen] = useState(false); // Funcion para abrir y cerrar el menu, se inicializa con false
    return (
        <div className="md:hidden">
            <div className="flex flex-col gap-[4.5px] cursor-pointer" 
                onClick={() => setIsOpen((prev) => !prev)}> 
                {/* Cada vez que se hace click se cambia el estado de isOpen, si es true se cierra, si es false se abre */}
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${
                    isOpen ? "rotate-45" : ""   
                } origin-left ease-in-out duration-500`}
                />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${
                    isOpen ? "opacity-0" : ""   
                } ease-in-out duration-500`}
                />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${
                    isOpen ? "-rotate-45" : ""   
                } origin-left ease-in-out duration-500`}
                />
            </div>
            {isOpen && ( // Si el menu esta abierto se muestra el menu
            <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
                <Link href="/">Home</Link>
                <Link href="">Login/Register</Link>
                <Link href=""></Link>
                <Link href=""></Link>
            </div>
            )}
        </div>
    );
};

export default MenuMobile;