export type ApiResponse<D = unknown> = {
  status: number;
  data?: D;
  error?: boolean;
  message?: string;
};

export type ApiRequest<P> = {
  payload: P;
};
