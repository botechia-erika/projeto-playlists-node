import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto Playlists API',
      version: '1.0.0',
      description: 'API RESTful para gerenciamento de playlists musicais',
      contact: {
        name: 'Erika Botechia',
        email: '24.01905-4@maua.br',
        url: 'https://github.com/botechia-erika'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    tags: [
      {
        name: 'Tracks',
        description: 'Operações relacionadas a músicas'
      },
      {
        name: 'Storage',
        description: 'Operações de upload e gerenciamento de arquivos'
      },
      {
        name: 'Users',
        description: 'Operações relacionadas a usuários'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Track: {
          type: 'object',
          required: ['name', 'album', 'artist', 'duration'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único da música'
            },
            name: {
              type: 'string',
              description: 'Nome da música',
              example: 'Bohemian Rhapsody'
            },
            album: {
              type: 'string',
              description: 'Nome do álbum',
              example: 'A Night at the Opera'
            },
            cover: {
              type: 'string',
              description: 'URL da capa do álbum',
              example: 'https://example.com/cover.jpg'
            },
            artist: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome do artista',
                  example: 'Freddie Mercury'
                },
                nickname: {
                  type: 'string',
                  description: 'Nome artístico',
                  example: 'Queen'
                },
                nationality: {
                  type: 'string',
                  description: 'Nacionalidade do artista',
                  example: 'British'
                }
              }
            },
            duration: {
              type: 'object',
              properties: {
                start: {
                  type: 'number',
                  description: 'Tempo de início em segundos',
                  example: 0
                },
                end: {
                  type: 'number',
                  description: 'Tempo de fim em segundos',
                  example: 355
                }
              }
            },
            mediaId: {
              type: 'string',
              description: 'ID do arquivo de mídia associado'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização'
            }
          }
        },
        Storage: {
          type: 'object',
          required: ['url', 'filename'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do arquivo'
            },
            url: {
              type: 'string',
              description: 'URL do arquivo',
              example: 'http://localhost:3000/uploads/audio.mp3'
            },
            filename: {
              type: 'string',
              description: 'Nome do arquivo',
              example: 'audio.mp3'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de upload'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            error: {
              type: 'string',
              description: 'Detalhes do erro'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              description: 'Dados da resposta'
            },
            message: {
              type: 'string',
              description: 'Mensagem de sucesso'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controller/*.js']
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };
