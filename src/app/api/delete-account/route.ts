import {deleteSession} from '@/app/lib/session';
import {getUser} from '@/utils/userUtils';

export async function GET(request: Request) {
  const user = await getUser()
  if(user) {
    await user.remove();
  }
  await deleteSession();
  return Response.redirect(new URL('/login', request.url));
}
