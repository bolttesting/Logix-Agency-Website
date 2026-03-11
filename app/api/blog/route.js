import { readData, writeData } from '@/lib/db';

export async function GET() {
  const data = readData('blog');
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const data = readData('blog');
  const slug = body.slug || body.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const newItem = { ...body, id: body.id || `blog-${Date.now()}`, slug };
  data.push(newItem);
  writeData('blog', data);
  return Response.json(newItem);
}

export async function PUT(request) {
  const body = await request.json();
  const data = readData('blog');
  const index = data.findIndex((item) => item.id === body.id || item.slug === body.slug);
  if (index === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  data[index] = { ...data[index], ...body };
  writeData('blog', data);
  return Response.json(data[index]);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = readData('blog').filter((item) => item.id !== id && item.slug !== id);
  writeData('blog', data);
  return Response.json({ success: true });
}
