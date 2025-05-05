import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography, Box, InputAdornment } from "@mui/material";

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSignup, setIsSignup] = useState(false); // Controla se é login ou cadastro
  const [cpf, setCpf] = useState(""); // CPF para login
  const [name, setName] = useState(""); // Nome para cadastro
  const [cellphone, setCellphone] = useState(""); // Celular para cadastro
  const [address, setAddress] = useState(""); // Endereço para cadastro
  const [password, setPassword] = useState(""); // Senha para login e cadastro

  const toggleForm = () => setIsSignup(!isSignup); // Função para alternar entre login e cadastro

  const handleSubmit = () => {
    if (isSignup) {
      // Lógica de cadastro
      console.log("Cadastro:", { name, cpf, cellphone, address, password });
    } else {
      // Lógica de login
      console.log("Login:", { cpf, password });
    }
    onClose(); // Fechar o modal após o envio
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="auth-modal-title" aria-describedby="auth-modal-description">
      <Box sx={{ width: 400 }}>
        <DialogTitle id="auth-modal-title" align="center">
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
              startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
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
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Fechar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isSignup ? "Cadastrar" : "Entrar"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AuthModal;