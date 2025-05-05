import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import ConfiguracaoPizza from "../pages/ConfiguraPizza";
import DrinksSetup from "../pages/DrinkSetup";
import TrackOrder from "../pages/TrackOrder";
import MapLocation from "../pages/MapaLocalizacao";
import Pagamento from "../pages/Pagamento";
import UserProfile from "../pages/UserProfile"; // Importa a nova página de perfil
import Orders from "../pages/Orders"; // Importa a nova página de pedidos

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/configuracaopizza" element={<ConfiguracaoPizza />} />
      <Route path="/drinkssetup" element={<DrinksSetup />} />
      <Route path="/trackorder" element={<TrackOrder />} />
      <Route path="/location" element={<MapLocation />} />
      <Route path="/pagamento" element={<Pagamento />} />
      <Route path="/profile" element={<UserProfile />} /> {/* Nova rota */}
      <Route path="/orders" element={<Orders />} /> {/* Nova rota */}
    </Routes>
  );
};

export default AppRoutes;