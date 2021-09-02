export interface Context<T, E> {
    source: string;
    stack: Options<T, E>[];
    failure: Failure<E> | null;
    cache: Map<number, Map<Rule<T, E>, Result<T> | Failure<E>>>;
}

export interface Options<T, E> {
    context: Context<T, E>;
    skip: Rule<T, E>[];
    token: T;
    error: E;
}

export type Token<T> = Result<T> | string;
export type Result<T> = Token<T>[] & Interval & { token: T };
export type Failure<E> = Interval & { error: E };

export interface Interval {
    start: number;
    stop: number;
}

export type Rule<T, E> =
    | ((options: Options<T, E>, index: number) => Result<T> | Failure<E>)
    | string
    | null;
