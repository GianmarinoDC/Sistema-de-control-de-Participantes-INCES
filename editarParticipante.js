    // Función para cargar la tabla de participantes
    function cargarTabla() {
        $.ajax({
            url: '../../app/controlador/obtenerParticipantes.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                let rows = '';
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(participante => {
                        const estado = participante.estado === 'En formación' ?
                            '<span class="badge bg-success">En formación</span>' :
                            participante.estado === 'Inactivo' ?
                                '<span class="badge bg-danger">Inactivo</span>' :
                                participante.estado === 'En sistema' ?
                                    '<span class="badge bg-warning text-dark">En sistema</span>' :
                                    participante.estado === 'Asignado' ?
                                        '<span class="badge bg-primary">Asignado</span>' :
                                        participante.estado;
    
                        rows += `
                            <tr>
                                <td>${participante.id_participante}</td>
                                <td>${participante.cedula}</td>
                                <td>${participante.nombre}</td>
                                <td>${participante.apellido}</td>
                                <td>${participante.genero}</td>
                                <td>${participante.edad}</td>
                                <td>${participante.correo}</td>
                                <td>${estado}</td>
                                <td><!-- Botones de acción -->
                                    <a href="#"><button class='button view' title="Ver Participante"  data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-viewParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-binoculars' viewBox='0 0 16 16'>
                                    <path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z'/>
                                    </svg></button></a>

                                    <a href="#"><button class='button curso' title="Asignar Curso"  data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-AsignarCursoParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-journal-bookmark-fill' viewBox='0 0 16 16'>
                                    <path fill-rule='evenodd' d='M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z'/>
                                    <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'/>
                                    <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'/>
                                    </svg></button></a>

                                    <a href="#"><button class='button edit' title="Editar Participante" data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-editParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                                    <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325'/>
                                    </svg></button></a>

                                    <a href="#"><button class='button delete' title="Eliminar Participante" data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-deleteParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-trash' viewBox='0 0 16 16'>
                                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z'/>
                                    <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z'/>
                                    </svg></button></a>
                                </td>
                            </tr>
                        `;
                    });
                } else if (data.error) {
                    rows = `<tr><td colspan="8" class="text-center">${data.message}</td></tr>`;
                } else {
                    rows = '<tr><td colspan="8" class="text-center">No hay participantes registrados</td></tr>';
                }
                $('#tabla-participantes tbody').html(rows);
                console.log("Entrando a lógica de ocultar botones según rol");
if (typeof userRole !== 'undefined') {
    console.log("Rol detectado:", userRole);

    if (userRole === 'Apoyo') {
        // Ocultar botón "Agregar Participantes"
        const btnAdd = document.getElementById('btn-addParticipante');
        if (btnAdd) {
            btnAdd.remove();
            console.log("Botón 'Agregar Participantes' eliminado");
        } else {
            console.log("Botón 'Agregar Participantes' no encontrado");
        }

        // Eliminar botones curso, edit y delete
        document.querySelectorAll('button.curso, button.edit, button.delete').forEach(boton => {
            console.log("Eliminando botón:", boton.className);
            boton.remove();
        });

        // Asegurar que solo quede botón 'view'
        document.querySelectorAll('button.view').forEach(boton => {
            const td = boton.closest('td');
            if (td) {
                td.innerHTML = '';
                td.appendChild(boton);
                console.log("Botón 'view' conservado");
            }
        });
    } else {
        console.log("El rol no es 'Apoyo'; no se eliminan botones.");
    }
} else {
    console.error("userRole no está definido. ¿Insertaste el <script> PHP antes del archivo JS?");
}

            },
            error: function (xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
                console.error('Respuesta del servidor:', xhr.responseText);
            }
        });
    }

