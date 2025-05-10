// Enum para tamanhos de bebidas
export enum TamanhoBebida {
    Lata = 350,
    Garrafa600 = 600,
    Garrafa1 = 1000,
    Garrafa2 = 2000,
  }
  
  // Enum para tamanhos de pizzas
  export enum TamanhoPizza {
    pequena,
    média,
    grande,
  }
  
  // Enum para tipos de pagamento
  export enum TipoPagamento {
    Pix = "pix",
    Dinheiro = "dinheiro",
    Cartao = "cartao"
  }
  
  // Interface para o cliente
  export interface ClienteDto {
    Cpf: string;
    Nome: string;
    Endereco: string;
    Telefone: string;
  }
  
  // Interface para os itens do pedido
  export interface ItemPedidoDto {
    quantidade: number;
    valor_item: number;
    produtoId: string;
  }
  
  // Interface para o pedido
  export interface PedidoDto {
    valor_total: number;
    cliente: ClienteDto;
    item_pedido: ItemPedidoDto[];
    tipo_pagamento: TipoPagamento;
  }
  
  // Interface para os produtos
  export interface Produto {
    id: string;
    nome: string;
    preco: number;
    tipo: string;
    tamanho?: TamanhoPizza | TamanhoBebida;
  }