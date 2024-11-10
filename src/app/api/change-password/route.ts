import {hashPassword, verifyPassword} from '@/utils/passwordUtils';
import {getUser} from '@/utils/userUtils';

export async function POST(request: Request) {
  const {password, newPassword} = await request.json();
  let success = false;
  let message = 'Please enter new password!';
  if (newPassword && newPassword.length > 0) {
    const user = await getUser();
    message = 'Incorrect password!';
    if (user) {
      if (await verifyPassword(user.password, password)) {
        user.password = await hashPassword(newPassword);
        await user.save();
        success = true;
        message = 'Successfully changed password!';
      }
    }
  }
  return Response.json({success, message});
}
