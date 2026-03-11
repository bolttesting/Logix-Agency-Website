import { readData } from '@/lib/db';

export async function GET(request, { params }) {
  const id = params.id;
  const data = readData('work');
  const item = data.find((p) => p.id === id);
  if (!item) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(item);
}
