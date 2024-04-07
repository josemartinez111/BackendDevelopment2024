// FILE: products/dto/create-product.dto.ts
// _______________________________________________

import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";
// _______________________________________________

export class CreateProductDto {
	@IsString()
	public name: string;
	
	@IsNumber({ maxDecimalPlaces: 4 })
	@Min(0)
	@Type(() => Number)
	public price: string;
}
// _______________________________________________