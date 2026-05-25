import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  @IsString()
  @IsOptional()
  culturalHistory?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  category: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  technique?: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
