import { useState } from "react";
import { useCart } from "../context/CartContext"; // Importando o contexto do carrinho
import { Snackbar, Alert } from "@mui/material";

// Tipo para os produtos exibidos
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

// Tipo para os itens no carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const FeaturedProducts = () => {
  const { addItem } = useCart(); // Função para adicionar itens ao carrinho
  const [cartNotification, setCartNotification] = useState<string | null>(null); // Notificação para o carrinho

  // Lista de produtos em destaque
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Tomato, mozzarella, and fresh basil.",
      price: 19.99,
      image: "/assets/images/pizza1.png",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      name: "Pizza Pepperoni",
      description: "Pepperoni, mozzarella, and tomato sauce.",
      price: 22.99,
      image: "/assets/images/pizza2.png",
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 3,
      name: "Pizza Quattro Formaggi",
      description: "Four cheese pizza with a creamy base.",
      price: 24.99,
      image: "/assets/images/pizza3.png",
      rating: 4.3,
      reviews: 75,
    },
  ]);

  // Função para adicionar um produto ao carrinho
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Adicionando 1 unidade por vez
    };
    addItem(cartItem); // Adiciona o item ao carrinho
    setCartNotification(`"${product.name}" foi adicionado ao carrinho!`); // Define a notificação
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        {/* Título */}
        <h2 className="text-4xl font-extrabold text-blue-600 mb-8">
          Produtos em Destaque
        </h2>

        {/* Lista de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                {/* Avaliação */}
                <div className="flex items-center mt-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < product.rating ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 ml-2">({product.reviews} avaliações)</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-gray-800">R$ {product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product)} // Passando o produto como argumento
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notificação de itens adicionados ao carrinho */}
      <Snackbar
        open={!!cartNotification}
        autoHideDuration={3000}
        onClose={() => setCartNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Posicionando no canto superior direito
      >
        <Alert onClose={() => setCartNotification(null)} severity="success" sx={{ width: "100%" }}>
          {cartNotification}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default FeaturedProducts;