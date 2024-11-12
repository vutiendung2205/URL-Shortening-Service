import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';
import { ShortenEntity } from './entities/shorten.entity';

@Injectable()
export class ShortenService {
  constructor(
    @InjectRepository(ShortenEntity)
    private readonly shortenRepository: Repository<ShortenEntity>,
  ) {}

  async create(
    createShortenDto: CreateShortenDto,
  ): Promise<Omit<ShortenEntity, 'accessCount'>> {
    // check if url existed
    if (this.checkLongUrlExists(createShortenDto.url)) {
      throw new HttpException('Url existed', HttpStatus.BAD_REQUEST);
    }

    const newShorten = await this.shortenRepository.create(createShortenDto);
    await this.shortenRepository.save(newShorten);
    return newShorten;
  }

  async retrieveOriginalUrl(shortUrl: string): Promise<ShortenEntity> {
    // check shortUrl existed
    if (!(await this.checkShortUrlExists(shortUrl))) {
      throw new HttpException('Url not found.', HttpStatus.NOT_FOUND);
    }
    //  count number get short url
    //
    await this.increaseViews(shortUrl);

    return this.shortenRepository.findOne({ where: { url: shortUrl } });
  }

  findOne(param: any): Promise<Omit<ShortenEntity, 'accessCount'>> {
    return this.shortenRepository.findOneBy(param).catch((reason) => {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    });
  }

  async update(
    shortUrl: string,
    updateShortenDto: UpdateShortenDto,
  ): Promise<Omit<ShortenEntity, 'accessCount'>> {
    // check short url existed
    if (
      !(await this.shortenRepository.exists({ where: { shortCode: shortUrl } }))
    ) {
      throw new HttpException('URL not found!', HttpStatus.NOT_FOUND);
    }
    await this.shortenRepository.update(
      { shortCode: shortUrl },
      { url: updateShortenDto.url },
    );
    return await this.findOne({ shortCode: shortUrl });
  }

  async remove(shortUrl: string) {
    if (!this.checkShortUrlExists(shortUrl)) {
      throw new HttpException('URL not found!', HttpStatus.NOT_FOUND);
    }
    return await this.shortenRepository.delete({ shortCode: shortUrl });
  }

  async getUrlStatistics(shortUrl: string): Promise<ShortenEntity> {
    if (!this.checkShortUrlExists(shortUrl)) {
      throw new HttpException('Url not found!', HttpStatus.NOT_FOUND);
    }
    return this.shortenRepository.findOne({ where: { shortCode: shortUrl } });
  }

  async increaseViews(shortUrl: string) {
    const originalShorten = await this.shortenRepository.findOne({
      where: { shortCode: shortUrl },
    });
    originalShorten.accessCount += 1;
    await this.shortenRepository.save(originalShorten);
  }

  async checkShortUrlExists(url) {
    return await this.shortenRepository.exists({ where: { shortCode: url } });
  }

  async checkLongUrlExists(url) {
    return await this.shortenRepository.exists({ where: { url: url } });
  }
}
