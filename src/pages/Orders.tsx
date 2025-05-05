import { Box, Typography } from "@mui/material";

const Orders = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        padding: 4,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Meus Pedidos
      </Typography>
      <Typography variant="body1" sx={{ color: "gray" }}>
        Aqui você poderá visualizar todos os seus pedidos.
      </Typography>
    </Box>
  );
};

export default Orders;