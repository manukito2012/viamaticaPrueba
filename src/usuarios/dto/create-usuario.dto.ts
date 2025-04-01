import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";


export class CreateUsuarioDto {


    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    @Matches(/^(?!.*[\W_])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,20}$/, {
        message:
            'El nombre de usuario debe tener al menos un número, una mayúscula, no contener signos y tener entre 8 y 20 caracteres.',
    })
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    @Matches(/^(?!.*[\W_])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,20}$/, {
        message:
            'El apellido de usuario debe tener al menos un número, una mayúscula, no contener signos y tener entre 8 y 20 caracteres.',
    })
    apellido: string;


    @IsString() 
    @IsNotEmpty()
    @Length(10, 10, { message: 'La identificación debe tener exactamente 10 dígitos.' })
    @Matches(/^(?!.*(\d)\1{3})\d{10}$/, {
        message: 'La identificación no puede contener el mismo número repetido 4 veces seguidas.',
    })
    identificacion: string;



    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`_]).{8,}$/,{
        message: 'La contraseña debe tener al menos una mayúscula, un signo y no debe contener espacios.',
    })
    password: string;

    @IsEmail() 
    @IsOptional()
    email: string;
}
