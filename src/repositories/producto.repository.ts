import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Producto, ProductoRelations} from '../models';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.Id,
  ProductoRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Producto, dataSource);
  }
}
