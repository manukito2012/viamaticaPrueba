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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../usuarios/schema-users/user.schema");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const sessions_1 = require("./dto/sessions");
let AuthService = class AuthService {
    userModel;
    sessionModel;
    jwtService;
    constructor(userModel, sessionModel, jwtService) {
        this.userModel = userModel;
        this.sessionModel = sessionModel;
        this.jwtService = jwtService;
    }
    async login(createAuthDto) {
        const { email, password } = createAuthDto;
        const findUser = await this.userModel.findOne({ email });
        if (!findUser)
            throw new common_1.HttpException('USER_NOT_FOUND :(', 404);
        const checkPassword = await (0, bcrypt_1.compare)(password, findUser.password);
        if (!checkPassword)
            throw new common_1.HttpException('PASSWORD_INCORRECTO :(', 403);
        if (findUser.sessionId) {
            throw new common_1.HttpException('Ya tienes una sesión activa', 400);
        }
        const sessionId = this.jwtService.sign({ userId: findUser._id });
        const newSession = new this.sessionModel({
            userId: findUser._id,
            event: 'LOGIN',
            times: new Date(),
        });
        await newSession.save();
        findUser.sessionId = sessionId;
        await findUser.save();
        const payload = { id: findUser._id, name: findUser.email };
        const accessToken = this.jwtService.sign(payload);
        const data = {
            user: findUser,
            accessToken,
            sessionId
        };
        return data;
    }
    async logout(userId) {
        console.log("Cerrando sesión para el usuario:", userId);
        await this.sessionModel.create({
            userId,
            event: 'LOGOUT',
            timestamp: new Date(),
        });
        await this.userModel.updateOne({ _id: userId }, { $set: { sessionId: 1 } });
        console.log("Sesión cerrada, sessionId eliminado.");
    }
    async getSessions(userId) {
        return this.sessionModel.find({ userId }).exec();
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(sessions_1.Sesion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map