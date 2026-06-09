import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//Es el archivo donde van a estar las rutas

@Controller() //Todos los @ son decoradores, y se usan para marcar clases, métodos, propiedades o parámetros con metadatos que NestJS puede usar para configurar el comportamiento de la aplicación.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
