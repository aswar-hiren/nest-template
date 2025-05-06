import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
    UseFilters
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { AuthService } from './auth.service';
import { signInDto } from './signIn.dto';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from 'common/enums/role.enum';
import { ResponseInterceptor } from 'common/inceptors/response.interceptor';
import { AllExceptionsFilter } from 'common/Exception-Filter/http-exception.filter';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(Role.Admin)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
