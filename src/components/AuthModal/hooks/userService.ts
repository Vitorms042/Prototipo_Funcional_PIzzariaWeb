import { useCallback, useState } from "react";
import { ClienteDto } from "../../../data/models/models";
import ClienteApi from "../../../data/repositories/clienteApi";


const useUserService = () => {
  const [ClienteService] = useState(() => new ClienteApi());

  const createCliente = useCallback(
    async (cliente: ClienteDto) => {
      try {
        const { response } = await ClienteService.createCliente(cliente);
        return response.data;
      } catch (error) {
        console.error("Erro ao criar pedido:", error);
        throw error;
      }
    },
    [ClienteService]
  );

  const clienteLogin = useCallback(async (cpf : string, senha: string) => {
    try {
      const { data } = await ClienteService.clienteLogin(cpf, senha);
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }, [ClienteService]);

  return {
    createCliente,
    clienteLogin,
  };
};

export default useUserService;
