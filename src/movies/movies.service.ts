import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with Id ${movieId} not Found`);
    }
    return movie;
  }

  deleteMovie(movieId: number) {
    this.getOne(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== movieId);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(movieId: number, updateData) {
    const movie = this.getOne(movieId);
    this.deleteMovie(movieId);
    this.movies.push({ ...movie, ...updateData });
  }
}
