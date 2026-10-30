import { dispatchRoute } from '@/backend/routes/router.js';

export async function GET(request, { params }) {
  const resolved = await params;
  return dispatchRoute(request, resolved?.route || []);
}

export async function POST(request, { params }) {
  const resolved = await params;
  return dispatchRoute(request, resolved?.route || []);
}

export async function PUT(request, { params }) {
  const resolved = await params;
  return dispatchRoute(request, resolved?.route || []);
}

export async function PATCH(request, { params }) {
  const resolved = await params;
  return dispatchRoute(request, resolved?.route || []);
}

export async function DELETE(request, { params }) {
  const resolved = await params;
  return dispatchRoute(request, resolved?.route || []);
}

export async function OPTIONS(request, { params }) {
  const resolved = await params;
  return dispatchRoute(request, resolved?.route || []);
}
