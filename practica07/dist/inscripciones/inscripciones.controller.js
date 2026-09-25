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
exports.InscripcionesController = void 0;
const common_1 = require("@nestjs/common");
const inscripciones_service_1 = require("./inscripciones.service");
const inscripcion_respuesta_dto_1 = require("./dto/inscripcion-respuesta.dto");
const errores_1 = require("./dominio/errores");
let InscripcionesController = class InscripcionesController {
    sercivio;
    constructor(sercivio) {
        this.sercivio = sercivio;
    }
    async listar() {
        const lista = await this.sercivio.listar();
        return lista.map(inscripcion_respuesta_dto_1.aInscripcionDto);
    }
    async buscar(id) {
        const inscripcion = await this.sercivio.buscar(parseInt(id));
        if (!inscripcion) {
            throw new common_1.NotFoundException(`No se encontró la inscripción con id ${id}`);
        }
        return (0, inscripcion_respuesta_dto_1.aInscripcionDto)(inscripcion);
    }
    async crear(dto, res) {
        if (!Number.isInteger(dto.horarioId) || !Number.isInteger(dto.miembroId)) {
            throw new common_1.BadRequestException('Los campos horarioId y miembroId deben ser números enteros');
        }
        try {
            const inscripcion = await this.sercivio.crear(dto);
            res.setHeader('Location', `/inscripciones/${inscripcion.id}`);
            return (0, inscripcion_respuesta_dto_1.aInscripcionDto)(inscripcion);
        }
        catch (error) {
            if (error instanceof errores_1.HorarioNoEncontradoError || error instanceof errores_1.MiembroNoEncontradoError) {
                throw new common_1.NotFoundException(error.message);
            }
            if (error instanceof errores_1.InscripcionDuplicadaError || error instanceof errores_1.CupoLlenoError) {
                throw new common_1.ConflictException(error.message);
            }
            throw error;
        }
    }
    async cancelar(id) {
        const cancelada = await this.sercivio.cancelar(Number(id));
        if (!cancelada) {
            throw new common_1.NotFoundException(`No se encontró la inscripción con id ${id}`);
        }
        return (0, inscripcion_respuesta_dto_1.aInscripcionDto)(cancelada);
    }
};
exports.InscripcionesController = InscripcionesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InscripcionesController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)('id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InscripcionesController.prototype, "buscar", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InscripcionesController.prototype, "crear", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InscripcionesController.prototype, "cancelar", null);
exports.InscripcionesController = InscripcionesController = __decorate([
    (0, common_1.Controller)('inscripciones'),
    __metadata("design:paramtypes", [inscripciones_service_1.InscripcionesService])
], InscripcionesController);
//# sourceMappingURL=inscripciones.controller.js.map