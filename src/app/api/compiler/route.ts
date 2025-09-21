import { NextRequest , NextResponse } from "next/server";

const reqBody = {
  "source_code": "",
  "language_id": "62",
  "number_of_runs": null,
  "stdin": "Judge0",
  "expected_output": null,
  "cpu_time_limit": null,
  "cpu_extra_time": null,
  "wall_time_limit": null,
  "memory_limit": null,
  "stack_limit": null,
  "max_processes_and_or_threads": null,
  "enable_per_process_and_thread_time_limit": null,
  "enable_per_process_and_thread_memory_limit": null,
  "max_file_size": null,
  "enable_network": null
}


const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { kk } = body;

  const toCloud = { ...reqBody, source_code: kk };

  // Submit code and get token
  const submitResponse = await fetch("http://13.201.45.96:2358/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toCloud),
  });
  const { token } = await submitResponse.json();
  console.log(token)
  // Poll result with retries and delay
  let result = null;
  let retries = 15; // Number of attempts
  while (retries > 0) {
    const res = await fetch(`http://13.201.45.96:2358/submissions/${token}`);
    const data = await res.json();

    if (data.status.description !== "In Queue" && data.status.description !== "Processing") {
      result = data;
      break; // Exit loop if done
    }

    retries--;
    await wait(500); // wait half a second before retrying
  }

  console.log(result)
  return NextResponse.json({
    receivedCode: toCloud,
    output: result?.stdout ?? null,
    status: result?.status.description ?? "Timeout or unknown",
  });
}
