export enum ValidationRule {
  REQUIRED = "required",
  EMAIL = "email"
}

export type ValidationFunction = ((value: string) => boolean | string);
