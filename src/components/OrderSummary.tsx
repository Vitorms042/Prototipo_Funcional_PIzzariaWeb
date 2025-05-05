// ResumoPedido.tsx
import { FC } from "react";
import { FaUser, FaClock, FaMapMarkerAlt, FaTruck } from "react-icons/fa"; // Ícones para o pedido

interface ResumoPedidoProps {
  entregador: string;
  tempoEntrega: string;
  status: string;
  endereco: string;
}

const ResumoPedido: FC<ResumoPedidoProps> = ({ entregador, tempoEntrega, status, endereco }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Resumo do Pedido</h2>

      {/* Seção do Entregador */}
      <div className="flex items-center space-x-4 mb-4">
        <FaUser className="text-blue-600 w-8 h-8" />
        <div>
          <h3 className="font-medium text-gray-700">Entregador</h3>
          <p className="text-gray-600">{entregador}</p>
        </div>
      </div>

      {/* Seção do Tempo de Entrega */}
      <div className="flex items-center space-x-4 mb-4">
        <FaClock className="text-yellow-500 w-8 h-8" />
        <div>
          <h3 className="font-medium text-gray-700">Tempo de Entrega</h3>
          <p className="text-gray-600">{tempoEntrega}</p>
        </div>
      </div>

      {/* Seção do Status */}
      <div className="flex items-center space-x-4 mb-4">
        <FaTruck className="text-green-600 w-8 h-8" />
        <div>
          <h3 className="font-medium text-gray-700">Status</h3>
          <p className="text-gray-600">{status}</p>
        </div>
      </div>

      {/* Seção do Endereço */}
      <div className="flex items-center space-x-4 mb-6">
        <FaMapMarkerAlt className="text-red-600 w-8 h-8" />
        <div>
          <h3 className="font-medium text-gray-700">Endereço</h3>
          <p className="text-gray-600">{endereco}</p>
        </div>
      </div>

      {/* Botão de Ação */}
      <div className="flex justify-center">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Acompanhar Pedido
        </button>
      </div>
    </div>
  );
};

export default ResumoPedido;