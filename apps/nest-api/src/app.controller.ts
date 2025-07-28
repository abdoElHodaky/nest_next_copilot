import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface SectionDoc {
  _id: string;
  idea: string;
  sections: string[];
}

@Controller('sections')
export class AppController {
  constructor(@InjectModel('Section') private sectionModel: Model<SectionDoc>) {}

  @Post()
  async create(@Body() body: { idea: string }) {
    if (!body.idea) throw new HttpException('Idea is required', HttpStatus.BAD_REQUEST);
    // generate dummy sections
    const dummySections = ['Hero', 'About', 'Contact'];
    const created = await this.sectionModel.create({ idea: body.idea, sections: dummySections });
    return { id: created._id, sections: created.sections };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const doc = await this.sectionModel.findById(id);
    if (!doc) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return { idea: doc.idea, sections: doc.sections };
  }
}