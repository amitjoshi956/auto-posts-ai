import { Logger } from '@autoposts/shared';
import { Elysia } from 'elysia';

const logger = new Logger('core-apis');

export const loggerPlugin = new Elysia({ name: 'logger-plugin' }).decorate('logger', logger);
