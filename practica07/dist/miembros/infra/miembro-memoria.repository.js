"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiembroMemoriaRepository = void 0;
const common_1 = require("@nestjs/common");
let MiembroMemoriaRepository = class MiembroMemoriaRepository {
    miembros = [
        { id: 1, nombre: 'Karla Duarte', correo: 'karla@itson.mx', membresia: 'premium', activo: true },
        { id: 2, nombre: 'Omar Valdez', correo: 'omar@itson.mx', membresia: 'plus', activo: true },
        { id: 3, nombre: 'Sofia Ibarra', correo: 'sofia@itson.mx', membresia: 'basica', activo: true },
    ];
    siguienteId = 4;
    async listar() {
        return this.miembros;
    }
    async buscarPorId(id) {
        return this.miembros.find((miembro) => miembro.id === id) ?? null;
    }
    async crear(datos) {
        const nuevo = { id: this.siguienteId++, ...datos, activo: true };
        this.miembros.push(nuevo);
        return nuevo;
    }
    async actualizar(id, datos) {
        const indice = this.miembros.findIndex((miembro) => miembro.id === id);
        if (indice === -1)
            return null;
        this.miembros[indice] = { ...this.miembros[indice], ...datos };
        return this.miembros[indice];
    }
    async eliminar(id) {
        const indice = this.miembros.findIndex((miembro) => miembro.id === id);
        if (indice === -1)
            return null;
        return this.miembros.splice(indice, 1)[0];
    }
};
exports.MiembroMemoriaRepository = MiembroMemoriaRepository;
exports.MiembroMemoriaRepository = MiembroMemoriaRepository = __decorate([
    (0, common_1.Injectable)()
], MiembroMemoriaRepository);
//# sourceMappingURL=miembro-memoria.repository.js.map