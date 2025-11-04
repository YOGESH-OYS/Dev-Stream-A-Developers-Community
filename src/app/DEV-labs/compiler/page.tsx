import ScrollEffect from '@/app/components/ScroolEffect/scroll';
import CompilerComponent from './CompilerComponent';
import TCdata from '@/models/Testcasemodel';
import { redirect } from 'next/navigation';

export default async function CompilerPage({ searchParams }: any) {
  const params = await searchParams;
  const token = params.brainnerd_devlabs_;
  let userData = null;

  // SSR redirect if URL param is missing
  if (!token) {
    redirect('/DEV-labs');
  }

  try {
    const testcase = await TCdata.findById(token).lean();
    if (testcase) {
      userData = JSON.parse(JSON.stringify({
        user_Id: testcase.user_Id,
        title: testcase.title,
        question_id: testcase.question_id,
        difficulty: testcase.difficulty,
        question: testcase.question,
        examples: testcase.examples,
        constraints: testcase.constraints,
        testcases: testcase.testcases,
      }));
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollEffect />
      <CompilerComponent testcaseData={userData} />
    </div>
  );
}
