import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Divider, CircularProgress, Box } from "@mui/material";
import { FaPizzaSlice, FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { PedidoDto, Produto, TamanhoPizza, TipoPagamento, TamanhoBebida } from "../types/PedidoTypes"; // Ajuste o caminho conforme necessário
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate

// Simulação de dados do "back-end"
const pedidosMock: PedidoDto[] = [
  {
    valor_total: 68.0,
    cliente: {
      Cpf: "123.456.789-00",
      Nome: "João Silva",
      Endereco: "Rua das Pizzas, 123 - Centro, Cidade X",
      Telefone: "(11) 98765-4321",
    },
    item_pedido: [
      { quantidade: 1, valor_item: 40.0, produtoId: "1" },
      { quantidade: 2, valor_item: 8.0, produtoId: "2" },
      { quantidade: 1, valor_item: 12.0, produtoId: "3" },
    ],
    tipo_pagamento: TipoPagamento.Cartao,
  },
];

// Simulação de produtos
const produtosMock: Produto[] = [
  { id: "1", nome: "Pizza de Calabresa", preco: 40.0, tipo: "pizza", tamanho: TamanhoPizza.grande },
  { id: "2", nome: "Refrigerante Coca-Cola", preco: 8.0, tipo: "bebida", tamanho: TamanhoBebida.Lata },
  { id: "3", nome: "Cerveja Pilsen", preco: 12.0, tipo: "bebida" },
];

const OrderConfirmed = () => {
  const [pedido, setPedido] = useState<PedidoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  // Simula a busca de pedidos no "back-end"
  useEffect(() => {
    setTimeout(() => {
      setPedido(pedidosMock[0]); // Simula o retorno do pedido do cliente
      setLoading(false);
    }, 1000); // Simula um atraso na resposta
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!pedido) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          textAlign: "center",
          padding: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Nenhum pedido em aberto encontrado.
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
          Parece que você ainda não fez nenhum pedido. Que tal começar agora?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.href = "/ConfiguraPizza"}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "10px 20px" }}
        >
          Fazer um Pedido
        </Button>
      </Box>
    );
  }

  const renderProduto = (produtoId: string) => {
    const produto = produtosMock.find((p) => p.id === produtoId);
    if (!produto) return "Produto não encontrado";
    return `${produto.nome} ${produto.tamanho !== undefined ? `(${produto.tamanho})` : ""}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          padding: 4,
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" color="primary" sx={{ fontWeight: "bold", mb: 4 }}>
            Confirmação do Pedido
          </Typography>

          <Typography variant="h6" align="center" sx={{ fontWeight: "medium", color: "#555", mb: 4 }}>
            Seu pedido foi recebido e está sendo preparado!
          </Typography>

          {/* Seção dos Itens do Pedido */}
          <Box sx={{ mb: 4 }}>
            {pedido.item_pedido.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  padding: 2,
                  mb: 2,
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <FaPizzaSlice className="text-orange-500 text-2xl" />
                  <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                    {renderProduto(item.produtoId)}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                  R$ {(item.valor_item * item.quantidade).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Endereço de Entrega */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <FaMapMarkerAlt className="text-red-600 text-2xl" />
            <Typography sx={{ fontWeight: "medium", color: "#555" }}>
              {pedido.cliente.Endereco}
            </Typography>
          </Box>

          {/* Forma de Pagamento */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <FaRegCreditCard className="text-blue-600 text-2xl" />
            <Typography sx={{ fontWeight: "medium", color: "#555" }}>
              {pedido.tipo_pagamento}
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Valor Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography sx={{ fontWeight: "bold", color: "#555" }}>Total:</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#333" }}>R$ {pedido.valor_total.toFixed(2)}</Typography>
          </Box>

          {/* Botão para Acompanhar Pedido */}
          <Box sx={{ textAlign: "center" }}>
          <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ textTransform: "none", fontWeight: "bold", padding: "10px 20px" }}
              onClick={() => navigate("/location")} // Redireciona para a tela Location
            >
              Rastrear Pedido
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderConfirmed;