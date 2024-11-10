import {User} from '@/entity/user';
import {getDatabase} from '@/data-source';
import {verifyPassword} from '@/utils/passwordUtils';
import {createSession} from '@/app/lib/session';

export async function POST(request: Request) {
  const {username, password} = await request.json();
  let success = false;
  let message = 'Incorrect credentials!';
  if (username && password && username.length > 0 && password.length > 0) {
    const manager = (await getDatabase()).manager;
    const result = await manager.find(User, {where: {username}});
    if (result.length > 0) {
      const user = result[0];
      if (await verifyPassword(result[0].password, password)) {
        await createSession(user.id);
        success = true;
        message = 'Successfully logged in!';
      }
    }
  }
  return Response.json({success, message});
}