// FORMULARIO DE EDICIÓN - CÓDIGO COMPLETO
$(document).ready(function() {
    const $formEdit = $('#form-editar-participante'); // Referencia principal al formulario

    // Funciones de validación contextualizadas
    function mostrarError(campoId, mensaje) {
        $formEdit.find(`#${campoId}`).addClass('is-invalid').removeClass('is-valid');
        $formEdit.find(`#error-${campoId}`).text(mensaje).show();
    }

    function mostrarValido(campoId) {
        $formEdit.find(`#${campoId}`).addClass('is-valid').removeClass('is-invalid');
        $formEdit.find(`#error-${campoId}`).text('').hide();
    }

    // Validaciones específicas para este formulario
    const validaciones = {
        cedula: async () => {
            const valor = $formEdit.find('#cedula-Edit').val().trim();
            const idParticipante = $formEdit.find('#idParticipante').val();
            
            if (!/^\d{7,8}$/.test(valor)) {
                mostrarError('cedula-Edit', 'Cédula inválida (7-8 dígitos)');
                return false;
            }
            
            try {
                const response = await fetch(`../../app/controlador/verificarcedulaeditar.php?cedula=${valor}&idParticipante=${idParticipante}`);
                const data = await response.json();
                
                if (data.existe) {
                    mostrarError('cedula-Edit', 'Cédula ya registrada');
                    return false;
                }
                
                mostrarValido('cedula-Edit');
                return true;
            } catch (error) {
                console.error('Error:', error);
                mostrarError('cedula-Edit', 'Error verificando cédula');
                return false;
            }
        },

        nombre: () => validarCampoTexto('nombre-Edit', $formEdit.find('#nombre-Edit').val().trim()),
        apellido: () => validarCampoTexto('apellido-Edit', $formEdit.find('#apellido-Edit').val().trim()),
        
        telefono: () => {
            let valor = $formEdit.find('#telefono-Edit').val().trim();
            if (!/^0/.test(valor)) valor = '0' + valor;
            $formEdit.find('#telefono-Edit').val(valor);
            
            const regex = /^(0412|0414|0416|0424|0426|0293)\d{7}$/;
            return regex.test(valor) 
                ? (mostrarValido('telefono-Edit'), true) 
                : (mostrarError('telefono-Edit', 'Formato válido: 0412 | 0414 | 0416 | 0424 | 0426 | 0293'), false);
        },

        fechaNacimiento: () => {
            const fecha = new Date($formEdit.find('#fechaNacimiento-Edit').val());
            const hoy = new Date();
            const minEdad = new Date(hoy.getFullYear() - 75, hoy.getMonth(), hoy.getDate());
            const maxEdad = new Date(hoy.getFullYear() - 14, hoy.getMonth(), hoy.getDate());
            
            if (!$formEdit.find('#fechaNacimiento-Edit').val()) {
                mostrarError('fechaNacimiento-Edit', 'Campo obligatorio');
                return false;
            }
            if (fecha > hoy) {
                mostrarError('fechaNacimiento-Edit', 'Fecha futura no permitida');
                return false;
            }
            if (fecha < minEdad || fecha > maxEdad) {
                mostrarError('fechaNacimiento-Edit', 'Edad debe ser entre 14 y 75 años');
                return false;
            }
            mostrarValido('fechaNacimiento-Edit');
            return true;
        },

        genero: () => {
            const isValid = $formEdit.find('input[name="genero"]:checked').length > 0;
            return isValid 
                ? (mostrarValido('genero'), true) 
                : (mostrarError('genero', 'Seleccione un género'), false);
        },

        correo: () => {
            const valor = $formEdit.find('#correo-Edit').val().trim();
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(valor) 
                ? (mostrarValido('correo-Edit'), true) 
                : (mostrarError('correo-Edit', 'Correo inválido'), false);
        },

        grado: () => {
            const isValid = $formEdit.find('#grado_institucion').val() !== "";
            return isValid 
                ? (mostrarValido('grado_institucion'), true) 
                : (mostrarError('grado_institucion', 'Seleccione un grado'), false);
        }
    };

    // Función auxiliar para validar campos de texto
    function validarCampoTexto(campoId, valor) {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/;
        return regex.test(valor) 
            ? (mostrarValido(campoId), true) 
            : (mostrarError(campoId, 'Solo letras válidas'), false);
    }

    // Eventos de validación
    $formEdit.find('#cedula-Edit').on('input', validaciones.cedula);
    $formEdit.find('#nombre-Edit').on('input', validaciones.nombre);
    $formEdit.find('#apellido-Edit').on('input', validaciones.apellido);
    $formEdit.find('#telefono-Edit').on('input', validaciones.telefono);
    $formEdit.find('#fechaNacimiento-Edit').on('change', validaciones.fechaNacimiento);
    $formEdit.find('input[name="genero"]').on('change', validaciones.genero);
    $formEdit.find('#correo-Edit').on('input', validaciones.correo);
    $formEdit.find('#grado_institucion').on('change', validaciones.grado);

    // Cargar datos en el modal
    $(document).on('click', '.button.edit', function() {
        const idParticipante = $(this).data('id');
        
        fetch(`../../app/controlador/obtenerParticipanteEditar.php?id=${idParticipante}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) return toastr.error(data.error);
                
                // Formatear teléfono
                const telefono = data.telefono 
                    ? String(data.telefono).padStart(10, '0') 
                    : '';
                
                // Llenar formulario
                $formEdit.find('#idParticipante').val(data.id_participante);
                $formEdit.find(`input[name="genero"][value="${data.genero}"]`).prop('checked', true);
                $formEdit.find('#nombre-Edit').val(data.nombre);
                $formEdit.find('#apellido-Edit').val(data.apellido);
                $formEdit.find('#cedula-Edit').val(data.cedula);
                $formEdit.find('#telefono-Edit').val(telefono);
                $formEdit.find('#correo-Edit').val(data.correo);
                $formEdit.find('#fechaNacimiento-Edit').val(data.fecha_nacimiento);
                $formEdit.find('#grado_institucion').val(data.grado_institucion);

                $('#modal-editParticipante').modal('show');
            })
            .catch(error => toastr.error('Error al cargar datos: ' + error.message));
    });

    // Envío del formulario
    $formEdit.on('submit', async function(e) {
        e.preventDefault();
        
        // Ejecutar validaciones
        const resultados = await Promise.all([
            validaciones.cedula(),
            validaciones.nombre(),
            validaciones.apellido(),
            validaciones.telefono(),
            validaciones.fechaNacimiento(),
            validaciones.genero(),
            validaciones.correo(),
            validaciones.grado()
        ]);

        if (resultados.every(r => r)) {
            const formData = new FormData(this);
            
            try {
                const response = await fetch('../../app/controlador/editarParticipante.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                
                if (data.success) {
                    $('#modal-editParticipante').modal('hide');
                    cargarTabla();
                    toastr.success("Participante actualizado correctamente");
                } else {
                    toastr.error(data.message || "Error en la actualización");
                }
            } catch (error) {
                toastr.error("Error de conexión: " + error.message);
            }
        } else {
            toastr.warning("Complete los campos requeridos correctamente");
        }
    });

    // Limpiar formulario al cerrar
    $('#modal-editParticipante').on('hidden.bs.modal', function() {
        $formEdit[0].reset();
        $formEdit.find('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
        $formEdit.find('.error-feedback').hide();
    });
});