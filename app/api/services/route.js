import { readData, writeData } from '@/lib/db';

export async function GET() {
  const data = readData('services');
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const data = readData('services');
  const newItem = { ...body, id: body.id || `svc-${Date.now()}` };
  data.push(newItem);
  writeData('services', data);
  return Response.json(newItem);
}

export async function PUT(request) {
  const body = await request.json();
  const data = readData('services');
  const index = data.findIndex((item) => item.id === body.id);
  if (index === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  data[index] = { ...data[index], ...body };
  writeData('services', data);
  return Response.json(data[index]);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = readData('services').filter((item) => item.id !== id);
  writeData('services', data);
  return Response.json({ success: true });
}
