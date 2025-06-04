<div align="center">

# PlaniFi - Control de Gastos Personales

## Autores  
[Dana Villamizar](https://github.com/DanaVillamizar)  [Sneider Sánchez](https://github.com/Sneider-exe)  
</div>


**PlaniFi** es una aplicación prototipo desarrollada con **React + Vite**, que permite registrar, visualizar y gestionar transacciones financieras personales. Está diseñada como parte del proyecto para la materia **Ingeniería de Software I**.

---

## Características

- Registro de ingresos y gastos
- Visualización de transacciones por categorías
- Alertas de presupuesto
- Gráficas mensuales
- Diseño visual amigable (en mejora para dispositivos móviles)
- Dockerizado para despliegue rápido
- Exportable como aplicación Android (.apk)

---

## Instalación local

1. Clona el repositorio:

    ```bash
    git clone https://github.com/DanaVillamizar/Proyecto_Software_I.git
    cd Proyecto_Software_I
    ```

2. Instala dependencias:

    ```bash
    npm install
    ```

3. Corre el servidor de desarrollo:

    ```bash
    npm run dev
    ```

---

## Ejecución con Docker

1. Asegúrate de tener Docker Desktop corriendo.

2. Construye la imagen:

    ```bash
    docker build -t planifi-app .
    ```

3. Corre el contenedor:

    ```bash
    docker run -d -p 8080:80 --name planifi planifi-app
    ```

4. Abre tu navegador en: `http://localhost:8080`

---


## Notas

- Este proyecto es un prototipo. El diseño responsive está en mejora.
- Se puede presentar vía navegador, Docker o como app Android.

---
