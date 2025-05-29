import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateArmorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  defense: number;
}
