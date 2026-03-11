import { readData, writeData } from '@/lib/db';

export async function GET() {
  const data = readData('work');
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const data = readData('work');
  const id = (body.id || body.title?.toLowerCase().replace(/\s+/g, '-')).replace(/[^a-z0-9-]/g, '');
  const newItem = { ...body, id: id || `work-${Date.now()}` };
  data.push(newItem);
  writeData('work', data);
  return Response.json(newItem);
}

export async function PUT(request) {
  const body = await request.json();
  const data = readData('work');
  const index = data.findIndex((item) => item.id === body.id);
  if (index === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  data[index] = { ...data[index], ...body };
  writeData('work', data);
  return Response.json(data[index]);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = readData('work').filter((item) => item.id !== id);
  writeData('work', data);
  return Response.json({ success: true });
}
