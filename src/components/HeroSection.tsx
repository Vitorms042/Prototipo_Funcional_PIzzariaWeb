import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/pizza-hero.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay para melhorar a legibilidade do texto */}
      <div className="relative z-10 flex justify-center items-center w-full h-full text-center text-white">
        <div className="max-w-lg px-4 md:px-8">
          {/* Título */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Bem-vindo à melhor pizzaria da cidade!
          </h1>
          {/* Descrição */}
          <p className="text-lg sm:text-xl mb-8">
            Experimente nossas pizzas artesanais feitas com os melhores ingredientes. Personalize sua pizza e aproveite!
          </p>
          
          {/* Botões de ação */}
          <div className="flex justify-center gap-6">
            {/* Botão de Configuração de Pizza */}
            <Link
              to="/configuracaopizza"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-lg transition-colors"
            >
              Comece seu Pedido
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;