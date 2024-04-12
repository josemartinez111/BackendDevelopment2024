// FILE: products/products.controller.ts
// _______________________________________________

import {
  Controller, Get, Post,
  Body, Patch, Param,
  Delete, Query, ValidationPipe, UsePipes, ParseIntPipe,
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
    const response = this.productsService.create(createProductDto);
    const jsonResponse = JSON.stringify(createProductDto);
    
    console.log('Product:', jsonResponse);
    return response;
  }
  
  @Get()
  findAllWithPagination(@Query() paginationDto: PaginationDto) {
    // return paginationDto;
    return this.productsService.findAllWithPagination(paginationDto);
  }
  
  @Get(':id')
  findByID(@Param('id') id: number) {
    return this.productsService.findByID(+id);
  }
  
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id', ParseIntPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(
      +id, updateProductDto
    );
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
// _______________________________________________