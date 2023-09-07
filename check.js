document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkStatus').addEventListener('click', function() {
        
        // Comprobar el estado de la página principal
        $.get('https://amn-webui.vercel.app/')
            .done(function() {
                // Página activa
                $('#pageStatusIcon').html('<i class="fas fa-circle text-success"></i>');
            })
            .fail(function() {
                // Página inactiva
                $('#pageStatusIcon').html('<i class="fas fa-circle text-danger"></i>');
            });

        // Comprobar el estado del API de la página
        $.get('https://api.loclx.io/api/v1')
            .done(function() {
                // API activo
                $('#apiStatusIcon').html('<i class="fas fa-circle text-success"></i>');
            })
            .fail(function() {
                // API inactivo
                $('#apiStatusIcon').html('<i class="fas fa-circle text-danger"></i>');
            });
        
        // Comprobar el estado del API de Face
        $.get('https://faceauth.loclx.io/')
            .done(function() {
                // API activo
                $('#faceApiStatusIcon').html('<i class="fas fa-circle text-success"></i>');
            })
            .fail(function() {
                // API inactivo
                $('#faceApiStatusIcon').html('<i class="fas fa-circle text-danger"></i>');
            });
    });
});
