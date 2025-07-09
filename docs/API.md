# 📖 Documentação da API - Projeto Playlists

## 🚀 Introdução

Esta documentação fornece informações detalhadas sobre como utilizar a API do Projeto Playlists. A API está disponível em `http://localhost:3000` e a documentação Swagger pode ser acessada em `http://localhost:3000/api-docs`.

## 🔗 Base URL

```
http://localhost:3000
```

## 📋 Endpoints Disponíveis

### 🎵 Tracks (Músicas)

#### `GET /api/tracks`
**Descrição:** Lista todas as músicas cadastradas no sistema.

**Resposta de Sucesso:**
```json
{
  "data": [
    {
      "_id": "60d5ecb54b5c3a001f6f4e8a",
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
      "mediaId": "60d5ecb54b5c3a001f6f4e8b",
      "createdAt": "2021-06-25T10:30:00Z",
      "updatedAt": "2021-06-25T10:30:00Z"
    }
  ]
}
```

#### `POST /api/tracks`
**Descrição:** Cria uma nova música.

**Corpo da Requisição:**
```json
{
  "name": "Imagine",
  "album": "Imagine",
  "cover": "https://example.com/imagine-cover.jpg",
  "artist": {
    "name": "John Lennon",
    "nickname": "John Lennon",
    "nationality": "British"
  },
  "duration": {
    "start": 0,
    "end": 183
  },
  "mediaId": "60d5ecb54b5c3a001f6f4e8c"
}
```

**Resposta de Sucesso (201):**
```json
{
  "data": {
    "_id": "60d5ecb54b5c3a001f6f4e8d",
    "name": "Imagine",
    "album": "Imagine",
    "cover": "https://example.com/imagine-cover.jpg",
    "artist": {
      "name": "John Lennon",
      "nickname": "John Lennon",
      "nationality": "British"
    },
    "duration": {
      "start": 0,
      "end": 183
    },
    "mediaId": "60d5ecb54b5c3a001f6f4e8c",
    "createdAt": "2021-06-25T10:35:00Z",
    "updatedAt": "2021-06-25T10:35:00Z"
  }
}
```

#### `GET /api/tracks/:id`
**Descrição:** Busca uma música por ID.

**Parâmetros:**
- `id` (string): ID da música

**Resposta de Sucesso (200):**
```json
{
  "data": {
    "_id": "60d5ecb54b5c3a001f6f4e8a",
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
    "mediaId": "60d5ecb54b5c3a001f6f4e8b",
    "createdAt": "2021-06-25T10:30:00Z",
    "updatedAt": "2021-06-25T10:30:00Z"
  }
}
```

#### `PUT /api/tracks/:id`
**Descrição:** Atualiza uma música existente.

**Parâmetros:**
- `id` (string): ID da música

**Corpo da Requisição:**
```json
{
  "name": "Bohemian Rhapsody (Remastered)",
  "album": "A Night at the Opera (Remastered)",
  "cover": "https://example.com/new-cover.jpg"
}
```

#### `DELETE /api/tracks/:id`
**Descrição:** Remove uma música (soft delete).

**Parâmetros:**
- `id` (string): ID da música

**Resposta de Sucesso (200):**
```json
{
  "message": "Item deleted (soft) successfully"
}
```

### 🗂️ Storage (Arquivos)

#### `GET /api/storage`
**Descrição:** Lista todos os arquivos armazenados.

**Resposta de Sucesso:**
```json
{
  "data": [
    {
      "_id": "60d5ecb54b5c3a001f6f4e8e",
      "url": "http://localhost:3000/1750508430152-BelenAguilera-Antagonista.mp3",
      "filename": "1750508430152-BelenAguilera-Antagonista.mp3",
      "createdAt": "2021-06-25T10:40:00Z",
      "updatedAt": "2021-06-25T10:40:00Z"
    }
  ]
}
```

#### `POST /api/storage`
**Descrição:** Faz upload de um arquivo de áudio.

**Corpo da Requisição:**
- `Content-Type: multipart/form-data`
- `inputFile`: Arquivo de áudio (MP3, WAV, etc.)

**Exemplo com cURL:**
```bash
curl -X POST \
  http://localhost:3000/api/storage \
  -F "inputFile=@/path/to/your/audio.mp3"
```

