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

        const data = await response.json();
        return { data };
    }


}

export default ProdutoApi;
