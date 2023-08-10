document.getElementById('checkStatus').addEventListener('click', async function() {
    const apiUrl = document.getElementById('apiUrl').value;

    if(!apiUrl) {
        alert('Por favor, introduce una URL.');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                "accept": "application/json"
            }
        });

        if (response.ok) {
            alert('La API está activa y funcionando correctamente.');
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        alert('No se pudo contactar con la API. Por favor, verifica la URL e inténtalo de nuevo.');
    }
});
