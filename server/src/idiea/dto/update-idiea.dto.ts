import { PartialType } from '@nestjs/mapped-types';
import { CreateIdieaDto } from './create-idiea.dto';

export class UpdateIdieaDto extends PartialType(CreateIdieaDto) {}
