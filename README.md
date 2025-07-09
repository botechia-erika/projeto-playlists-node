# 🎵 Projeto Playlists Node.js

Uma API RESTful para gerenciamento de playlists musicais, desenvolvida em Node.js com Express e MongoDB.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Exemplos de Uso](#exemplos-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

O **Projeto Playlists Node.js** é uma API completa para gerenciamento de músicas e playlists, oferecendo funcionalidades de upload de arquivos de áudio, gerenciamento de metadados de músicas e organização em playlists personalizadas.

## ✨ Funcionalidades

### 🎵 Gerenciamento de Tracks (Músicas)
- ✅ Criar nova música com metadados completos
- ✅ Listar todas as músicas
- ✅ Buscar música por ID
- ✅ Atualizar informações da música
- ✅ Deletar música (soft delete)

### 🗂️ Gerenciamento de Storage
- ✅ Upload de arquivos de áudio
- ✅ Gerenciamento de arquivos estáticos
- ✅ Validação de tipos de arquivo
- ✅ Exclusão de arquivos

### 👥 Sistema de Usuários
- ✅ Base para gerenciamento de usuários
- ✅ Autenticação com JWT
- ✅ Middlewares de segurança

### 🔐 Segurança
- ✅ Autenticação JWT
- ✅ Validação de dados de entrada
- ✅ Headers customizados
- ✅ Middleware de sessão

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB

### Autenticação & Segurança
- **JSON Web Token (JWT)** - Autenticação stateless
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados

### Upload de Arquivos
- **Multer** - Middleware para upload de arquivos
- **UUID** - Geração de identificadores únicos

### Desenvolvimento
- **Nodemon** - Reinicialização automática do servidor
- **Morgan** - Logger HTTP
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

### Documentação
- **Swagger UI Express** - Interface para documentação da API
- **Swagger JSDoc** - Geração de documentação via comentários

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **MongoDB** (local ou MongoDB Atlas)

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/botechia-erika/projeto-playlists-node.git
cd projeto-playlists-node
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

4. **Configure o banco de dados MongoDB** (ver seção [Configuração](#configuração))

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Servidor
PORT=3000

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/playlists
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/playlists

# JWT
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRES_IN=24h

# Multer Upload
UPLOAD_PATH=./src/storage
MAX_FILE_SIZE=10485760

# Ambiente
NODE_ENV=development
```

### Banco de Dados

O projeto utiliza MongoDB. Você pode usar:

1. **MongoDB Local:**
   - Instale o MongoDB em sua máquina
   - Inicie o serviço: `mongod`

2. **MongoDB Atlas (Nuvem):**
   - Crie uma conta no [MongoDB Atlas](https://cloud.mongodb.com/)
   - Configure um cluster
   - Obtenha a string de conexão

## 📖 Uso

### Desenvolvimento

```bash
# Iniciar em modo de desenvolvimento (com nodemon)
npm run dev

# Iniciar em modo de produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

### Documentação da API

Após iniciar o servidor, a documentação Swagger estará disponível em:
- **Swagger UI:** `http://localhost:3000/api-docs`

## 📚 Documentação da API

### Endpoints Principais

#### 🎵 Tracks (Músicas)
```
GET    /api/tracks     - Lista todas as músicas
POST   /api/tracks     - Cria nova música
GET    /api/tracks/:id - Busca música por ID
PUT    /api/tracks/:id - Atualiza música
DELETE /api/tracks/:id - Deleta música
```

#### 🗂️ Storage (Arquivos)
```
GET    /api/storage     - Lista todos os arquivos
POST   /api/storage     - Upload de arquivo
GET    /api/storage/:id - Busca arquivo por ID
DELETE /api/storage/:id - Deleta arquivo
```

#### 👥 Users (Usuários)
```
GET    /api/users       - Lista usuários
```

### Exemplos de Payloads

#### Criar Música
```json
{
  "name": "Bohemian Rhapsody",
  "album": "A Night at the Opera",
  "cover": "https://example.com/cover.jpg",
  "artist": {
    "name": "Freddie Mercury",
    "nickname": "Queen",
    "nationality": "British"
  },
  "duration": {
    "start": 0,
    "end": 355
  },
  "mediaId": "60d5ecb54b5c3a001f6f4e8a"
}
```

#### Upload de Arquivo
```bash
curl -X POST \
  http://localhost:3000/api/storage \
  -F "inputFile=@/path/to/your/audio.mp3"
```

## 📁 Estrutura do Projeto

```
projeto-playlists-node/
├── src/
│   ├── app.js              # Configuração principal da aplicação
│   ├── config/             # Configurações
│   │   ├── mongoose.js     # Conexão com MongoDB
│   │   ├── multer.js       # Configuração do Multer
│   │   └── knex.js         # Configuração do Knex (SQLite)
│   ├── controller/         # Controladores
│   │   ├── tracksController.js    # Lógica de negócio das músicas
│   │   ├── storageController.js   # Lógica de upload/storage
│   │   ├── usersController.js     # Lógica de usuários
│   │   └── mainController.js      # Controlador principal
│   ├── models/             # Modelos de dados
│   │   ├── track.js        # Modelo de música
│   │   ├── storage.js      # Modelo de arquivo
│   │   └── person.js       # Modelo de pessoa
│   ├── routes/             # Rotas da API
│   │   ├── tracksRouter.js    # Rotas das músicas
│   │   ├── storageRouter.js   # Rotas de storage
│   │   ├── usersRouter.js     # Rotas de usuários
│   │   └── mainRouter.js      # Roteador principal
│   ├── middlewares/        # Middlewares
│   │   ├── session.js      # Middleware de autenticação
│   │   └── customHeader.js # Headers customizados
│   ├── validators/         # Validadores
│   │   ├── tracks.js       # Validação de músicas
│   │   ├── storage.js      # Validação de storage
│   │   └── auth.js         # Validação de autenticação
│   ├── utils/              # Utilitários
│   │   ├── handleJWT.js    # Manipulação de JWT
│   │   ├── handlePassword.js # Manipulação de senhas
│   │   └── handleValidator.js # Validações auxiliares
│   ├── errors/             # Tratamento de erros
│   │   └── handleError.js  # Manipulador de erros
│   └── storage/            # Arquivos uploadados
├── public/                 # Arquivos estáticos
│   ├── index.html         # Página inicial
│   ├── error404.html      # Página de erro 404
│   └── assets/            # Recursos estáticos
├── DATA/                  # Dados persistentes
│   ├── db.db             # Banco SQLite
│   └── db.sql            # Script SQL
├── package.json          # Dependências e scripts
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Este arquivo
```

## 🎯 Exemplos de Uso

### Criar uma nova música

```javascript
// POST /api/tracks
const newTrack = {
  name: "Imagine",
  album: "Imagine",
  cover: "https://example.com/imagine-cover.jpg",
  artist: {
    name: "John Lennon",
    nickname: "John Lennon",
    nationality: "British"
  },
  duration: {
    start: 0,
    end: 183
  }
};

fetch('/api/tracks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newTrack)
});
```

### Upload de arquivo de áudio

```javascript
// POST /api/storage
const formData = new FormData();
formData.append('inputFile', audioFile);

fetch('/api/storage', {
  method: 'POST',
  body: formData
});
```

### Buscar todas as músicas

```javascript
// GET /api/tracks
fetch('/api/tracks')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Mantenha o código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga as convenções de código existentes
- Atualize a documentação conforme necessário

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Erika Botechia**
- GitHub: [@botechia-erika](https://github.com/botechia-erika)
- Email: elbotechia@gmail.com

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se o problema já foi reportado nas [Issues](https://github.com/botechia-erika/projeto-playlists-node/issues)
2. Crie uma nova issue com detalhes do problema
3. Entre em contato através do email

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
