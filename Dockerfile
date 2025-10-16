# Etapa 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Substitui a config default
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build para a SUBPASTA publicada
RUN mkdir -p /usr/share/nginx/html/gestao_absenteismo
COPY --from=builder /app/dist/ /usr/share/nginx/html/gestao_absenteismo/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
