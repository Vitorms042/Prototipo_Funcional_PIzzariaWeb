import { ClienteDto } from "../models/models";
import apiConfig from "../../config/apiconfig";

class ClienteApi {
  private readonly baseUrl: string;
  constructor() {
    this.baseUrl = apiConfig.baseUrl;
  }

  async createCliente(cliente: ClienteDto) {
    const response = await fetch(`${this.baseUrl}/api/cliente/novoCliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      throw new Error("Erro ao registrar novo cliente");
    }

    return await response.json();
  }

  async clienteLogin(cpf: string, senha: string) {
    const response = await fetch(`${this.baseUrl}/api/cliente/clienteLogin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf, senha }),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    const data = await response.json();
    return { data };
  }
}

export default ClienteApi;
