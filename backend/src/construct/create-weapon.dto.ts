import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateWeaponDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  damage: number;
}
