
# Blueprint: Dashboard Interactivo del Libro en Ecuador

## Resumen

Este documento describe el plan para crear un dashboard web interactivo que visualice el estado de la industria del libro en Ecuador. El dashboard presentará datos sobre la producción editorial, el comercio exterior, los hábitos de lectura y la distribución de librerías en el país.

## Diseño y Estilo

*   **Diseño:** Simple, moderno y limpio.
*   **Tema:** Modo oscuro y claro, con un interruptor para que el usuario elija.
*   **Colores:** Paleta de colores con buen contraste para una fácil lectura.
*   **Responsivo:** El diseño se adaptará a diferentes tamaños de pantalla (escritorio y móvil).

## Estructura del Proyecto

*   `index.html`: La estructura principal del dashboard.
*   `style.css`: Los estilos para el layout, los gráficos y los componentes.
*   `script.js`: La lógica para cargar los datos, generar los gráficos y manejar la interactividad.
*   `data/`: Carpeta que contiene los archivos de datos.

## Plan de Implementación

### Fase 1: Estructura y Estilos Base

1.  Crear el archivo `index.html` con la estructura básica del dashboard:
    *   Un contenedor principal.
    *   Una barra de navegación para cambiar entre las diferentes secciones (Resumen, Producción Editorial, Comercio Exterior, Hábitos de Lectura, Librerías).
    *   Un área de contenido principal donde se mostrarán los gráficos.
    *   Un interruptor para el modo oscuro/claro.
2.  Crear el archivo `style.css` con los estilos iniciales:
    *   Estilos para el cuerpo, la tipografía y los colores base.
    *   Estilos para la barra de navegación.
    *   Clases para el modo oscuro y claro.

### Fase 2: Visualización de Datos

1.  **Resumen:**
    *   Crear tarjetas para mostrar cifras clave.
    *   Implementar un gráfico de barras para la evolución de los títulos ISBN.
    *   Implementar un gráfico de pastel para la distribución de formatos digitales.
2.  **Producción Editorial:**
    *   Crear un gráfico de barras para la producción mensual de títulos.
    *   Crear un gráfico de barras apiladas para los tipos de editores.
    *   Crear un gráfico de barras para los 10 temas principales.
    *   Generar un mapa coroplético de Ecuador.
3.  **Comercio Exterior:**
    *   Crear un gráfico de líneas para la balanza comercial.
    *   Crear gráficos de barras para los principales socios comerciales.
4.  **Hábitos de Lectura:**
    *   Generar varios gráficos de barras y de pastel para visualizar los datos de la encuesta.
5.  **Librerías en Ecuador:**
    *   Implementar un mapa interactivo con marcadores para las librerías.
    *   Crear una tabla de datos de las librerías.

### Fase 3: Interactividad y Finalización

1.  Implementar la lógica en `script.js` para:
    *   Cargar los datos desde los archivos CSV y MD.
    *   Usar una librería de gráficos (como Chart.js o D3.js) para crear las visualizaciones.
    *   Manejar los eventos de clic en la navegación para cambiar de sección.
    *   Implementar la funcionalidad del interruptor de modo oscuro/claro.
    *   Agregar tooltips a los gráficos.
2.  Realizar pruebas y depuración para asegurar que todo funcione correctamente.
3.  Refinar los estilos y la presentación visual del dashboard.
