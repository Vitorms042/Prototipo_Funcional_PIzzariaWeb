import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout"; // Novo componente de layout

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;