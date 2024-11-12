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

  @Get(':shortUrl/starts')
  getUrlStatistics(@Param('shortUrl') shortUrl: string) {
    return this.shortenService.getUrlStatistics(shortUrl);
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

  @Delete(':shortUrl')
  remove(@Param('shortUrl') shortUrl: string) {
    return this.shortenService.remove(shortUrl);
  }
}
