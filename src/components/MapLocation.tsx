import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface LocationData {
  latitude: number;
  longitude: number;
}

const route: LocationData[] = [
  { latitude: -23.55052, longitude: -46.633308 },
  { latitude: -23.551, longitude: -46.634 },
  { latitude: -23.552, longitude: -46.635 },
  { latitude: -23.553, longitude: -46.636 },
];

const MapLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mapContainerStyle = { width: "100%", height: "100%" };
  const center = { lat: route[0].latitude, lng: route[0].longitude };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY || "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLocation(route[currentIndex]);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % route.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  if (!isLoaded) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
        {location && (
          <Marker
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapLocation;