import { connectDB } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';
import User from '@/models/User';
import TCdata from '@/models/Testcasemodel';
import { NextResponse } from 'next/server';

export type ChatItem = {
  id: string;
  title: string;
  difficulty?: string;
};

/** GET /api/chats – list current user's testcase chats (for sidebar), ordered newest first */
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('dev-stream-auth-cookie')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload?.userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(payload.userId).select('chats username').lean();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const chatIds: string[] = Array.isArray(user.chats) ? user.chats : [];
    if (chatIds.length === 0) {
      return NextResponse.json({ chats: [] });
    }

    const testcases = await TCdata.find({ _id: { $in: chatIds } })
      .select('_id title difficulty')
      .lean();

    const byId = new Map(testcases.map((t) => [String(t._id), t]));
    const chats: ChatItem[] = chatIds
      .map((id) => {
        const doc = byId.get(id);
        if (!doc) return null;
        const item: ChatItem = { id: String(doc._id), title: doc.title };
        if (doc.difficulty) item.difficulty = doc.difficulty;
        return item;
      })
      .filter((c): c is ChatItem => c !== null);

    return NextResponse.json({ chats });
  } catch (error) {
    console.error('[GET /api/chats]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
