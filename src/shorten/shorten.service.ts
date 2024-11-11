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

  async create(createShortenDto: CreateShortenDto): Promise<ShortenEntity> {
    // check if url existed
    if (this.checkLongUrlExists(createShortenDto.url)) {
      throw new HttpException('Url existed', HttpStatus.BAD_REQUEST);
    }

    const newShorten = await this.shortenRepository.create(createShortenDto);
    await this.shortenRepository.save(newShorten);
    return newShorten;
  }

  async retrieveOriginalUrl(shortUrl: string): Promise<ShortenEntity> {
    return this.findOne({ url: shortUrl });
  }

  findOne(param: any): Promise<ShortenEntity> {
    return this.shortenRepository.findOneBy(param).catch((reason) => {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    });
  }

  async update(shortUrl: string, updateShortenDto: UpdateShortenDto) {
    // check short url existed
    if (
      !(await this.shortenRepository.exists({ where: { shortCode: shortUrl } }))
    ) {
      throw new HttpException('URL not found!', HttpStatus.NOT_FOUND);
    }
    // const update
    // return `This action updates a #${id} shorten`;
  }

  findAll() {
    return `This action returns all shorten`;
  }

  remove(id: number) {
    return `This action removes a #${id} shorten`;
  }

  async checkLongUrlExists(url) {
    return await this.shortenRepository.exists({ where: { url: url } });
  }
}
