import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import AuthModal from "./AuthModal";

import { Avatar, Menu, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Ícone do carrinho

const Header = () => {
  const { itemCount } = useCart();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notification, setNotification] = useState<string | null>(null); // Notificação para o alerta
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
  };

  const handleProtectedNavigation = (path: string) => {
    if (user) {
      navigate(path); // Navega para a rota se o usuário estiver logado
    } else {
      setNotification("Você precisa estar logado para acessar este conteúdo."); // Define a mensagem de notificação
      openModal(); // Abre o modal de login
    }
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/assets/images/logoPizzaria.png"
              alt="Logo Pizzaria"
              className="h-15 w-auto"
            />
          </Link>
        </div>

        {/* Navegação no Desktop */}
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => handleProtectedNavigation("/configuracaopizza")}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Configurar Pizza
          </button>
          <button
            onClick={() => handleProtectedNavigation("/trackorder")}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Acompanhar Pedido
          </button>
          <button
            onClick={() => handleProtectedNavigation("/location")}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Rastrear Pedido
          </button>
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
            <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {itemCount}
            </span>
            <ShoppingCartIcon className="text-gray-600 hover:text-gray-900 w-8 h-8" />
          </button>

          {/* Login / Cadastro ou Informações do usuário */}
          {user ? (
            <div>
              <Button
                onClick={handleUserMenu}
                startIcon={<Avatar src={user.avatar} />}
                className="text-gray-600 hover:text-gray-900"
              >
                {user.email}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => navigate("/profile")}>Minha Conta</MenuItem>
                <MenuItem onClick={() => navigate("/orders")}>Meus Pedidos</MenuItem> {/* Novo item */}
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </div>
          ) : (
            <button
              onClick={openModal}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Fazer login
            </button>
          )}
        </div>
      </div>

      {/* Menu Hambúrguer para dispositivos móveis - visível quando isMenuOpen é true */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-4 py-4 px-6 space-y-6">
          <button
            onClick={() => handleProtectedNavigation("/configuracaopizza")}
            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Configurar Pizza
          </button>
          <button
            onClick={() => handleProtectedNavigation("/trackorder")}
            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Acompanhar Pedido
          </button>
          <button
            onClick={() => handleProtectedNavigation("/location")}
            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Rastrear Pedido
          </button>
        </div>
      )}

      {/* Modal de Login / Cadastro */}
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Notificação */}
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setNotification(null)} severity="warning" sx={{ width: "100%" }}>
          {notification}
        </Alert>
      </Snackbar>
    </header>
  );
};

export default Header;