import {User} from '@/entity/user';
import {getDatabase} from '@/data-source';
import {hashPassword} from '@/utils/passwordUtils';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const db = await getDatabase();

    // Check if the username is already taken
    const existingUser = await db.manager.findOne(User, { where: { username } });
    if (existingUser) {
      return Response.json({ success: false, message: 'Username already exists' }, {status: 400});
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the new user
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.enabled = true;

    await db.manager.save(user);

    return Response.json({ success: true, message: 'User created successfully' }, {status: 201});
  } catch (error) {
    console.error('Signup Error:', error);
    return Response.json({ success: false, message: 'Internal Server Error' }, {status: 500});
  }
}
