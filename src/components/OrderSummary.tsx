import { FC } from "react";
import { FaUser, FaClock, FaMapMarkerAlt, FaTruck, FaWhatsapp } from "react-icons/fa"; // Ícones para o pedido

interface ResumoPedidoProps {
  entregador: string;
  tempoEntrega: string;
  status: string;
  endereco: string;
  telefoneEntregador: string; // Telefone do entregador para contato via WhatsApp
}

const ResumoPedido: FC<ResumoPedidoProps> = ({ entregador, tempoEntrega, status, endereco, telefoneEntregador }) => {
  // Função para redirecionar para o WhatsApp
  const handleWhatsAppRedirect = () => {
    const mensagem = encodeURIComponent(
      `Olá, ${entregador}. Estou entrando em contato sobre o pedido que está em atraso. Poderia me informar o status da entrega?`
    );
    window.open(`https://wa.me/${telefoneEntregador}?text=${mensagem}`, "_blank");
  };

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

      {/* Botões de Ação */}
      <div className="flex flex-col space-y-4">
        {/* Botão para acompanhar o pedido */}
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Acompanhar Pedido
        </button>

        {/* Botão para redirecionar para o WhatsApp */}
        <button
          onClick={handleWhatsAppRedirect}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <FaWhatsapp className="w-5 h-5" />
          <span>Pedido atrasado? <br></br>Entre em contato</span>
        </button>
      </div>
    </div>
  );
};

export default ResumoPedido;