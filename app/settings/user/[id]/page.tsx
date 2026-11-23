import { getUserById } from '@/app/lib/settings';
import NotFound from './not-found';

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = await params;
  const { name, id, username, website } = await getUserById(userId);

  if (!name) return NotFound();

  return (
    <div>
      <h1 className='text-2xl font-bold'>User {userId}</h1>

      <div className='border border-dashed border-red-500 p-4'>
        <p>Name: {name}</p>
        <p>Id: {id}</p>
        <p>UserName: {username}</p>
        <p>WebSite: {website}</p>
      </div>
    </div>
  );
}
