import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger } from '@nestjs/common';

export abstract class AbstractRepository<TDcoument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDcoument>) {}

  async create(document: Omit<TDcoument, '_id'>): Promise<TDcoument> {
    const newDoucment = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await newDoucment.save()).toJSON() as unknown as TDcoument;
  }

  async findOne(filterQuery: FilterQuery<TDcoument>): Promise<TDcoument> {
    return await this.model.findOne(filterQuery).lean<TDcoument>(true);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDcoument>,
    update: UpdateQuery<TDcoument>,
  ): Promise<TDcoument> {
    const document = await this.model
      .findByIdAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDcoument>(true);

    return document;
  }

  async find(filterQuery: FilterQuery<TDcoument>): Promise<TDcoument[]> {
    return this.model.find(filterQuery).lean<TDcoument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDcoument>,
  ): Promise<TDcoument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDcoument>(true);
  }
}
