import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';
import { ShortenService } from './shorten.service';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  create(@Body() createShortenDto: CreateShortenDto) {
    return this.shortenService.create(createShortenDto);
  }

  @Get(':shortUrl')
  retrieveOriginalUrl(@Param('shortUrl') shortUrl: string) {
    return this.shortenService.retrieveOriginalUrl(shortUrl);
  }

  @Put(':shortUrl')
  update(
    @Param('shortUrl') shortUrl: string,
    @Body() updateShortenDto: UpdateShortenDto,
  ) {
    return this.shortenService.update(shortUrl, updateShortenDto);
  }

  @Get()
  findAll() {
    return this.shortenService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShortenDto: UpdateShortenDto) {
  //   return this.shortenService.update(+id, updateShortenDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortenService.remove(+id);
  }
}
