const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTe6z13jruVcXbhy2JUxz0dYlE1TFBSl50B55K-a3M5yYGLZCTagIfoZLJxIP-56DSSvLpsfUPIX5TZ/pub?gid=0&single=true&output=csv';

async function cargarDatos() {
    try {
        const response = await fetch(CSV_URL);
        const texto = await response.text();
        
        const filas = texto.split('\n').slice(1);
        const datos = filas
            .filter(fila => fila.trim() !== "")
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

        renderizar(datos);
        
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        document.getElementById('contenedor-refugios').innerHTML = '<p class="text-red-500 text-center font-bold">Error al cargar la información.</p>';
    }
}

function renderizar(datos) {
    // Aquí corregimos el ID para que coincida con tu HTML
    const contenedor = document.getElementById('contenedor-refugios'); 
    
    if (!contenedor) return; 

    contenedor.innerHTML = ''; 

    datos.forEach(item => {
        const tarjeta = document.createElement('div');
        
        // Estilos mejorados
        tarjeta.className = "p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-4 border-l-4 border-blue-500"; 
        
        tarjeta.innerHTML = `
            <h2 class="text-xl font-bold text-gray-800">${item.nombre}</h2>
            <p class="text-sm text-gray-600 mt-1">📍 ${item.ubicacion} - ${item.municipio}</p>
            <div class="mt-4 flex gap-2">
                <span class="px-3 py-1 text-xs rounded-full font-semibold ${item.agua?.toLowerCase() === 'si' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">Agua</span>
                <span class="px-3 py-1 text-xs rounded-full font-semibold ${item.comida?.toLowerCase() === 'si' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}">Comida</span>
                <span class="px-3 py-1 text-xs rounded-full font-semibold ${item.medicinas?.toLowerCase() === 'si' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">Medicinas</span>
            </div>
            <p class="text-xs text-gray-400 mt-3 text-right">Actualizado: ${item.fecha_actualizacion || 'N/A'}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener('DOMContentLoaded', cargarDatos);