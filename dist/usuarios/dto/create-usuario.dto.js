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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUsuarioDto {
    nombre;
    apellido;
    identificacion;
    password;
    email;
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(8, 20),
    (0, class_validator_1.Matches)(/^(?!.*[\W_])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,20}$/, {
        message: 'El nombre de usuario debe tener al menos un número, una mayúscula, no contener signos y tener entre 8 y 20 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(8, 20),
    (0, class_validator_1.Matches)(/^(?!.*[\W_])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,20}$/, {
        message: 'El nombre de usuario debe tener al menos un número, una mayúscula, no contener signos y tener entre 8 y 20 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "apellido", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(10, 10, { message: 'La identificación debe tener exactamente 10 dígitos.' }),
    (0, class_validator_1.Matches)(/^(?!.*(\d)\1{3})\d{10}$/, {
        message: 'La identificación no puede contener el mismo número repetido 4 veces seguidas.',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "identificacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`_]).{8,}$/, {
        message: 'La contraseña debe tener al menos una mayúscula, un signo y no debe contener espacios.',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
//# sourceMappingURL=create-usuario.dto.js.map