# La Fiori - Bot de Atendimento WhatsApp

Bot de atendimento automatizado para a Clínica de Estética La Fiori.

## Funcionalidades

- Menu interativo de opções
- Lista de serviços e preços
- Agendamento de consultas
- Informações de horário de funcionamento
- Encaminhamento para atendente humano

## Como usar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o bot:
```bash
npm start
```

3. Escaneie o QR Code que aparecerá no terminal com o WhatsApp do número que será usado para o bot

## Personalização

Para personalizar as mensagens, edite o objeto `messages` no arquivo `src/bot.js`.

Para atualizar os serviços e preços, edite o objeto `services` no arquivo `src/bot.js`.