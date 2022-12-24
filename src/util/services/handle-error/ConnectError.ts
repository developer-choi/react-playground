export default class ConnectError extends Error {
  constructor(address: string, port: string) {
    const portMessage = port ? `:${port}` : '';
    super(`Can not connect the server (${address}${portMessage})`);
  }
}
