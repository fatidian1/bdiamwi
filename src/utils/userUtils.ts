import {getSession} from '@/app/lib/session';
import {getDatabase} from '@/data-source';
import {User} from '@/entity/user';

export const getUser = async () => {
  const session = await getSession()
  if (!session) return null
// return  null;
  try {
    const db = await getDatabase();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = await db.manager.find(User, {where: {id: session.userId}})
    return data[0]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}
