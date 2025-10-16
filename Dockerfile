# Etapa de build
# Etapa 1: Build da aplicação React com Node 18 Alpine
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir a build com Nginx Alpine
FROM nginx:alpine

# Remove a configuração default do Nginx para usar a personalizada
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo nginx.conf personalizado para dentro do container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados na build para o diretório servido pelo Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80 para acesso HTTP
EXPOSE 80

# Comando para iniciar o Nginx no primeiro plano (para o Docker manter o container rodando)
CMD ["nginx", "-g", "daemon off;"]
