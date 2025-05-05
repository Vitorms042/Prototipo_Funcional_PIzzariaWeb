import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";  
import Header from "./components/Header";  
import Footer from "./components/Footer"; 
import { CartProvider } from "./context/CartContext"; 
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider> 
      <CartProvider> 
        <BrowserRouter>
          <Header /> 
            <AppRoutes /> 
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App; 