import { Express } from 'express';
import { getAllowedOrigins } from '../config';
import * as Header from '@base/config/headers.json';
import * as Methods from '@base/config/methods.json';

export const setupSecurity = (app: Express) => {
  const allowedOrigins = getAllowedOrigins();
  const { GET, POST, PUT, DELETE, OPTIONS } = Methods;

  app.use((req, res, next) => {
    // Remove vulnerable headers
    res.removeHeader(Header.X_Powered_By);

    // Middleware to handle security headers
    res.setHeader(Header.X_Content_Type_Options, 'nosniff');
    res.setHeader(Header.X_Frame_Options, 'DENY');
    res.setHeader(Header.X_XSS_Protection, '1; mode=block');

    // Middleware to handle CORS
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
      res.header(Header.Access_Control_Allow_Origin, origin);
    }

    res.header(
      Header.Access_Control_Allow_Methods,
      `${GET}, ${POST}, ${PUT}, ${DELETE}, ${OPTIONS}`
    );
    res.header(Header.Access_Control_Allow_Headers, 'Content-Type, X-Auth-Token');
    res.header(Header.Access_Control_Allow_Credentials, 'true');

    // handle preflight requests
    if (req.method === OPTIONS) {
      res.sendStatus(204); // "No Content"
      return;
    }

    next();
  });

  console.log('✅ Security setup complete');
};
