import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // Importando ícones de redes sociais

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Primeira Linha de Contato */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Ajuda</a></li>
            </ul>
          </div>

          {/* Informações de Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul>
              <li>📞 Telefone: (11) 1234-5678</li>
              <li>📧 Email: contato@pizzaria.com</li>
              <li>🏠 Endereço: Rua da Pizzaria, 123</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha de Direitos Autorais */}
        <div className="text-center text-sm mt-8">
          <p>© 2025 Pizzaria - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
