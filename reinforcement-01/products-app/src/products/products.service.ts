// FILE: products/products.service.ts
// _______________________________________________

import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as UuidV4 } from 'uuid';
// _______________________________________________

@Injectable()
export class ProductsService {
  private products: Array<Product> = [];
  
  create({ name, description, price }: CreateProductDto) {
    // Create a new product instance
    const newProduct: Product = new Product(UuidV4(), name, description, price);
    
    // Push the new product instance to the product's array
    this.products.push(newProduct);
    // Return the new product instance
    return newProduct;
  }
  
  findAll() {
    return this.products;
  }
  
  findByID(id: string): Product {
    const product: Product = this.products.find(
      (product: Product): boolean => product.id === id,
    );
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${ id } not found`);
    }
    
    return product;
  }
  
  update(id: string, updatedData: UpdateProductDto) {
    // Reusing the findByID method to get the product to be updated by ID
    const product: Product = this.findByID(id);
    // Update the product with the new data
    product.updateWith(updatedData);
    return product;
  }
  
  remove(id: string) {
    // Reusing the findByID method to get the product to be deleted
    const product: Product = this.findByID(id);
    
    // filter out the product to be deleted
    this.products = this.products.filter(
      (product: Product): boolean => product.id !== id,
    );
    
    return product;
  }
}

// _______________________________________________