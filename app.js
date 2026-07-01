const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTe6z13jruVcXbhy2JUxz0dYlE1TFBSl50B55K-a3M5yYGLZCTagIfoZLJxIP-56DSSvLpsfUPIX5TZ/pub?gid=0&single=true&output=csv';

let datosGlobales = [];

async function cargarDatos() {
    try {
        const response = await fetch(CSV_URL);
        const texto = await response.text();
        const filas = texto.split('\n').slice(1);
        
        datosGlobales = filas
            .filter(fila => fila.trim() !== "")
            .map(fila => {
                // Estas son las 17 columnas que definiste, en el orden exacto
                const [centro, estado, municipio, ubicacion, agua, comidaNP, comidaP, medicinas, tapabocas, carpas, cama, higiene, ropa, bolsas, mascota, silbato, papeleria] = fila.split(',');
                
                return { 
                    centro, estado, municipio, ubicacion, agua, comidaNP, comidaP, medicinas, tapabocas, 
                    carpas, cama, higiene, ropa, bolsas, mascota, silbato, papeleria, 
                };
            });

        renderizar(datosGlobales);
    } catch (error) {
        console.error('Error al conectar:', error);
        document.getElementById('contenedor-refugios').innerHTML = '<p class="text-red-500 text-center font-bold">Error al cargar la información.</p>';
    }
}

// Buscador
document.getElementById('buscador').addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = datosGlobales.filter(item => 
        item.centro?.toLowerCase().includes(termino) || 
        item.estado?.toLowerCase().includes(termino) || 
        item.municipio?.toLowerCase().includes(termino)
    );
    renderizar(filtrados);
});

function renderizar(datos) {
    const contenedor = document.getElementById('contenedor-refugios');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    datos.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "p-5 bg-white rounded-xl shadow-md mb-4 border-l-4 border-blue-500";
        
        tarjeta.innerHTML = `
            <h2 class="text-xl font-bold text-gray-800">${item.centro}</h2>
            <p class="text-sm text-gray-600">📍 Ubicación: ${item.ubicacion} - ${item.municipio}, ${item.estado}</p>
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p>💧 <b>Agua:</b> ${item.agua}</p>
                <p>🥪 <b>Comida NO Perecedera:</b> ${item.comidaNP}</p>
                <p>🍲 <b>Comida Preparada:</b> ${item.comidaP}</p>
                <p>💊 <b>Medicinas:</b> ${item.medicinas}</p>
                <p>😷 <b>Tapabocas:</b> ${item.tapabocas}</p>
                <p>⛺ <b>Carpas:</b> ${item.carpas}</p>
                <p>🛏️ <b>Cama (Colchón/Almo/Sáb):</b> ${item.cama}</p>
                <p>🧼 <b>Higiene:</b> ${item.higiene}</p>
                <p>👕 <b>Ropa:</b> ${item.ropa}</p>
                <p>🛍️ <b>Bolsas Negra:</b> ${item.bolsas}</p>
                <p>🐾 <b>Comida Mascota:</b> ${item.mascota}</p>
                <p>📯 <b>Silbato:</b> ${item.silbato}</p>
                <p>✏️ <b>Papelería:</b> ${item.papeleria}</p>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener('DOMContentLoaded', cargarDatos);