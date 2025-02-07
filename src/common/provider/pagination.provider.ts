import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { Paginated } from '../interfaces/paginated.interface';
import { Injectable, Inject } from '@nestjs/common';

import { ObjectLiteral, Repository } from 'typeorm';


@Injectable()

export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
        // records to skip before reterving data
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      
      // limit the number of records retervied per request
      take: paginationQuery.limit,
    });

   //calculate the pages 
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);

    const nextPage = 
            paginationQuery.page == totalPages ?
           paginationQuery.page:paginationQuery.page + 1;


             const PreviousPage = 
             paginationQuery.page == totalPages ?
              paginationQuery.page:paginationQuery.page - 1;
    const finalResponse: Paginated<T> = {

      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        currentPage: paginationQuery.page,
        totalItems: totalItems,
        totalPages: totalPages,
      },
    };
    return finalResponse;
  }
}