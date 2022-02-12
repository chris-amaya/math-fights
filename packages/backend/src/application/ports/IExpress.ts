export interface IExpress {
  setupConfig(): void
  setupRoutes(): void
  sockets(): void
  start(callback: () => {}): void
}
