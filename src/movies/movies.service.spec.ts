import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("GetAll",()=>{
    it("should return an array",()=>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("GetOne", ()=>{

    it("should return a movie", ()=>{
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error",()=>{
      try{
        service.getOne(888);
      }catch(e)
      {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with Id 888 not Found`)
      }
    });
  });

  describe("deleteMovie",()=>{
    it("영화 하나 지우기", ()=>{
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000
      });
      const beforeDelete = service.getAll().length;
      service.deleteMovie(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
      // console.log(service.getAll());
    });

    it("404 return 받기",()=>{
      try {
        service.deleteMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with Id 999 not Found`)
      }
    });
  });

  describe("create", ()=>{
    it("영화 만들기", ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", ()=>{
    it("영화 수정하기", ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000
      });
      service.update(1, {
        title:"updated test"
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("updated test");
    });
    it("404 return 받기",()=>{
      try {
        service.update(999,{});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with Id 999 not Found`)
      }
    });
  });

});
