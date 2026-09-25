"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscripcionesService = void 0;
const common_1 = require("@nestjs/common");
const inscripciones_tokens_1 = require("./infra/inscripciones.tokens.");
const errores_1 = require("./dominio/errores");
let InscripcionesService = class InscripcionesService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    listar() {
        return this.repository.listar();
    }
    buscar(id) {
        return this.repository.buscarPorId(id);
    }
    async crear(dto) {
        const horario = await this.repository.buscarHorario(dto.horarioId);
        if (!horario) {
            throw new errores_1.HorarioNoEncontradoError(dto.horarioId);
        }
        const miembro = await this.repository.buscarMiembro(dto.miembroId);
        if (!miembro) {
            throw new errores_1.MiembroNoEncontradoError(dto.miembroId);
        }
        const delHorario = await this.repository.buscarPorHorario(dto.horarioId);
        const yaInscrito = delHorario.some((inscripcion) => inscripcion.miembroId ===
            dto.miembroId && inscripcion.estado !== 'cancelada');
        if (yaInscrito) {
            throw new errores_1.InscripcionDuplicadaError(dto.horarioId, dto.miembroId);
        }
        const confirmadas = delHorario.filter((i) => i.estado === 'confirmada').length;
        if (confirmadas >= horario.cupoMaximo) {
            throw new errores_1.CupoLlenoError(dto.horarioId, horario.cupoMaximo);
        }
        return this.repository.guardar({ horarioId: dto.horarioId, miembroId: dto.miembroId });
    }
    cancelar(id) {
        return this.repository.cancelar(id);
    }
};
exports.InscripcionesService = InscripcionesService;
exports.InscripcionesService = InscripcionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(inscripciones_tokens_1.INSCRIPCION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], InscripcionesService);
//# sourceMappingURL=inscripciones.service.js.map