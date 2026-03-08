import { connectDB } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';
import User from '@/models/User';
import TCdata from '@/models/Testcasemodel';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

/** PATCH /api/chats/[id] – update testcase title (chat settings edit) */
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) return NextResponse.json({ message: 'Bad request' }, { status: 400 });

    const body = await request.json();
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title) return NextResponse.json({ message: 'Title required' }, { status: 400 });

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('dev-stream-auth-cookie')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const payload = verifySessionToken(token);
    if (!payload?.userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const user = await User.findById(payload.userId).select('chats username').lean();
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const testcase = await TCdata.findById(id).lean();
    if (!testcase) return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    if (testcase.user_Id !== user.username) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await TCdata.findByIdAndUpdate(id, { title });

    return NextResponse.json({ message: 'Updated', title });
  } catch (error) {
    console.error('[PATCH /api/chats/:id]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

/** DELETE /api/chats/[id] – remove chat from user's list and delete testcase */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) return NextResponse.json({ message: 'Bad request' }, { status: 400 });

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('dev-stream-auth-cookie')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const payload = verifySessionToken(token);
    if (!payload?.userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const user = await User.findById(payload.userId).select('chats username').lean();
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const testcase = await TCdata.findById(id).lean();
    if (!testcase) return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    if (testcase.user_Id !== user.username) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await User.findByIdAndUpdate(payload.userId, { $pull: { chats: id } });
    await TCdata.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('[DELETE /api/chats/:id]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
