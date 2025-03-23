/// <reference types="vite/client" />

/****************************
 ******** POST TYPES ********
 ****************************/

type Post = string | null;

/****************************
 ******** USER TYPES ********
 ****************************/

type APIResponse = {
  hasErrors: boolean;
  email: string;
  uid?: string;
  userName: string;
};
