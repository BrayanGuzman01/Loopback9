import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Persona, PersonaRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.Id,
  PersonaRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Persona.prototype.Id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Persona, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
