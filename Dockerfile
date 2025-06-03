# Etapa 1: build de la app
FROM node:18 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: servidor nginx para servir la app
FROM nginx:alpine

# Copia el build al directorio público de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuración por defecto si lo deseas (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
