import { TamanhoPizza } from "./Enum/tamanhoPizza";
import { TipoPagamento } from "./Enum/tipoPagamento";
import { TamanhoBebida } from "./Enum/tamanhoBebida";
import { TipoProduto } from "./Enum/tipoProduto";

interface ClienteDto {
    Cpf: string;
    Nome: string;
    Endereco: string;
    Telefone: string;
}

interface PedidoDto {
    ValorTotal: number;
    Cliente: ClienteDto;
    ItemPedido: ItemPedidoDto[];
    TipoPagamento: TipoPagamento;
}

interface ItemPedidoDto {
    Quantidade: number;
    ValorItem: number;
    IdProduto: string;
}

interface Produto {
    id: string;
    nome: string;
    preco: number;
    tipo: TipoProduto;
    tamanhoPizza?: TamanhoPizza;
    tamanhoBebida?: TamanhoBebida;
}

export type { ClienteDto, PedidoDto, ItemPedidoDto, Produto };