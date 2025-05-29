import { IsInt, IsString, Min, IsNotEmpty } from 'class-validator';

export class CreateConstructUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  health: number;

  @IsInt()
  @Min(0)
  psih: number;

  @IsInt()
  @Min(0)
  speed: number;

  @IsInt()
  @Min(0)
  manevr: number;
}
