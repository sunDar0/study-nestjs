import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  removeMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: number, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}
