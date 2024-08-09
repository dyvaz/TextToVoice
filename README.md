# TextToVoice

O projeto **TextToVoice** é uma aplicação web desenvolvida com Next.js e TypeScript que utiliza a API do ElevenLabs para transformar texto em voz. A aplicação permite listar diferentes vozes, ouvir amostras de cada voz e gerar áudio a partir de um texto digitado pelo usuário.

## Funcionalidades

- **Listar Vozes:** Exibe uma lista de vozes disponíveis com opções para ouvir uma amostra de cada uma.
- **Gerar áudio:** Permite ao usuário digitar um texto e ouvir como ele é falado em diferentes vozes.
- **Armazenamento de áudio:** Os arquivos de áudio gerados são armazenados e gerenciados para reprodução.

## Tecnologias

- **Next.js:** Framework React para renderização do lado do servidor e geração de sites estáticos.
- **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **API do ElevenLabs:** Serviço de "texto para voz" que oferece uma variedade de vozes e opções de personalização.
- **Ant-Design / Mantine:** Pacote visual para a interface de usuário (escolha um dos pacotes).

## Configuração

Para configurar o projeto, siga estas etapas:

1. **Obter a chave da API do ElevenLabs:**
   - Acesse o site da ElevenLabs e crie uma conta.
   - Gere uma chave de API e copie o valor da chave.

2. **Configurar variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do seu projeto.
   - Adicione a chave da API do ElevenLabs ao arquivo `.env` no seguinte formato:
     ```plaintext
     ELEVENLABS_API_KEY=SuaChaveDaAPI
     ```

   - Crie um arquivo `.env.development.local` na raiz do seu projeto.
   - Adicione a chave da Vercel ao arquivo `.env.development.local` no seguinte formato:
     ```plaintext
     VERCEL_API_KEY=SuaChaveDaVercel
     ```

3. **Instalar dependências:**
   - Certifique-se de que todas as dependências estejam instaladas com o comando:
     ```bash
     npm install
     ```

4. **Executar o projeto:**
   - Inicie o servidor de desenvolvimento com o comando:
     ```bash
     npm run dev
     ```
