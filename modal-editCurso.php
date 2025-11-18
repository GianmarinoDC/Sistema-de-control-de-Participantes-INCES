<!-- Modal Agregar Participante -->
<div class="modal fade" id="modal-editCurso" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-editCurso">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Editar Curso</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <section>
                    <form id="form_editCurso" class="row g-3 " novalidate method="POST">
                        
                        <!-- Campos ocultos para valores fijos -->
                        <input type="hidden" name="tipo_formacion-Edit" value="Unidad Curricular">
                        <input type="hidden" name="id_curso" id="id_curso">
                        <input type="hidden" name="programa_formacion-Edit" value="Programa de Formación Productiva (PFP)">
                        
                        <!-- Nombre y Modalidad -->
                        <div class="col-md-6 mb-2">
                            <label for="nombre-Edit" class="form-label">Nombre Curso</label>
                            <input class="form-control form-control-sm" type="text" name="nombre_curso-Edit" id="nombre_curso-Edit" required>
                            <div class="error-feedback text-danger" id="error-nombre_curso-Edit"></div>
                        </div>
                        
                        <div class="col-md-6 mb-2">
                            <label for="id_modalidad-Edit" class="form-label">Modalidad</label>
                            <select class="form-select form-select-sm" id="id_modalidad-Edit" name="id_modalidad-Edit" required>
                                <option value="">Seleccione</option>
                                <?php
                                $modalidades = $conn->query("SELECT * FROM tb_modalidad")->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($modalidades as $modalidad) {
                                    echo "<option value='{$modalidad['id_modalidad']}'>{$modalidad['nombre_modalidad']}</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_modalidad-Edit"></div>
                        </div>

                        <!-- Motor y Área Formativa -->
                        <div class="col-md-6 mb-2">
                            <label for="id_motor-Edit" class="form-label">Motor de Formación</label>
                            <select class="form-select form-select-sm" id="id_motor-Edit" name="id_motor-Edit" required>
                                <option value="">Seleccione</option>
                                <?php
                                $motores = $conn->query("SELECT * FROM tb_motor")->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($motores as $motor) {
                                    echo "<option value='{$motor['id_motor']}'>{$motor['nombre_motor']}</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_motor-Edit"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="id_areaFormativa-Edit" class="form-label">Área Formativa</label>
                            <select class="form-select form-select-sm" id="id_areaFormativa-Edit" name="id_areaFormativa-Edit" required>
                                <option value="">Seleccione</option>
                                <?php
                                $areaFormativas = $conn->query("SELECT * FROM tb_areaformativa")->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($areaFormativas as $areaFormativa) {
                                    echo "<option value='{$areaFormativa['id_areaFormativa']}'>{$areaFormativa['nombre_areaFormativa']}</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_areaFormativa-Edit"></div>
                        </div>

                        <!-- Sector Económico y Subtipo -->
                        <div class="col-md-6 mb-2">
                            <label for="sectoreconomico-Edit" class="form-label">Sector Económico</label>
                            <select class="form-select form-select-sm" id="sectoreconomico-Edit" name="sectoreconomico-Edit" required>
                                <option value="">Seleccione</option>
                                <option value="Comercio y Servicios">Comercio y Servicios</option>
                                <option value="Industria">Industria</option>
                                <option value="Investigación, Desarrollo, Innovación e Información">Investigación, Desarrollo, Innovación e Información</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-sectoreconomico-Edit"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="subtipo-Edit" class="form-label">Subtipo</label>
                            <select class="form-select form-select-sm" id="subtipo-Edit" name="subtipo-Edit" required>
                                <option value="">Seleccione</option>
                                <option value="ESPECÍFICA/TÉCNICA">ESPECÍFICA/TÉCNICA</option>
                                <option value="TRANSVERSAL/GENÉRICA">TRANSVERSAL/GENÉRICA</option>
                                <option value="BÁSICA/COMÚN">BÁSICA/COMÚN</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-subtipo-Edit"></div>
                        </div>

                        <!-- Ámbito y Turno -->
                        <div class="col-md-6 mb-2">
                            <label for="ambito-Edit" class="form-label">Ámbito</label>
                            <select class="form-select form-select-sm" id="ambito-Edit" name="ambito-Edit" required>
                                <option value="">Seleccione</option>
                                <option value="Centro de Formacion Socialista">Centro de Formación Socialista</option>
                                <option value="Comunas">Comunas</option>
                                <option value="Instalaciones Militares">Instalaciones Militares</option>
                                <option value="Unidades educativas">Unidades educativas</option>
                                <option value="Sistema de Misiones y Grandes Misiones">Sistema de Misiones y Grandes Misiones</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-ambito-Edit"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="turno-Edit" class="form-label">Turno</label>
                            <select class="form-select form-select-sm" id="turno-Edit" name="turno-Edit" required>
                                <option value="">Seleccione</option>
                                <option value="Mañana">Mañana</option>
                                <option value="Tarde">Tarde</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-turno-Edit"></div>
                        </div>

                        <!-- Fechas y Participantes -->
                        <div class="col-md-6 mb-2">
                            <label for="fecha_inicio-Edit" class="form-label">Fecha de Inicio</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_inicio-Edit" name="fecha_inicio-Edit" required>
                            <div class="error-feedback text-danger" id="error-fecha_inicio-Edit"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="fecha_fin-Edit" class="form-label">Fecha de Culminación</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_fin-Edit" name="fecha_fin-Edit" required>
                            <div class="error-feedback text-danger" id="error-fecha_fin-Edit"></div>
                        </div>

                        <div class="col-md-12 mb-2">
                            <label for="max_participantes-Edit" class="form-label">Máximo de Participantes</label>
                            <input class="form-control form-control-sm" type="number" name="max_participantes-Edit" id="max_participantes-Edit" required>
                            <div class="error-feedback text-danger" id="error-max_participantes-Edit"></div>
                        </div>

                        <!-- Botón de envío -->
                        <div class="col-12">
                            <button id="actualizar-tabla-Edit" class="btn-submmit text-white" type="submit">Actualizar datos del Curso</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</div>