// FILE: products/dto/update-product.dto.ts
// _____________________________________________________________________

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
// _____________________________________________________________________

export class UpdateProductDto extends PartialType(CreateProductDto) {}
// _____________________________________________________________________