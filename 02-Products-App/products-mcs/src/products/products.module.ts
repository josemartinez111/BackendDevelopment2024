// FILE: products/products.module.ts
// _______________________________________________

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
// _______________________________________________

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
// _______________________________________________