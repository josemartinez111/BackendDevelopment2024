import {
  Body,
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
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
    // Ensure 'page' and 'limit' are valid,
    // positive numbers and not fewer than `1`
    const validatedPage = Math.max(1, Number(page));
    // Ensures limit is positive, preventing division by zero
    const validatedLimit = Math.max(1, Number(limit));

    // Count the total number of products in the database for pagination
    const totalItems: number = await this.product.count();
    // Calculating the last page number based on total items and items per page
    const totalPages: number = Math.ceil(totalItems / validatedLimit);

    // Calculate the offset for the database query based on the current page
    const paginationSkipPages: number = (validatedPage - 1) * validatedLimit;

    // Retrieving a specific subset of products based on the page number.
    // Limit 'skip' determines how many products to bypass, which is
    // calculated based on the current page and limit 'take' specifies the
    // maximum number of products returned by the query
    const responseData = await this.product.findMany({
      skip: paginationSkipPages,
      take: Number(limit),
    });

    // The number of items currently displayed on the page,
    // which will be equal to the response data length
    const itemsPerPage: number = responseData.length;

    return {
      data: responseData,
      metadata: {
        // Total number of pages available, based on the `page` count and `limit`
        totalPages: totalPages,
        // The currently requested page
        currentPage: Number(page),
        // The last available page is the sum of all pages,
        // clarifying it's the end of the data set
        lastPage: totalPages,
        itemsPerPage: itemsPerPage,
      },
    };
  }

  async findByID(id: number) {
    const product = await this.product.findFirst({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id -> #${id} not found...`);
    }

    return product;
  }

  async update(id: number, @Body() { name, price }: UpdateProductDto) {
    const foundID = id;
    console.log({ foundID });

    const updatedData = {
      where: { id: id },
      data: { name, price },
    };

    const response = this.product.update(updatedData)

    return response.catch((_err: unknown): void => {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
