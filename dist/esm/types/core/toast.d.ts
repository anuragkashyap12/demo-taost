import { Renderable, Toast, ToastOptions, DefaultToastOptions, ValueOrFunction } from './types';
declare type Message = ValueOrFunction<Renderable, Toast>;
declare type ToastHandler = (message: Message, options?: ToastOptions) => string;
declare const toast: {
    (message: Message, opts?: ToastOptions): string;
    error: ToastHandler;
    success: ToastHandler;
    loading: ToastHandler;
    custom: ToastHandler;
    dismiss(toastId?: string): void;
    remove(toastId?: string): void;
    promise<T>(promise: Promise<T>, msgs: {
        loading: Renderable;
        success: ValueOrFunction<Renderable, T>;
        error: ValueOrFunction<Renderable, any>;
    }, opts?: DefaultToastOptions): Promise<T>;
};
export { toast };
