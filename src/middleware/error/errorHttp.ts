export default class IErrorHttp extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}
