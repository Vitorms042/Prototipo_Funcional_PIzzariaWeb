import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";  // Importando as rotas
import Header from "./components/Header";  // Importando o Header
import Footer from "./components/Footer"; // Importando o Footer
import { CartProvider } from "./context/CartContext";  // Importando o CartProvider
import { UserProvider } from "./context/UserContext";  // Importando o UserProvider

function App() {
  return (
    <UserProvider>  {/* Envolvendo a aplicação com o contexto de usuário */}
      <CartProvider>  {/* Envolvendo a aplicação com o contexto de carrinho */}
        <BrowserRouter>
          <Header />  {/* Incluindo o Header na aplicação */}
          <AppRoutes /> {/* Roteamento da aplicação */}
          <Footer /> {/* Incluindo o Footer na aplicação */}
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;