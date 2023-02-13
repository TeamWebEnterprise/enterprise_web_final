import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IdieaService } from './idiea.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';
import { UpdateIdieaDto } from './dto/update-idiea.dto';
import { Idiea } from '@prisma/client';

@Controller('idiea')
export class IdieaController {
  constructor(private readonly idieaService: IdieaService) {}

  @Post('createidiea')
  createIdiea(@Body() createIdieaDto: CreateIdieaDto): Promise<Idiea> {
    return this.idieaService.createNewIdiea(createIdieaDto);
  }

  @Get()
  findAll() {
    return this.idieaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idieaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdieaDto: UpdateIdieaDto) {
    return this.idieaService.update(+id, updateIdieaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idieaService.remove(+id);
  }
}
