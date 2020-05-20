import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator((data: any, req: Request) => {
  return req.user;
});
