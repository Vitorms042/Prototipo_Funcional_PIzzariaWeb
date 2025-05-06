import { useCart } from "../context/CartContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import { Close, Remove, Add } from "@mui/icons-material";

const CartModal = ({
  isOpen,
  onClose,
  onProceedToCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}) => {
  const { cart, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Meu Carrinho
        <IconButton
          onClick={onClose}
          sx={{ color: "white" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#f9f9f9",
          padding: 3,
        }}
      >
        {cart.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 2, color: "#555", fontStyle: "italic" }}
          >
            Seu carrinho está vazio.
          </Typography>
        ) : (
          cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#777" }}>
                  R$ {item.price.toFixed(2)} cada
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  sx={{ color: "#1976d2" }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={item.quantity}
                  size="small"
                  sx={{
                    width: "50px",
                    textAlign: "center",
                    "& .MuiInputBase-input": { textAlign: "center" },
                  }}
                  inputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  sx={{ color: "#1976d2" }}
                >
                  <Add />
                </IconButton>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                R$ {(item.price * item.quantity).toFixed(2)}
              </Typography>
              <IconButton
                onClick={() => removeItem(item.id)}
                sx={{ color: "#d32f2f" }}
              >
                <Close />
              </IconButton>
            </Box>
          ))
        )}
      </DialogContent>
      {cart.length > 0 && (
        <DialogActions
          sx={{
            justifyContent: "space-between",
            p: 2,
            backgroundColor: "#f5f5f5",
            borderTop: "1px solid #ddd",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            Total: R$ {totalPrice.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onProceedToCheckout();
              onClose(); // Fecha o modal ao redirecionar
            }}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Continuar para o Checkout
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CartModal;