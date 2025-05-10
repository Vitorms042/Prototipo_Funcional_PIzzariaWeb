import React, { useCallback, useEffect, useState } from "react";
import { ItemPedidoDto, PedidoDto, Produto } from "../../data/models/models";
import { TamanhoPizza } from "../../data/models/Enum/tamanhoPizza";
import { TamanhoBebida } from "../../data/models/Enum/tamanhoBebida";
import { TipoPagamento } from "../../data/models/Enum/tipoPagamento";
import pizzaImg from "../../assets/imgs/pizza.png";
import drinkImg from "../../assets/imgs/drinks-removebg-preview.png";
import {
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { ShoppingCart, Pizza, CupSoda } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import usePedidoService from "./hooks/pedidoService";
import PersonIcon from '@mui/icons-material/Person';
import { TipoProduto } from "../../data/models/Enum/tipoProduto";
import { useNavigate } from "react-router-dom";

const PizzaOrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pizzas, setPizzas] = useState<Produto[]>([]);
  const [bebidas, setBebidas] = useState<Produto[]>([]);
  const [pedido, setPedido] = useState<PedidoDto>();
  const [itemPedido, setItemPedido] = useState<ItemPedidoDto[]>([]);
  const [pizzaSizes, setPizzaSizes] = useState<TamanhoPizza[]>([]);
  const [pedidoId, setPedidoId] = useState<string>("");

  const [selectedPizzaName, setSelectedPizzaName] = useState<string>("");
  const [pizzaQuantity, setPizzaQuantity] = useState<number>(1);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<TamanhoPizza>(2);

  const [selectedDrinkId, setSelectedDrinkId] = useState<string>("");
  const [drinkQuantity, setDrinkQuantity] = useState<number>(1);

  const [clienteCpf, setClienteCpf] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [clienteEndereco, setClienteEndereco] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [clienteSenha, setClienteSenha] = useState("senha123");

  // Tipo de pagamento
  const [tipoPagamento, setTipoPagamento] = useState<TipoPagamento>(
    TipoPagamento.Pix
  );
  const [uniquePizzaNames, setUniquePizzaNames] = useState<string[]>([]);
  const { getProdutos, submitPedido } = usePedidoService();

  const loadProdutos = useCallback(async () => {
    const produtos = await getProdutos();
    if (!produtos) return;

    setProdutos(produtos);

    // Filtrar por tipo
    const pizzas = produtos.filter((p: Produto) => p.tipo === TipoProduto.Pizza);
    const bebidas = produtos.filter((p: Produto) => p.tipo === TipoProduto.Bebida);

    setPizzas(pizzas);
    setBebidas(bebidas);

    // Agrupar nomes únicos
    const uniquePizzaNames: string[] = Array.from(new Set(pizzas.map((p: Produto) => p.nome)));

    setUniquePizzaNames(uniquePizzaNames); // Exibição

    setPizzaSizes(
      Array.from(
        new Set(
          produtos
            .filter((p: Produto) => p.tipo === 0)
            .map((p: Produto) => p.tamanhoPizza!)
        )
      )
    );
  }, [getProdutos]);

  // Função para buscar o produto selecionado pelo nome e tamanho
  function getProdutoSelecionado(nome: string, tamanho: string | number, tipo: TipoProduto): Produto | undefined {
    const lista = tipo === TipoProduto.Pizza ? pizzas : bebidas;
    return lista.find(p =>
      p.nome === nome &&
      (tipo === TipoProduto.Pizza ? p.tamanhoPizza === tamanho : p.tamanhoBebida === tamanho)
    );
  }

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  const selectedPizza = getProdutoSelecionado(selectedPizzaName, selectedPizzaSize, TipoProduto.Pizza);
  const selectedDrink = bebidas.find((d: Produto) => d.id === selectedDrinkId);

  const pizzaTotal = selectedPizza ? selectedPizza.preco * pizzaQuantity : 0;
  const drinkTotal = selectedDrink ? selectedDrink.preco * drinkQuantity : 0;
  const total = pizzaTotal + drinkTotal;

  const handleAdicionarAoPedido = async () => {
    const itens: ItemPedidoDto[] = [];

    if (selectedPizza && pizzaQuantity > 0) {
      itens.push({
        IdProduto: selectedPizza.id,
        Quantidade: pizzaQuantity,
        ValorItem: selectedPizza.preco * pizzaQuantity,
      });
    }

    if (selectedDrink && drinkQuantity > 0) {
      itens.push({
        IdProduto: selectedDrink.id,
        Quantidade: drinkQuantity,
        ValorItem: selectedDrink.preco * drinkQuantity,
      });
    }

    const novoPedido: PedidoDto = {
      ValorTotal: total,
      Cliente: {
        Cpf: clienteCpf,
        Nome: clienteNome,
        Endereco: clienteEndereco,
        Telefone: clienteTelefone,
        Senha: clienteSenha,
      },
      ItemPedido: itens,
      TipoPagamento: tipoPagamento,
    };

    setPedido(novoPedido);
    setItemPedido(itens);

    try {
      const pedidoId = await submitPedido(novoPedido);
      setPedidoId(pedidoId);
      alert("Pedido enviado com sucesso!");
      navigate(`/trackorder/${pedidoId}`);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert("Erro ao enviar pedido.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Monte seu pedido
            </h2>
          </div>

          <Divider />

          {/* Accordion: Escolha da Pizza */}
          <Accordion style={{ borderRadius: 10, margin: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6"><Pizza />Escolha sua Pizza</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-4">
                <img src={pizzaImg} alt="Pizza" className="w-1/2 mx-auto mb-4" />
                <TextField
                  select
                  fullWidth
                  label="Pizza"
                  value={selectedPizzaName}
                  onChange={(e) => setSelectedPizzaName(e.target.value)}
                  style={{ marginBottom: "16px" }}
                >
                  {uniquePizzaNames.map((pizza) => (
                    <MenuItem key={pizza} value={pizza}>
                      {pizza}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="number"
                  label="Quantidade"
                  inputProps={{ min: 1 }}
                  value={pizzaQuantity}
                  onChange={(e) =>
                    setPizzaQuantity(parseInt(e.target.value) || 1)
                  }
                  style={{ marginBottom: "16px" }}
                />

                <Typography variant="subtitle1">Tamanho:</Typography>
                <div className="flex gap-4 flex-wrap">
                  {pizzaSizes.map((size) => (
                    <label key={size}>
                      <input
                        type="radio"
                        name="pizzaSize"
                        value={size}
                        checked={selectedPizzaSize === size}
                        onChange={() => setSelectedPizzaSize(size)}
                      />{" "}
                      {TamanhoPizza[size]}
                    </label>
                  ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Escolha da Bebida */}
          <Accordion style={{ borderRadius: 10, margin: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6"><CupSoda />Escolha sua Bebida</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-4">
                <img src={drinkImg} alt="Bebida" className="w-1/2 mx-auto mb-4" />
                <TextField
                  select
                  fullWidth
                  label="Bebida"
                  value={selectedDrinkId}
                  onChange={(e) => setSelectedDrinkId(e.target.value)}
                  style={{ marginBottom: "16px" }}
                >
                  {bebidas.map((drink) => (
                    <MenuItem key={drink.id} value={drink.id}>
                      {drink.nome}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="number"
                  label="Quantidade"
                  inputProps={{ min: 1 }}
                  value={drinkQuantity}
                  onChange={(e) =>
                    setDrinkQuantity(parseInt(e.target.value) || 1)
                  }
                  style={{ marginBottom: "16px" }}
                />
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Dados do Cliente */}
          <Accordion style={{ borderRadius: 10, margin: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6"><PersonIcon /> Dados do Cliente</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-4">
                <TextField
                  fullWidth
                  label="Nome"
                  value={clienteNome}
                  onChange={(e) => setClienteNome(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="CPF"
                  value={clienteCpf}
                  onChange={(e) => setClienteCpf(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="Endereço"
                  value={clienteEndereco}
                  onChange={(e) => setClienteEndereco(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="Telefone"
                  value={clienteTelefone}
                  onChange={(e) => setClienteTelefone(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Tipo de Pagamento */}
          <TextField
            select
            fullWidth
            label="Tipo de Pagamento"
            value={tipoPagamento}
            onChange={(e) => setTipoPagamento(e.target.value as TipoPagamento)}
            style={{ marginTop: "16px", borderRadius: 10 }}
          >
            {Object.values(TipoPagamento).map((paymentOption) => (
              <MenuItem key={paymentOption} value={paymentOption}>
                {paymentOption}
              </MenuItem>
            ))}
          </TextField>

          {/* Total do Pedido */}
          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Total do Pedido: <span style={{ color: "#16a34a" }}>R$ {total.toFixed(2)}</span>
          </Typography>

          {/* Botão de Enviar Pedido */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdicionarAoPedido}
            fullWidth
            style={{ marginTop: "16px", padding: "16px" }}
          >
            Finalizar Pedido
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PizzaOrderForm;