import {deleteSession} from '@/app/lib/session';

export async function GET(request: Request) {
  await deleteSession();
  return Response.redirect(new URL('/login', request.url));
}
