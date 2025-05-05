import MapLocation from "../components/MapLocation"; // Importando o componente do mapa
import ResumoPedido from "../components/OrderSummary"; // Importando o componente de resumo do pedido

const MapaLocalizacao = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-center px-4 py-4 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Resumo do Pedido */}
      <div className="lg:w-1/4 w-full">
        <ResumoPedido
          entregador="João da Silva"
          tempoEntrega="30-40 minutos"
          status="Em andamento"
          endereco="Rua das Flores, 123, Centro, SP"
        />
      </div>

      {/* Mapa */}
      <div className="lg:w-3/4 w-full h-96">
        <MapLocation />
      </div>
    </div>
  );
};

export default MapaLocalizacao;