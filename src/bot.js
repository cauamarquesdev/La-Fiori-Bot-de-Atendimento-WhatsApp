import whatsappWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsappWeb;
import qrcode from 'qrcode-terminal';

// Configuração dos serviços e preços
const services = {
  limpeza: 'Limpeza de Pele - R$ 150,00',
  botox: 'Aplicação de Botox - R$ 800,00',
  preenchimento: 'Preenchimento Labial - R$ 900,00',
  lipodepapada: 'Lipo De papada - R$ 200,00 ',
  microvasos: 'Micro vasos - R$ 150,00 ',
  microagulhamento: ' MicroAgulhamento - R$ 200,00 '
};

// Mensagens personalizadas
const messages = {
  welcome: `Olá! 👋 Bem-vindo(a) à *La Fiori Clínica de Estética*!\n\nComo posso ajudar você hoje?\n\n1️⃣ - Ver nossos serviços\n2️⃣ - Agendar consulta\n3️⃣ - Horário de funcionamento\n4️⃣ - Falar com atendente`,
  
  services: `*Nossos Serviços:*\n\n${Object.values(services).join('\n')}\n\nPara agendar, digite 2️⃣`,
  
  schedule: `Para agendar sua consulta, precisamos de algumas informações:\n\n- Nome completo\n- Serviço desejado\n- Data preferencial\n\nPor favor, aguarde que um de nossos atendentes entrará em contato para confirmar seu agendamento.`,
  
  hours: `*Horário de Funcionamento:*\n\nSegunda a Sexta: 09h às 19h\nSábado: 09h às 14h\nDomingo: Fechado`,
  
  attendant: `Em breve um de nossos atendentes entrará em contato com você! 😊\nAgradecemos sua preferência!`,
  
  default: `Desculpe, não entendi. Por favor, escolha uma das opções:\n\n1️⃣ - Ver nossos serviços\n2️⃣ - Agendar consulta\n3️⃣ - Horário de funcionamento\n4️⃣ - Falar com atendente`
};

// Inicializa o cliente WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox']
  }
});

// Gera o QR Code para conexão
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('QR Code gerado! Escaneie-o com seu WhatsApp');
});

// Quando conectado
client.on('ready', () => {
  console.log('Bot da La Fiori está online!');
});

// Tratamento de mensagens
client.on('message', async (message) => {
  // Adicionando .trim() para evitar espaços extras e .toLowerCase() para tornar a comparação insensível a maiúsculas/minúsculas
  const content = message.body.toLowerCase().trim();  
  
  console.log(`Mensagem recebida: ${content}`);  // Log para verificar o conteúdo da mensagem recebida

  // Evita responder mensagens de grupos
  if (message.isGroupMsg) return;

  // Tratamento das opções
  switch (content) {
    case '1':
      console.log('Enviando serviços');
      await message.reply(messages.services);
      break;
    case '2':
      console.log('Enviando agendamento');
      await message.reply(messages.schedule);
      break;
    case '3':
      console.log('Enviando horário');
      await message.reply(messages.hours);
      break;
    case '4':
      console.log('Enviando atendente');
      await message.reply(messages.attendant);
      break;
    default:
      console.log('Enviando mensagem de boas-vindas');
      // Verifica se o conteúdo não começa com '!' (primeira mensagem ou não reconhecida)
      if (!content.startsWith('!')) {
        await message.reply(messages.welcome);
      } else {
        await message.reply(messages.default);  // Mensagem de erro para comando não reconhecido
      }
  }
});

process.removeAllListeners('warning');

// Inicializa o bot
client.initialize();
