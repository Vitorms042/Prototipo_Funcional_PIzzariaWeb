import ConfirmacaoPedido from "../components/OrderConfirmed";  // Importando o componente ConfirmacaoPedido

const TrackOrder = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <ConfirmacaoPedido />
      </div>
    </div>
  );
};

export default TrackOrder;
