/** @template T - The type of the success value. */
type ResultSuccess<T> = { type: "success"; value: T };

type ResultError = { type: "error"; error: Error };

/** A result type that can be either a success or an error. */
type Result<T> = ResultSuccess<T> | ResultError;
