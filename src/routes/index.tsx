import { Route, Routes } from "react-router-dom";

import Home  from "../pages/Home";
import ConfiguracaoPizza  from "../pages/ConfiguraPizza";
import DrinksSetup  from "../pages/DrinkSetup";
import TrackOrder  from "../pages/TrackOrder";
import MapaLocalizacao  from "../pages/MapaLocalizacao" ;
import Pagamento  from "../pages/Pagamento";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/configuracaopizza" element={<ConfiguracaoPizza />} />
      <Route path="/drinkssetup" element={<DrinksSetup />} />
      <Route path="/trackorder" element={<TrackOrder />} />
      <Route path="/mapalocalizacao" element={<MapaLocalizacao />} />
      <Route path="/pagamento" element={<Pagamento />} />
    </Routes>
  );
};

export default AppRoutes;