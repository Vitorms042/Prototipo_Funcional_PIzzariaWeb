import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importando o contexto do carrinho
import { useUser } from "../context/UserContext"; // Importando o contexto do usuário
import AuthModal from "./AuthModal"; // Importando o modal

import { Avatar, Menu, MenuItem, Button } from "@mui/material";

const Header = () => {
  const { itemCount } = useCart(); // Obtendo o número de itens no carrinho
  const { user, logout } = useUser(); // Obtendo o usuário logado e função de logout
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu hambúrguer
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla o modal de login

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado para o menu dropdown

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para abrir o modal de login
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal de login
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para abrir o menu de usuário
  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu de usuário
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout
    handleCloseMenu(); // Fecha o menu após o logout
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-blue-600 hover:text-blue-700 transition-all">
          <Link to="/">Pizzaria</Link>
        </div>

        {/* Navegação no Desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/configuracaopizza" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Configurar Pizza
          </Link>
          <Link to="/drinkssetup" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Bebidas
          </Link>
          <Link to="/trackorder" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Rastreamento
          </Link>
        </nav>

        {/* Menu Hambúrguer para dispositivos móveis */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Ações (Carrinho e Login/Cadastro ou Info do usuário) */}
        <div className="flex items-center space-x-6">
          {/* Botão de Carrinho */}
          <button className="relative flex items-center justify-center transition-transform transform hover:scale-110">
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {itemCount}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-600 hover:text-gray-900 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18l-1.5 9h-15L3 3z"
              />
            </svg>
          </button>

          {/* Login / Cadastro ou Informações do usuário */}
          {user ? (
            <div>
              <Button
                onClick={handleUserMenu}
                startIcon={<Avatar src={user.avatar} />}
                className="text-gray-600 hover:text-gray-900"
              >
                {user.name}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Minha Conta</MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </div>
          ) : (
            <button
              onClick={openModal}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Login / Cadastro
            </button>
          )}
        </div>
      </div>

      {/* Menu Hambúrguer para dispositivos móveis - visível quando isMenuOpen é true */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-4 py-4 px-6 space-y-6">
          <Link
            to="/configuracaopizza"
            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Configurar Pizza
          </Link>
          <Link
            to="/drinkssetup"
            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Bebidas
          </Link>
          <Link
            to="/trackorder"
            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Rastreamento
          </Link>
        </div>
      )}

      {/* Modal de Login / Cadastro */}
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;