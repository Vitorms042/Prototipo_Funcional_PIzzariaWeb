import { Card, CardContent, Typography, Button, Divider  } from "@mui/material";
import { FaPizzaSlice, FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa"; // Ícones para os itens

// Simulação de dados do pedido
const pedido = {
  numero: 12345,
  itens: [
    { nome: "Pizza de Calabresa", valor: 40.0, tamanho: "Grande" },
    { nome: "Refrigerante Coca-Cola", valor: 8.0 },
    { nome: "Cerveja Pilsen", valor: 12.0 },
  ],
  endereco: "Rua das Pizzas, 123 - Centro, Cidade X",
  valorEntrega: 8.0,
  pagamento: "Cartão de Crédito Visa",
  parcelas: 1,
  tempoEstimado: 30, // minutos
};

const ConfirmacaoPedido = () => {
  const totalPedido = pedido.itens.reduce((total, item) => total + item.valor, 0);
  const totalFinal = totalPedido + pedido.valorEntrega;

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 max-w-4xl mx-auto">
      <Card className="w-full p-6 bg-white shadow-xl rounded-lg">
        <CardContent>
          <Typography variant="h5" align="center" color="primary" className="font-bold mb-6">
            Confirmação do Pedido #{pedido.numero}
          </Typography>

          <Typography variant="h6" className="font-semibold text-center mb-6 text-gray-600">
            Seu pedido foi recebido e está sendo preparado!
          </Typography>

          {/* Seção dos Itens do Pedido */}
          <div className="space-y-4">
            {pedido.itens.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 rounded-md p-4 shadow-md">
                <div className="flex items-center space-x-3">
                  <FaPizzaSlice className="text-orange-500 text-2xl" />
                  <Typography className="text-lg font-medium text-gray-700">{item.nome} ({item.tamanho || "Padrão"})</Typography>
                </div>
                <Typography className="text-lg font-semibold text-gray-900">R$ {item.valor.toFixed(2)}</Typography>
              </div>
            ))}
          </div>

          <Divider className="my-4" />

          {/* Endereço de Entrega */}
          <div className="flex items-center space-x-3 mb-4 bg-gray-50 p-4 rounded-md shadow-md">
            <FaMapMarkerAlt className="text-red-600 text-2xl" />
            <Typography className="text-lg font-medium text-gray-700">{pedido.endereco}</Typography>
          </div>

          {/* Forma de pagamento */}
          <div className="flex items-center space-x-3 mb-4 bg-gray-50 p-4 rounded-md shadow-md">
            <FaRegCreditCard className="text-blue-600 text-2xl" />
            <Typography className="text-lg font-medium text-gray-700">
              {pedido.pagamento} (Parcelas: {pedido.parcelas})
            </Typography>
          </div>

          <Divider className="my-4" />

          {/* Tempo de Entrega */}
          <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-md shadow-md">
            <Typography variant="h6" className="font-semibold text-gray-700">Tempo de espera estimado:</Typography>
            <Button variant="contained" color="secondary" className="px-6 py-2">
              {pedido.tempoEstimado} minutos
            </Button>
          </div>

          {/* Valor total do pedido */}
          <div className="flex justify-between items-center mb-6">
            <Typography className="font-semibold text-lg text-gray-700">Total:</Typography>
            <Typography className="font-semibold text-lg text-gray-900">R$ {totalFinal.toFixed(2)}</Typography>
          </div>

          {/* Botão para acompanhamento */}
          <div className="flex justify-center">
            <Button variant="contained" color="primary" size="large" className="w-full py-3 text-xl">
              Acompanhar Pedido
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmacaoPedido;