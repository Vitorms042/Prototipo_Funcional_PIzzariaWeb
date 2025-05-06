import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Tipos para simulação de dados
interface LocationData {
  latitude: number;
  longitude: number;
}

// Trajeto simulado (pode ser alterado para o trajeto real do pedido)
const route: LocationData[] = [
  { latitude: -23.55052, longitude: -46.633308 }, // São Paulo (início)
  { latitude: -23.55100, longitude: -46.63400 },
  { latitude: -23.55200, longitude: -46.63500 },
  { latitude: -23.55300, longitude: -46.63600 }, // São Paulo (final)
];

const MapLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice para o trajeto

  // Configurações do Google Maps
  const mapContainerStyle = { width: "100%", height: "100%" };
  const center = { lat: route[0].latitude, lng: route[0].longitude };

  // Carregar o script do Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAXSI_iHhtf9Lq4HORJ_YC6FTPWB59Gz78", // Substitua pela sua chave de API
  });

  useEffect(() => {
    // Função para simular o movimento ao longo do trajeto
    const interval = setInterval(() => {
      setLocation(route[currentIndex]); // Atualiza a posição do marcador
      setCurrentIndex((prevIndex) => (prevIndex + 1) % route.length); // Avança no trajeto (volta ao início quando chega ao final)
    }, 3000); // Atualiza a cada 3 segundos (ajustável para simular o tempo de movimento)

    return () => clearInterval(interval); // Limpar o intervalo quando o componente for desmontado
  }, [currentIndex]);

  if (!isLoaded) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {location && (
          <Marker
            position={{ lat: location.latitude, lng: location.longitude }}
            icon={{
              url: "/locationIcon.svg", // Ícone customizado
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapLocation;