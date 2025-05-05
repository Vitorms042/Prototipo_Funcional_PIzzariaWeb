import { useState } from "react";
import { useCart } from "../context/CartContext";  // Importando o contexto do carrinho

// Tipando o produto com base na interface CartItem
const FeaturedProducts = () => {
  const { addItem } = useCart();  // Função para adicionar itens ao carrinho
  const [products] = useState([
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Tomato, mozzarella, and fresh basil.",
      price: 19.99,
      image: "/assets/images/pizza1.png", // Imagem da pizza
      rating: 4.5, // Avaliação média
      reviews: 120, // Número de avaliações
    },
    {
      id: 2,
      name: "Pizza Pepperoni",
      description: "Pepperoni, mozzarella, and tomato sauce.",
      price: 22.99,
      image: "/assets/images/pizza2.png", // Imagem da pizza
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 3,
      name: "Pizza Quattro Formaggi",
      description: "Four cheese pizza with a creamy base.",
      price: 24.99,
      image: "/assets/images/pizza3.png", // Imagem da pizza
      rating: 4.3,
      reviews: 75,
    },
    // Adicione mais pizzas conforme necessário
  ]);

  // Tipando 'product' como 'CartItem'
  const handleAddToCart = (product: { id: number; name: string; price: number; image: string }) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,  // Adicionando 1 unidade por vez
    };
    addItem(item);  // Chama a função para adicionar ao carrinho
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        {/* Título Melhorado */}
        <h2 className="text-4xl font-extrabold text-blue-600 mb-8">
          Produtos em Destaque
        </h2>

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
                {/* Avaliação da pizza */}
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
                  <span className="text-lg font-bold text-gray-800">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)} // Passando 'product' como argumento
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
    </section>
  );
};

export default FeaturedProducts;