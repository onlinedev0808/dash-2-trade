interface IResponse {
  responseCode: number;
  message: string;
}

export default class APIResponse {
  public static error(responseCode: number, message: string): IResponse {
    return {
      responseCode,
      message,
    };
  }

  public static success(data: any): any {
    return data;
  }
}
