<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.





## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

## Consistent Response Interceptor

The backend uses a global `ResponseInterceptor` in `src/main.ts`. By default, every successful controller response is wrapped into this shape:

```json
{
  "message": "Request successful",
  "data": {}
}
```

The interceptor reads metadata from controller handlers and classes through the `Reflector`, so decorators can change the message or bypass the wrapper completely.

### Decorators

`ResponseMessage(message)` sets the response message used by the interceptor.

```ts
@Get()
@ResponseMessage('Product created successfully')
create() {
  return this.productsService.create();
}
```

`SkipResponseTransform()` skips the wrapper and returns the handler result as-is.

```ts
@Get('health')
@SkipResponseTransform()
healthCheck() {
  return 'ok';
}
```

`ApiSuccessResponse(Model, message)` is a Swagger helper for documenting the wrapped response shape in OpenAPI.

```ts
@Post()
@ResponseMessage('Product created successfully')
@ApiSuccessResponse(CreateProductDto, 'Product created successfully')
create(@Body() body: CreateProductDto) {
  return this.productsService.create(body);
}
```

### Behavior Summary

- If no decorator is used, the response becomes `{ success: true, message: 'Request successful', data }`.
- If `@ResponseMessage()` is present, only the `message` field changes.
- If `@SkipResponseTransform()` is present, the interceptor does not wrap the response.
- Use `@ApiSuccessResponse()` when you want Swagger to show the wrapped response schema.

The current app entry point already registers the interceptor globally, so these decorators work across the API without extra controller setup.
