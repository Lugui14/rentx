import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationRepository";
import { Specification } from "@modules/cars/entities/Specification";
import { getRepository, Repository } from "typeorm";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationRepository };
