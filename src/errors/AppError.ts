interface AppErrorOptions {
  message: string;
  status: number;
}

class AppError extends Error {
  status: number;

  constructor({ message, status }: AppErrorOptions) {
    super(message);
    this.status = status;
  }
}

export default AppError;
