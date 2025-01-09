import { take } from "rxjs";
export default function tryCatchErrorAndSubscribe(observable, OnSuccess, res, collection) {
    return observable.pipe(take(1)).subscribe({
        next: OnSuccess,
        error: (error) => {
            console.log('error', error);
            res.status(404).send(`error on ${collection}`);
        },
    });
}
//# sourceMappingURL=catchAsyncError.js.map