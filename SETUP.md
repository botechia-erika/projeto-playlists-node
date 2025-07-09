# 🎵 Projeto Playlists Node.js - Guia de Início Rápido

## 🚀 Configuração Inicial

### 1. Clonar o Repositório
```bash
git clone https://github.com/botechia-erika/projeto-playlists-node.git
cd projeto-playlists-node
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar variáveis conforme necessário
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/playlists
# JWT_SECRET=seu_jwt_secret_aqui
```

### 4. Iniciar o Servidor
```bash
# Modo desenvolvimento (recomendado)
npm run dev

# Modo produção
npm start
```

## 🔗 Links Importantes

Após iniciar o servidor, você pode acessar:

- **Página Principal:** http://localhost:3000
- **Documentação Swagger:** http://localhost:3000/api-docs
- **Demo Interativo:** http://localhost:3000/demo.html
- **Collection Postman:** http://localhost:3000/postman-collection.json

## 📚 Documentação

### Swagger/OpenAPI
A documentação completa da API está disponível em `/api-docs` com:
- Todos os endpoints documentados
- Exemplos de request/response
- Schemas de dados
- Interface interativa para testar endpoints

### Postman Collection
Importe a collection do Postman disponível em `/docs/postman-collection.json` para testar todos os endpoints rapidamente.

### Documentação Técnica
Consulte o arquivo `/docs/API.md` para documentação detalhada com exemplos de código.

## 🎯 Testando a API

### 1. Usar a Interface Demo
Acesse http://localhost:3000/demo.html para uma interface visual completa.

### 2. Usar Swagger UI
Acesse http://localhost:3000/api-docs para testar endpoints interativamente.

### 3. Usar cURL
```bash
# Listar músicas
curl http://localhost:3000/api/tracks

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
    "duration": {"start": 0, "end": 180}
  }'

# Upload de arquivo
curl -X POST http://localhost:3000/api/storage \
  -F "inputFile=@/path/to/audio.mp3"
```

## 🔧 Scripts Disponíveis

```bash
npm run dev        # Iniciar em modo desenvolvimento
npm start          # Iniciar em modo produção
npm run docs       # Mostrar link da documentação
npm run demo       # Mostrar link do demo
npm run setup      # Configurar projeto completo
```

## 📝 Estrutura da Resposta da API

### Sucesso
```json
{
  "data": {
    // dados do recurso
  }
}
```

### Erro
```json
{
  "message": "Mensagem de erro",
  "error": "Detalhes técnicos (em desenvolvimento)"
}
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com MongoDB:**
   - Verifique se o MongoDB está executando
   - Confirme a string de conexão no .env

2. **Porta já em uso:**
   - Altere a variável PORT no .env
   - Ou mate o processo na porta: `lsof -ti:3000 | xargs kill -9`

3. **Erro de upload:**
   - Verifique se o diretório src/storage existe
   - Confirme as permissões de escrita

### Logs do Servidor
O servidor usa Morgan para logs HTTP. Todos os requests são logados no console.

## 🌟 Próximos Passos

1. **Implementar autenticação JWT** nos endpoints protegidos
2. **Adicionar validações** mais robustas
3. **Implementar testes** automatizados
4. **Configurar Docker** para containerização
5. **Adicionar rate limiting** para segurança
6. **Implementar paginação** nas listagens

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

- **Issues:** https://github.com/botechia-erika/projeto-playlists-node/issues
- **Email:** 24.01905-4@maua.br
- **Documentação:** http://localhost:3000/api-docs

---

✨ **Parabéns!** Seu projeto está configurado e pronto para uso!
