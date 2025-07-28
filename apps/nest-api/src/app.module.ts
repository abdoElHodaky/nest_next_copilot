import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { Schema } from 'mongoose';

const SectionSchema = new Schema({
  idea: { type: String, required: true },
  sections: [String],
});

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_next_copilot'),
    MongooseModule.forFeature([{ name: 'Section', schema: SectionSchema }]),
  ],
  controllers: [AppController],
})
export class AppModule {}