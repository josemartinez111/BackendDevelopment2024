// FILE: products/dto/update-product.dto.ts
// _______________________________________________

import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
// _______________________________________________

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;
}

// _______________________________________________