import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { withColor } from 'src/utilities/custom-color-loggers';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit(): any {
    this.$connect();

    const customColorOutput = withColor(
      '[PRISMA_CLIENT] Database connected...',
      'cyan',
      true,
    );

    this.logger.log(customColorOutput);
  }

  create({ name, price }: CreateProductDto) {
    return this.product.create({
      data: {
        name,
        price: Number(price),
      },
    });

    // return result;
  }

  // PATH: http://localhost:3001/products?page=1&limit=10
  async findAllWithPagination({ page, limit }: PaginationDto) {
    // Counting the total number of products in the database to manage pagination
    const totalPages: number = await this.product.count();
    // Calculating the last page by dividing the total products
    // by the limit per page and rounding up, to ensure all products
    // can be accommodated in the calculated number of pages
    const lastPage: number = Math.ceil(totalPages / (limit > 0 ? limit : 1));

    // Calculating the number of items to skip based on the current
    // `page number` and `limit`, This is to ensure we start fetching items
    // from the correct position for the requested page
    const paginationSkipPages: number = (page - 1) * limit;

    // Retrieving a specific subset of products based on the page number.
    // Limit 'skip' determines how many products to bypass, which is
    // calculated based on the current page and limit 'take' specifies the
    // maximum number of products returned by the query
    const responseData = await this.product.findMany({
      skip: paginationSkipPages,
      take: Number(limit),
    });

    return {
      data: responseData,
      metadata: {
        totalPages: totalPages,
        currentPage: page,
        lastPage: lastPage,
      },
    };
  }

  async findByID(id: number) {
    const product = await this.product.findFirst({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found...`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
