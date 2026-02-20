import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { GetContentsDto } from './dto/get-contents.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @Get()
  async getContents(@Query() query: GetContentsDto) {
    return this.contentsService.getContents(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(+id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(+id);
  }
}
