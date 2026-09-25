"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscripcionMemoriaRepository = void 0;
const common_1 = require("@nestjs/common");
const gimnasio_seed_1 = require("../../datos/gimnasio.seed");
let InscripcionMemoriaRepository = class InscripcionMemoriaRepository {
    inscripciones = [];
    siguienteId = 1;
    async listar() {
        return this.inscripciones;
    }
    async buscarPorId(id) {
        return this.inscripciones.find((i) => i.id === id) ?? null;
    }
    async buscarPorHorario(horarioId) {
        return this.inscripciones.filter((i) => i.horarioId === horarioId);
    }
    async buscarHorario(horarioId) {
        return gimnasio_seed_1.HORARIOS.find((h) => h.id === horarioId) ?? null;
    }
    async buscarMiembro(miembroId) {
        return gimnasio_seed_1.MIEMBROS.find((m) => m.id === miembroId) ?? null;
    }
    async guardar(datos) {
        const nueva = {
            id: this.siguienteId++,
            horarioId: datos.horarioId,
            miembroId: datos.miembroId,
            estado: 'confirmada',
            creadaEn: new Date(),
        };
        this.inscripciones.push(nueva);
        return nueva;
    }
    async cancelar(id) {
        const inscripcion = this.inscripciones.find((i) => i.id === id);
        if (!inscripcion)
            return null;
        inscripcion.estado = 'cancelada';
        return inscripcion;
    }
};
exports.InscripcionMemoriaRepository = InscripcionMemoriaRepository;
exports.InscripcionMemoriaRepository = InscripcionMemoriaRepository = __decorate([
    (0, common_1.Injectable)()
], InscripcionMemoriaRepository);
//# sourceMappingURL=inscripcion-memoria.repository.js.map