"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasesService = void 0;
const common_1 = require("@nestjs/common");
const clases = [
    { id: 1, nombre: 'Yoga' },
    { id: 2, nombre: 'Pilates' },
    { id: 3, nombre: 'Spinning' },
];
let ClasesService = class ClasesService {
    listar() {
        return clases;
    }
    crear(nombre) {
        const nueva = { id: clases.length + 1, nombre };
        clases.push(nueva);
        return nueva;
    }
};
exports.ClasesService = ClasesService;
exports.ClasesService = ClasesService = __decorate([
    (0, common_1.Injectable)()
], ClasesService);
//# sourceMappingURL=clases.service.js.map