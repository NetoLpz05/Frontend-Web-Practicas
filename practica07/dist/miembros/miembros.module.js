"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiembrosModule = void 0;
const common_1 = require("@nestjs/common");
const miembro_memoria_repository_1 = require("./infra/miembro-memoria.repository");
const miembros_controller_1 = require("./miembros.controller");
const miembros_service_1 = require("./miembros.service");
const miembros_tokens_1 = require("./miembros.tokens");
let MiembrosModule = class MiembrosModule {
};
exports.MiembrosModule = MiembrosModule;
exports.MiembrosModule = MiembrosModule = __decorate([
    (0, common_1.Module)({
        controllers: [miembros_controller_1.MiembrosController],
        providers: [
            miembros_service_1.MiembrosService,
            {
                provide: miembros_tokens_1.MIEMBRO_REPOSITORY,
                useClass: miembro_memoria_repository_1.MiembroMemoriaRepository,
            },
        ],
    })
], MiembrosModule);
//# sourceMappingURL=miembros.module.js.map