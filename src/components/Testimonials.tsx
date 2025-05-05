import { useState } from "react";

// Componente de Carrossel de Depoimentos
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array de Depoimentos (6 depoimentos)
  const testimonials = [
    {
      id: 1,
      name: "João Silva",
      avatar: "/assets/images/avatar1.jpg", // Imagem do cliente
      comment: "A melhor pizza que já comi! A massa é incrivelmente leve e o sabor é maravilhoso.",
      rating: 5,
    },
    {
      id: 2,
      name: "Maria Oliveira",
      avatar: "/assets/images/avatar2.jpg",
      comment: "Adoro a pizza de pepperoni! Sempre que tenho uma reunião em casa, é minha escolha favorita.",
      rating: 4,
    },
    {
      id: 3,
      name: "Carlos Souza",
      avatar: "/assets/images/avatar3.jpg",
      comment: "Atendimento ótimo e entrega rápida. A pizza chegou quentinha e deliciosa. Recomendo!",
      rating: 5,
    },
    {
      id: 4,
      name: "Ana Costa",
      avatar: "/assets/images/avatar4.jpg",
      comment: "Pizza deliciosa e serviço excelente. A melhor pizzaria da cidade!",
      rating: 4,
    },
    {
      id: 5,
      name: "Lucas Pereira",
      avatar: "/assets/images/avatar5.jpg",
      comment: "Sempre peço para a família. A pizza é muito saborosa e sempre chega no tempo certo.",
      rating: 4,
    },
    {
      id: 6,
      name: "Juliana Lima",
      avatar: "/assets/images/avatar6.jpg",
      comment: "A massa é incrível, a pizza tem um sabor sensacional. Só peço aqui!",
      rating: 5,
    },
  ];

  const totalTestimonials = testimonials.length;

  // Função para avançar para o próximo depoimento
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
  };

  // Função para voltar ao depoimento anterior
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-8">O Que Nossos Clientes Dizem</h2>

        {/* Carrossel */}
        <div className="relative flex justify-center items-center">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            &#60;
          </button>

          <div className="flex items-center space-x-8">
            {/* Exibindo o Depoimento Atual */}
            <div
              key={testimonials[currentIndex].id}
              className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-80 md:w-96 hover:scale-105 transform transition-all"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{testimonials[currentIndex].name}</h3>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < testimonials[currentIndex].rating ? "currentColor" : "none"}
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
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonials[currentIndex].comment}</p>
            </div>
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            &#62;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;