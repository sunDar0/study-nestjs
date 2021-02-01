## 기본 구조
* main.ts
* app.module.ts
* controller
* service
* entity
* dto
## 설치
1. `npm install -g @nestjs/cli`
    - nestjs 설치
2. `nest new project-name`
    - 프로젝트 생성
3. `npm run start:dev`,
    - 개발 모드 - watch로 변경사항이 바로 반영됨
## AddPackage
1. `npm install class-validator`
    - **데코레이터로 파라미터의 값을 체크**
    - main.ts 에 파이프를 추가하여 사용 할 수 있음
    - ~~~typescript
      new ValidationPipe({
        whitelist:true, 
        forbidNonWhitelisted:true
      })
      ~~~
2. `npm install class-transformer`
    - **넘겨받는 파라미터를 지정한 자료형으로 자동 변형**
    - main.ts 에 파이프를 추가하여 사용 할 수 있음
    - ~~~typescript
      new ValidationPipe({
        transform:true
      })
      ~~~
3. `npm install @nestjs/mapped-types`
    - **타입을 변환하여 사용?**
    - dto 단에서 기존에 정의된 클래스를 사용할 수 있음
    - ~~~typescript
      export class UpdateMovieDto extends PartialType(CreateMovieDto){}
      ~~~