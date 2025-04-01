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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema-users/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("bcrypt");
let UsuariosService = class UsuariosService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            let generarEmail = this.generateEmail(createUserDto.nombre, createUserDto.apellido);
            let existingUser = await this.userModel.findOne({ email: generarEmail });
            let counter = 1;
            while (existingUser) {
                generarEmail = this.generateEmail(createUserDto.nombre, createUserDto.apellido, counter);
                existingUser = await this.userModel.findOne({ email: generarEmail });
                counter++;
            }
            createUserDto.email = generarEmail;
            const { password } = createUserDto;
            const plainTohash = await (0, bcrypt_1.hash)(password, 10);
            createUserDto = { ...createUserDto, password: plainTohash };
            const userCreated = await this.userModel.create(createUserDto);
            console.log("usuario creado");
            console.log(userCreated);
            return {
                ...userCreated.toObject(),
                email: generarEmail,
            };
        }
        catch (error) {
            if (error.code === 11000) {
                console.log("error de correo ya esta registrado ", error);
            }
            throw error;
        }
    }
    generateEmail(nombre, apellido, counter = 0) {
        const primercaracterName = nombre.charAt(0).toLowerCase();
        const formattedApellido = apellido.replace(/\s+/g, '').toLowerCase();
        let email = `${primercaracterName}${formattedApellido}@mail.com`;
        if (counter > 0) {
            email = `${primercaracterName}${formattedApellido}${counter}@mail.com`;
        }
        return email;
    }
    findAll() {
        return `This action returns all usuarios`;
    }
    findOne(id) {
        return `This action returns a #${id} usuario`;
    }
    update(id, updateUsuarioDto) {
        return `This action updates a #${id} usuario`;
    }
    remove(id) {
        return `This action removes a #${id} usuario`;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map