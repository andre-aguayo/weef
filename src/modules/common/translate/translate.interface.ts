export type TranslateFunction = (
  key: string,
  args?:
    | (
        | {
            [k: string]: any;
          }
        | string
      )[]
    | {
        [k: string]: any;
      },
) => Promise<string>;
