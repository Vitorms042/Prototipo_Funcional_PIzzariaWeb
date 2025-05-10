import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useUser } from "../../context/UserContext";
import useUserService from "./hooks/userService";
import { ClienteDto } from "../../data/models/models";

const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { login } = useUser(); // Hook para atualizar o estado do usuário
  const [isSignup, setIsSignup] = useState(false); // Controla se é login ou cadastro
  const [cpf, setCpf] = useState(""); // CPF para login
  const [name, setName] = useState(""); // Nome para cadastro
  const [cellphone, setCellphone] = useState(""); // Celular para cadastro
  const [address, setAddress] = useState(""); // Endereço para cadastro
  const [password, setPassword] = useState(""); // Senha para login e cadastro
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const { createCliente, clienteLogin } = useUserService(); // Funções para criar cliente e fazer login

  const toggleForm = () => setIsSignup(!isSignup); // Alterna entre login e cadastro

  const handleSubmit = async () => {
    setLoading(true);

    if (isSignup) {
      try {
        const cliente: ClienteDto = {
          Nome: name,
          Cpf: cpf,
          Telefone: cellphone,
          Endereco: address,
          Senha: password,
        };
        await createCliente(cliente);
      } catch (error) {
        console.error("Erro ao criar cliente:", error);
      } finally {
        const cliente = await clienteLogin(cpf, password);
        login(cliente); 
      }
    } else {
      try{
        const cliente = await clienteLogin(cpf, password)
        if (cliente) {
          login(cliente); // Atualiza o estado do usuário no contexto
        } else {
          console.error("Erro ao fazer login: Usuário não encontrado");
        }
      }catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }

    setLoading(false);
    onClose(); // Fecha o modal após o envio
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={{ width: 400, padding: 2 }}>
        <DialogTitle
          id="auth-modal-title"
          align="center"
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          {isSignup ? "Criar Conta" : "Entrar"}
        </DialogTitle>
        <DialogContent>
          {isSignup && (
            <>
              {/* Campos para o cadastro */}
              <TextField
                label="Nome Completo"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="CPF"
                fullWidth
                margin="normal"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <TextField
                label="Celular"
                fullWidth
                margin="normal"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
              <TextField
                label="Endereço"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </>
          )}

          {/* Campo de CPF para login */}
          {!isSignup && (
            <TextField
              label="CPF"
              fullWidth
              margin="normal"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          )}

          {/* Campo de Senha */}
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">🔒</InputAdornment>
              ),
            }}
          />

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {isSignup ? (
              <>
                Já possui uma conta?{" "}
                <Button onClick={toggleForm} color="primary">
                  Faça login
                </Button>
              </>
            ) : (
              <>
                Não tem uma conta?{" "}
                <Button onClick={toggleForm} color="primary">
                  Crie uma
                </Button>
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            sx={{ borderRadius: "8px", padding: "0.5rem 1.5rem" }}
          >
            Fechar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "0.5rem 1.5rem",
              background: "linear-gradient(to right, #4caf50, #81c784)",
              color: "white",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : isSignup ? (
              "Cadastrar"
            ) : (
              "Entrar"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AuthModal;
