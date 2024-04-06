// FILE: products/entities/product.entity.ts
// _______________________________________________
// _______________________________________________

type UpdateProductsWithType = Partial<Omit<Product, "id">>
// _______________________________________________

export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public price?: number) {
  }
  
  updateWith(updatedElement: UpdateProductsWithType) {
    // if data is not updated, use the existing data
    this.name = updatedElement.name ?? this.name;
    this.description = updatedElement.description ?? this.description;
    this.price = updatedElement.price ?? this.price;
  }
}

// _______________________________________________