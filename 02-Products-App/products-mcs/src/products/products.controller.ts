// FILE: products/products.controller.ts
// _______________________________________________

import {
  Controller, Get, Post,
  Body, Patch, Param,
  Delete, Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// _______________________________________________

@Controller('products')
export class ProductsController {
  // inject the ProductsService into the ProductsController
  constructor(private readonly productsService: ProductsService) {
  }
  
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }
  
  @Get()
  findAllWithPagination(@Query() paginationDto: PaginationDto) {
    // return paginationDto;
    return this.productsService.findAllWithPagination(paginationDto);
  }
  
  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.productsService.findByID(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
// _______________________________________________