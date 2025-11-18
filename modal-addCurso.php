<!-- Modal Agregar Participante -->
<div class="modal fade" id="modal-addCurso" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-addCurso">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Crear Nuevo Curso</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <section>
                    <form id="form-curso" class="row g-3 " novalidate method="POST" action="/Sistema%20de%20Control%20de%20Participantes/app/controlador/Curso/CargarCurso.php">
                        
                        <!-- Campos ocultos para valores fijos -->
                        <input type="hidden" name="tipo_formacion" value="Unidad Curricular">
                        <input type="hidden" name="programa_formacion" value="Programa de Formación Productiva (PFP)">
                        
                        <!-- Nombre y Modalidad -->
                        <div class="col-md-6 mb-2">
                            <label for="nombre" class="form-label">Nombre Curso</label>
                            <input class="form-control form-control-sm" type="text" name="nombre_curso" id="nombre_curso" required>
                            <div class="error-feedback text-danger" id="error-nombre_curso"></div>
                        </div>

                        <div class="col-md-6 mb-2">
    <label for="id_docente" class="form-label">Docente</label>
    <select class="form-select form-select-sm" id="id_docente" name="id_docente" required>
        <option value="">Seleccione docente</option>
        <?php
        // Traer todos los docentes
        $docentes = $conn
            ->query("SELECT id_docente, CONCAT(nombre, ' ', apellido) AS nombre_completo FROM tb_docente")
            ->fetchAll(PDO::FETCH_ASSOC);

        if (count($docentes) > 0) {
            foreach ($docentes as $doc) {
                echo "<option value=\"{$doc['id_docente']}\">{$doc['nombre_completo']}</option>";
            }
        } else {
            // Si no hay registros
            echo '<option disabled>No hay docentes registrados</option>';
        }
        ?>
    </select>
    <div class="error-feedback text-danger" id="error-id_docente"></div>
</div>

                        
                        <div class="col-md-6 mb-2">
                            <label for="id_modalidad" class="form-label">Modalidad</label>
                            <select class="form-select form-select-sm" id="id_modalidad" name="id_modalidad" required>
                                <option value="">Seleccione</option>
                                <?php
                                $modalidades = $conn->query("SELECT * FROM tb_modalidad")->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($modalidades as $modalidad) {
                                    echo "<option value='{$modalidad['id_modalidad']}'>{$modalidad['nombre_modalidad']}</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_modalidad"></div>
                        </div>

                        <!-- Motor y Área Formativa -->
                        <div class="col-md-6 mb-2">
                            <label for="id_motor" class="form-label">Motor de Formación</label>
                            <select class="form-select form-select-sm" id="id_motor" name="id_motor" required>
                                <option value="">Seleccione</option>
                                <?php
                                $motores = $conn->query("SELECT * FROM tb_motor")->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($motores as $motor) {
                                    echo "<option value='{$motor['id_motor']}'>{$motor['nombre_motor']}</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_motor"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="id_areaFormativa" class="form-label">Área Formativa</label>
                            <select class="form-select form-select-sm" id="id_areaFormativa" name="id_areaFormativa" required>
                                <option value="">Seleccione</option>
                                <?php
                                $areaFormativas = $conn->query("SELECT * FROM tb_areaformativa")->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($areaFormativas as $areaFormativa) {
                                    echo "<option value='{$areaFormativa['id_areaFormativa']}'>{$areaFormativa['nombre_areaFormativa']}</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_areaFormativa"></div>
                        </div>

                        <!-- Sector Económico y Subtipo -->
                        <div class="col-md-6 mb-2">
                            <label for="sectoreconomico" class="form-label">Sector Económico</label>
                            <select class="form-select form-select-sm" id="sectoreconomico" name="sectoreconomico" required>
                                <option value="">Seleccione</option>
                                <option value="Comercio y Servicios">Comercio y Servicios</option>
                                <option value="Industria">Industria</option>
                                <option value="Investigación, Desarrollo, Innovación e Información">Investigación, Desarrollo, Innovación e Información</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-sectoreconomico"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="subtipo" class="form-label">Subtipo</label>
                            <select class="form-select form-select-sm" id="subtipo" name="subtipo" required>
                                <option value="">Seleccione</option>
                                <option value="ESPECÍFICA/TÉCNICA">ESPECÍFICA/TÉCNICA</option>
                                <option value="TRANSVERSAL/GENÉRICA">TRANSVERSAL/GENÉRICA</option>
                                <option value="BÁSICA/COMÚN">BÁSICA/COMÚN</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-subtipo"></div>
                        </div>

                        <!-- Ámbito y Turno -->
                        <div class="col-md-6 mb-2">
                            <label for="ambito" class="form-label">Ámbito</label>
                            <select class="form-select form-select-sm" id="ambito" name="ambito" required>
                                <option value="">Seleccione</option>
                                <option value="Centro de Formacion Socialista">Centro de Formación Socialista</option>
                                <option value="Comunas">Comunas</option>
                                <option value="Instalaciones Militares">Instalaciones Militares</option>
                                <option value="Unidades educativas">Unidades educativas</option>
                                <option value="Sistema de Misiones y Grandes Misiones">Sistema de Misiones y Grandes Misiones</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-ambito"></div>
                        </div>


                        <!-- Fechas y Participantes -->
                        <div class="col-md-6 mb-2">
                            <label for="fecha_inicio" class="form-label">Fecha de Inicio</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_inicio" name="fecha_inicio" required>
                            <div class="error-feedback text-danger" id="error-fecha_inicio"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="fecha_fin" class="form-label">Fecha de Culminación</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_fin" name="fecha_fin" required>
                            <div class="error-feedback text-danger" id="error-fecha_fin"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="turno" class="form-label">Turno</label>
                            <select class="form-select form-select-sm" id="turno" name="turno" required>
                                <option value="">Seleccione</option>
                                <option value="Mañana">Mañana</option>
                                <option value="Tarde">Tarde</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-turno"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="max_participantes" class="form-label">Máximo de Participantes</label>
                            <input class="form-control form-control-sm" type="number" name="max_participantes" id="max_participantes" required>
                            <div class="error-feedback text-danger" id="error-max_participantes"></div>
                        </div>

                        <!-- Botón de envío -->
                        <div class="col-12">
                            <button id="actualizar-tabla" class="btn-submmit text-white" type="submit">Registrar Nuevo Curso</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</div>