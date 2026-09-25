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
exports.MiembrosService = void 0;
const common_1 = require("@nestjs/common");
const miembros_tokens_1 = require("./miembros.tokens");
let MiembrosService = class MiembrosService {
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
    crear(datos) {
        return this.repository.crear(datos);
    }
    actualizar(id, datos) {
        return this.repository.actualizar(id, datos);
    }
    eliminar(id) {
        return this.repository.eliminar(id);
    }
};
exports.MiembrosService = MiembrosService;
exports.MiembrosService = MiembrosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(miembros_tokens_1.MIEMBRO_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], MiembrosService);
//# sourceMappingURL=miembros.service.js.map