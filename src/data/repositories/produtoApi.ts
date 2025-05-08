import { ClienteDto } from "../models/models";
import apiConfig from "../../config/apiconfig";

class ProdutoApi {
    private baseUrl: string;
    constructor() {
        this.baseUrl = apiConfig.baseUrl;
    }
    async getProdutos() {
        const response = await fetch(`${this.baseUrl}/api/produto/getProdutos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        return await response.json(); // <<< Retorna a resposta do servidor
    }

}

export default ProdutoApi;
