"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscripcionesModule = void 0;
const common_1 = require("@nestjs/common");
const inscripciones_controller_1 = require("./inscripciones.controller");
const inscripciones_service_1 = require("./inscripciones.service");
const inscripciones_tokens_1 = require("./infra/inscripciones.tokens.");
const inscripcion_memoria_repository_1 = require("./infra/inscripcion-memoria.repository");
let InscripcionesModule = class InscripcionesModule {
};
exports.InscripcionesModule = InscripcionesModule;
exports.InscripcionesModule = InscripcionesModule = __decorate([
    (0, common_1.Module)({
        controllers: [inscripciones_controller_1.InscripcionesController],
        providers: [inscripciones_service_1.InscripcionesService, {
                provide: inscripciones_tokens_1.INSCRIPCION_REPOSITORY,
                useClass: inscripcion_memoria_repository_1.InscripcionMemoriaRepository,
            }],
    })
], InscripcionesModule);
//# sourceMappingURL=inscripciones.module.js.map