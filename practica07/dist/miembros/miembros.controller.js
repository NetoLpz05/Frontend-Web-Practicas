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
exports.MiembrosController = void 0;
const common_1 = require("@nestjs/common");
const miembros_service_1 = require("./miembros.service");
let MiembrosController = class MiembrosController {
    miembrosService;
    constructor(miembrosService) {
        this.miembrosService = miembrosService;
    }
    listar() {
        return this.miembrosService.listar();
    }
    async buscar(id) {
        const miembro = await this.miembrosService.buscar(id);
        if (!miembro) {
            throw new common_1.NotFoundException(`No se encontró el miembro con id ${id}`);
        }
        return miembro;
    }
    crear(datos) {
        return this.miembrosService.crear(datos);
    }
    async actualizar(id, datos) {
        const miembro = await this.miembrosService.actualizar(id, datos);
        if (!miembro) {
            throw new common_1.NotFoundException(`No se encontró el miembro con id ${id}`);
        }
        return miembro;
    }
    async eliminar(id) {
        const miembro = await this.miembrosService.eliminar(id);
        if (!miembro) {
            throw new common_1.NotFoundException(`No se encontró el miembro con id ${id}`);
        }
        return miembro;
    }
};
exports.MiembrosController = MiembrosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MiembrosController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MiembrosController.prototype, "buscar", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MiembrosController.prototype, "crear", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MiembrosController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MiembrosController.prototype, "eliminar", null);
exports.MiembrosController = MiembrosController = __decorate([
    (0, common_1.Controller)('miembros'),
    __metadata("design:paramtypes", [miembros_service_1.MiembrosService])
], MiembrosController);
//# sourceMappingURL=miembros.controller.js.map