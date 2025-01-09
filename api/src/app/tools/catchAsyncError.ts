import express from "express";
import { Observable, ObservableInput, catchError, take } from "rxjs";

export default function tryCatchErrorAndSubscribe<T>(
  observable: Observable<T>,
  OnSuccess: (T) => void,
  res: express.Response,
  collection: string
) {
  return observable.pipe(take(1)).subscribe({
    next: OnSuccess,
    error: (error) => {
        console.log('error', error);
        res.status(404).send(`error on ${collection}`)
    },
  });
}
