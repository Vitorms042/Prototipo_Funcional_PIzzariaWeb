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
import usePedidoService from "./hooks/pedidoService"
import PersonIcon from '@mui/icons-material/Person';


const PizzaOrderForm: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pizzas, setPizzas] = useState<Produto[]>([]);
  const [bebidas, setBebidas] = useState<Produto[]>([]);
  const [pedido, setPedido] = useState<PedidoDto>();
  const [itemPedido, setItemPedido] = useState<ItemPedidoDto[]>([]);
  const [pizzaSizes, setPizzaSizes] = useState<TamanhoPizza[]>([]);
  const [drinkSizes, setDrinkSizes] = useState<TamanhoBebida[]>([]);

  const [selectedPizzaId, setSelectedPizzaId] = useState<string>("");
  const [pizzaQuantity, setPizzaQuantity] = useState<number>(1);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<TamanhoPizza>(2);

  const [selectedDrinkId, setSelectedDrinkId] = useState<string>("");
  const [drinkQuantity, setDrinkQuantity] = useState<number>(1);
  const [selectedDrinkSize, setSelectedDrinkSize] =
    useState<TamanhoBebida>(1000);

  const [clienteCpf, setClienteCpf] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [clienteEndereco, setClienteEndereco] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState<TipoPagamento>(
    TipoPagamento.Pix
  );

  const { getProdutos, submitPedido } = usePedidoService();

  const loadProdutos = useCallback(async () => {
    const produtos = await getProdutos();
    if (produtos) {
      setProdutos(produtos);
      setPizzas(produtos.filter((p: Produto) => p.tipo === 0));
      setBebidas(produtos.filter((p: Produto) => p.tipo === 1));
      setPizzaSizes(
        Array.from(
          new Set(
            produtos
              .filter((p: Produto) => p.tipo === 0)
              .map((p: Produto) => p.tamanhoPizza!)
          )
        )
      );
      setDrinkSizes(
        Array.from(
          new Set(
            produtos
              .filter((p: Produto) => p.tipo === 1)
              .map((p: Produto) => p.tamanhoBebida!)
          )
        )
      );
    }
  }, [getProdutos]);

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  const selectedPizza = pizzas.find((p : Produto) => p.id === selectedPizzaId);
  const selectedDrink = bebidas.find((d : Produto) => d.id === selectedDrinkId);

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
      },
      ItemPedido: itens,
      TipoPagamento: tipoPagamento,
    };

    setPedido(novoPedido);
    setItemPedido(itens);

    try {
      await submitPedido(novoPedido);
      alert("Pedido enviado com sucesso!");
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
              <Typography variant="h6"><Pizza/>Escolha sua Pizza</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-4">
                <img src={pizzaImg} alt="Pizza" className="w-1/2 mx-auto mb-4" />
                <TextField
                  select
                  fullWidth
                  label="Pizza"
                  value={selectedPizzaId}
                  onChange={(e) => setSelectedPizzaId(e.target.value)}
                  style={{ marginBottom: "16px" }}
                >
                  {pizzas.map((pizza) => (
                    <MenuItem key={pizza.id} value={pizza.id}>
                      {pizza.nome}
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
              <Typography variant="h6"><CupSoda/>Escolha sua Bebida</Typography>
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

                <Typography variant="subtitle1">Tamanho:</Typography>
                <div className="flex gap-4 flex-wrap">
                  {drinkSizes.map((size) => (
                    <label key={size}>
                      <input
                        type="radio"
                        name="drinkSize"
                        value={size}
                        checked={selectedDrinkSize === size}
                        onChange={() => setSelectedDrinkSize(size)}
                      />{" "}
                      {size} ml
                    </label>
                  ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Dados do Cliente */}
          <Accordion style={{ borderRadius: 10, margin: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6"><PersonIcon/> Dados do Cliente</Typography>
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
            {Object.values(TipoPagamento).map((tp) => (
              <MenuItem key={tp} value={tp}>
                {tp}
              </MenuItem>
            ))}
          </TextField>

          {/* Total + Botão */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4">
            <Typography variant="h6">
              Total:{" "}
              <span style={{ color: "#16a34a" }}>${total.toFixed(2)}</span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdicionarAoPedido}
            >
              Adicionar ao Pedido
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PizzaOrderForm;
