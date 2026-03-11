import { readData, writeData } from '@/lib/db';

export async function GET() {
  const data = readData('careers');
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const data = readData('careers');
  const newItem = { ...body, id: body.id || `job-${Date.now()}` };
  data.push(newItem);
  writeData('careers', data);
  return Response.json(newItem);
}

export async function PUT(request) {
  const body = await request.json();
  const data = readData('careers');
  const index = data.findIndex((item) => item.id === body.id);
  if (index === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  data[index] = { ...data[index], ...body };
  writeData('careers', data);
  return Response.json(data[index]);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = readData('careers').filter((item) => item.id !== id);
  writeData('careers', data);
  return Response.json({ success: true });
}
