import { CodeRunner } from "../utils/codeRunner";

export const ProcessUrl = async (url: string) => {
  const response = await CodeRunner.processUrl({ url });
  return response;
}