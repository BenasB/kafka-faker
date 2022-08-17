declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BACK_END_URL: string | undefined;
    }
  }
}

export {};
