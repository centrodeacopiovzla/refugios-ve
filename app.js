// La URL de tu Google Sheets publicada
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTe6z13jruVcXbhy2JUxz0dYlE1TFBSl50B55K-a3M5yYGLZCTagIfoZLJxIP-56DSSvLpsfUPIX5TZ/pub?gid=0&single=true&output=csv';

async function cargarDatos() {
    try {
        const response = await fetch(CSV_URL);
        const texto = await response.text();
        
        // Convertimos el CSV a un array de objetos
        const filas = texto.split('\n').slice(1); // Saltamos la primera fila (encabezados)
        
        const datos = filas
            .filter(fila => fila.trim() !== "") // Filtramos filas vacías
            .map(fila => {
                const [nombre, ubicacion, estado, municipio, agua, comida, medicinas, fecha_actualizacion] = fila.split(',');
                return { 
                    nombre: nombre?.trim(), 
                    ubicacion: ubicacion?.trim(), 
                    estado: estado?.trim(), 
                    municipio: municipio?.trim(), 
                    agua: agua?.trim(), 
                    comida: comida?.trim(), 
                    medicinas: medicinas?.trim(), 
                    fecha_actualizacion: fecha_actualizacion?.trim() 
                };
            });

        // Llamamos a tu función de renderizado que ya tenías hecha
        renderizar(datos);
        
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        // Si hay error, podrías mostrar un mensaje en el HTML si quisieras
    }
}

// Ejecutamos la función al cargar la página
cargarDatos();