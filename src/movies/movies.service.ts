import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number): Movie {
    console.log(movieId);
    console.log(this.movies);
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
    console.log(movieData);
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(movieId: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(movieId);
    this.deleteMovie(movieId);
    this.movies.push({ ...movie, ...updateData });
  }
}
