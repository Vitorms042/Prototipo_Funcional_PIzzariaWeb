import { PedidoDto } from "../models/models";
import apiConfig from "../../config/apiconfig";

class PedidoApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = apiConfig.baseUrl;
  }
  async submitPedido(pedido: PedidoDto) {
    const response = await fetch(`${this.baseUrl}/api/pedido/novoPedido`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      throw new Error("Erro ao registrar pedido");
    }

    return await response.json();
  }

}

export default PedidoApi;
