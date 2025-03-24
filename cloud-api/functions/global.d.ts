/****************************
 ******** Post Types ********
 ****************************/

type Post = string | null;

/*******************************
 ******** Generic Types ********
 *******************************/

type GenericAPIResponse<D> = {
  hasErrors?: boolean;
  error?: string;
  status: number;
  data: D;
};

type GenericAPIError = {
  hasErrors?: boolean;
  status: number;
  error: string;
};
