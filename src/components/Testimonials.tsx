import Slider from "react-slick";
import { Box, Typography, Avatar } from "@mui/material";
import "slick-carousel/slick/slick.css"; // Estilos do react-slick
import "slick-carousel/slick/slick-theme.css"; // Tema do react-slick

const TestimonialCarousel = () => {
  // Array de Depoimentos
  const testimonials = [
    {
      id: 1,
      name: "João Silva",
      avatar: "/assets/images/avatar1.jpg",
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

  // Configurações do react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Remove as setas padrão
  };

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "800px", // Limita a largura máxima do carrossel
          width: "100%", // Garante que o carrossel seja responsivo
          px: 2, // Adiciona espaçamento horizontal
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}
        >
          O Que Nossos Clientes Dizem
        </Typography>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <Box
              key={testimonial.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 4,
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Avatar
                src={testimonial.avatar}
                alt={testimonial.name}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                {testimonial.name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={index < testimonial.rating ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z"
                    />
                  </svg>
                ))}
              </Box>
              <Typography variant="body1" sx={{ color: "#555", mt: 1 }}>
                {testimonial.comment}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default TestimonialCarousel;