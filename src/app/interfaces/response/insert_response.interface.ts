  
  export interface InsertResponse {
    ok: boolean;
    data: {
      id: number;
      message: string,
    };
    error: string;
  }