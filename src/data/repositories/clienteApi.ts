import { ClienteDto } from "../models/models";
import apiConfig from "../../config/apiconfig";

class ClienteApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = apiConfig.baseUrl;
  }

  async createCliente(cliente: ClienteDto) {
    const response = await fetch(`${this.baseUrl}/api/cliente/newCliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar cliente");
    }

    return await response.json(); // <<< Retorna a resposta do servidor
  }

  async clienteLogin(cpf: string, senha: string) {
    const response = await fetch(`${this.baseUrl}/api/cliente/clienteLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf, senha }),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }
  }
}

export default ClienteApi;
