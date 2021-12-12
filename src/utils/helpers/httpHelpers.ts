// If status begins with 2XX, it was successful
export const isOk = (statusCode: number | string) =>
  String(statusCode)[0] === '2';