**Resposta de Sucesso (201):**
```json
{
  "data": {
    "_id": "60d5ecb54b5c3a001f6f4e8f",
    "url": "http://localhost:3000/1750508430152-audio.mp3",
    "filename": "1750508430152-audio.mp3",
    "createdAt": "2021-06-25T10:45:00Z",
    "updatedAt": "2021-06-25T10:45:00Z"
  }
}
```

#### `GET /api/storage/:id`
**Descrição:** Busca um arquivo por ID.

**Parâmetros:**
- `id` (string): ID do arquivo

#### `DELETE /api/storage/:id`
**Descrição:** Remove um arquivo do sistema.

**Parâmetros:**
- `id` (string): ID do arquivo

### 👥 Users (Usuários)

#### `GET /api/users`
**Descrição:** Lista todos os usuários (endpoint de exemplo).

**Resposta de Sucesso:**
```json
{
  "data": ["User 1", "User 2", "User 3"]
}
```

## 🔐 Autenticação

A API suporta autenticação JWT. Para endpoints protegidos, inclua o token no header:

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## 📝 Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos na requisição
- `401 Unauthorized`: Token de autenticação inválido ou ausente
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno do servidor

## 🛠️ Exemplos de Uso

### JavaScript/Frontend

```javascript
// Listar todas as músicas
async function getTracks() {
  try {
    const response = await fetch('/api/tracks');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
  }
}

// Criar nova música
async function createTrack(trackData) {
  try {
    const response = await fetch('/api/tracks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro ao criar música:', error);
  }
}

// Upload de arquivo
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('inputFile', file);
  
  try {
    const response = await fetch('/api/storage', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
  }
}
```

### cURL

```bash
# Listar músicas
curl -X GET http://localhost:3000/api/tracks

# Criar música
curl -X POST http://localhost:3000/api/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Song",
    "album": "Test Album",
    "artist": {
      "name": "Test Artist",
      "nickname": "Test",
      "nationality": "Test Country"
    },
    "duration": {
      "start": 0,
      "end": 180
    }
  }'

# Upload de arquivo
curl -X POST http://localhost:3000/api/storage \
  -F "inputFile=@/path/to/audio.mp3"

# Buscar música por ID
curl -X GET http://localhost:3000/api/tracks/60d5ecb54b5c3a001f6f4e8a

# Deletar música
curl -X DELETE http://localhost:3000/api/tracks/60d5ecb54b5c3a001f6f4e8a
```

## 🚨 Tratamento de Erros

A API retorna erros no seguinte formato:

```json
{
  "message": "Mensagem de erro amigável",
  "error": "Detalhes técnicos do erro (em desenvolvimento)"
}
```

### Exemplos de Erros Comuns

**404 - Recurso não encontrado:**
```json
{
  "message": "Item not found"
}
```

**400 - Dados inválidos:**
```json
{
  "message": "Validation failed",
  "error": "Name is required"
}
```

**500 - Erro interno:**
```json
{
  "message": "Internal server error",
  "error": "Database connection failed"
}
```

## 📊 Modelos de Dados

### Track (Música)
```typescript
interface Track {
  _id: string;
  name: string;
  album: string;
  cover?: string;
  artist: {
    name: string;
    nickname: string;
    nationality: string;
  };
  duration: {
    start: number;
    end: number;
  };
  mediaId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Storage (Arquivo)
```typescript
interface Storage {
  _id: string;
  url: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔍 Validações

### Campos Obrigatórios

**Track:**
- `name`: string (obrigatório)
- `album`: string (obrigatório)
- `artist.name`: string (obrigatório)
- `artist.nickname`: string (obrigatório)
- `artist.nationality`: string (obrigatório)
- `duration.start`: number (obrigatório)
- `duration.end`: number (obrigatório)

**Storage:**
- `inputFile`: arquivo (obrigatório no upload)

### Tipos de Arquivo Suportados

- MP3
- WAV
- M4A
- FLAC
- OGG

## 📚 Recursos Adicionais

- **Documentação Swagger:** `http://localhost:3000/api-docs`
- **Arquivos estáticos:** `http://localhost:3000/filename.mp3`
- **Página inicial:** `http://localhost:3000/`

## 🤝 Suporte

Para dúvidas ou problemas:

1. Consulte esta documentação
2. Acesse a documentação Swagger
3. Verifique os logs do servidor
4. Abra uma issue no repositório GitHub

---

Esta documentação é mantida atualizada conforme as mudanças na API. Última atualização: Janeiro 2025.
