import { useState } from "react";
import { useUser } from "../context/UserContext";
import { TextField, Button, Avatar, Typography, Box, Divider, Snackbar, Alert, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, login } = useUser(); // Obtém os dados do usuário e a função para atualizar
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [phone, setPhone] = useState("123-456-7890"); // Simulação de telefone
  const [address, setAddress] = useState("Rua das Flores, 123, Centro, SP"); // Simulação de endereço
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Controle do alerta

  const handleSave = () => {
    // Simula a atualização dos dados do usuário
    login({ id: user?.id || "1", name, email, avatar });
    setIsEditing(false);
    setShowAlert(true); // Exibe o alerta
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string); // Atualiza o avatar com a imagem carregada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #f0f4f8, #d9e2ec)",
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: "900px", // Aumenta a largura no desktop
          backgroundColor: "white",
          borderRadius: 3,
          padding: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
            Meu Perfil
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Voltar para Home
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Avatar */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Avatar
            src={avatar}
            sx={{
              width: 140,
              height: 140,
              mb: 2,
              border: "4px solid #1976d2",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          {isEditing && (
            <Button
              variant="outlined"
              component="label"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Alterar Foto
              <input type="file" hidden onChange={handleAvatarChange} />
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Informações Pessoais */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#555" }}>
          Informações Pessoais
        </Typography>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />

        <Divider sx={{ my: 2 }} />

        {/* Telefone */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#555" }}>
          Telefone
        </Typography>
        <TextField
          label="Telefone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!isEditing}
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />

        <Divider sx={{ my: 2 }} />

        {/* Endereço */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#555" }}>
          Endereço
        </Typography>
        <TextField
          label="Endereço"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={!isEditing}
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />

        {/* Botões */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Salvar
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setIsEditing(true)}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Editar Perfil
            </Button>
          )}
        </Box>
      </Paper>

      {/* Alerta de sucesso */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: "100%" }}>
          Alterações salvas com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;