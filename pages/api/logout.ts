import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Logout(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    serialize('token', '', {
      maxAge: -1,
      path: '/',
    }),
  ]);

  res.writeHead(302, { Location: '/' });
  res.end();
}