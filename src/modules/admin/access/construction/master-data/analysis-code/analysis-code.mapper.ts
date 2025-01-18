import { UserMapper } from '@admin/access/users/users.mapper';
import { DimensionMapper } from '../dimension/dimension.mapper';
import { AnalysisCodeEntity } from './analysis-code.entity';
import {
  AnalysisCodeResponseDto,
  CreateAnalysisCodeRequestDto,
  UpdateAnalysisCodeRequestDto,
} from './dtos';

export class AnalysisCodeMapper {
  public static async toDto(entity: AnalysisCodeEntity): Promise<AnalysisCodeResponseDto> {
    const dto = new AnalysisCodeResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.dimensionId = entity.dimensionId;
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    if (entity.dimension) {
      dto.dimension = await DimensionMapper.toDto(entity.dimension);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateAnalysisCodeRequestDto): AnalysisCodeEntity {
    const entity = new AnalysisCodeEntity();
    // default fields?
    entity.active = true;
    entity.dimensionId = dto.dimensionId;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;

    return entity;
  }

  public static toUpdateEntity(
    entity: AnalysisCodeEntity,
    dto: UpdateAnalysisCodeRequestDto,
  ): AnalysisCodeEntity {
    entity.dimensionId = dto.dimensionId;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }
}
