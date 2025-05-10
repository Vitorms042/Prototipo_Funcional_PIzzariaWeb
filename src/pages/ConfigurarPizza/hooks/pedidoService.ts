import { useCallback, useState } from "react";
import PedidoApi from "../../../data/repositories/pedidoApi";
import ProdutoApi from "../../../data/repositories/produtoApi";
import { PedidoDto } from "../../../data/models/models";

const usePedidoService = () => {
  const [PedidoService] = useState(() => new PedidoApi());
  const [ProdutoService] = useState(() => new ProdutoApi());

  const getProdutos = useCallback(async () => {
    try {
      const { data } = await ProdutoService.getProdutos();
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }, [ProdutoService]);

    const submitPedido = useCallback(async (pedido: PedidoDto) => {
        try {
            const  response  = await PedidoService.submitPedido(pedido);
            return response;
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            throw error;
        }
    },
    [PedidoService]
  );

  return {
    getProdutos,
    submitPedido,
  };
};

export default usePedidoService;
