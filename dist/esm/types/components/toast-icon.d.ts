import * as React from 'react';
import { Toast } from '../core/types';
import { ErrorTheme } from './error';
import { LoaderTheme } from './loader';
import { CheckmarkTheme } from './checkmark';
export declare const AnimatedIconWrapper: import("goober").StyledVNode<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & import("goober").DefaultTheme & {
    as?: any;
}, never>>;
export declare type IconThemes = Partial<{
    success: CheckmarkTheme;
    error: ErrorTheme;
    loading: LoaderTheme;
}>;
export declare const ToastIcon: React.FC<{
    toast: Toast;
}>;
