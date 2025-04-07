import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {


    @IsOptional()
    @IsEnum(['activo', 'bloqueado'])
    status?: 'activo' | 'bloqueado';
}

