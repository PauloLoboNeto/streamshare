/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/custom-elements.d.ts
// export { };
'use client'
export declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            'ss-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                label?: string;
                cssText?: string;
                type?: any;
                class?: any;
                loading?: any;
                className?: string;
            };
            'ss-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                label?: string;
                cssText?: string;
                type?: any;
                class?: any;
                loading?: any;
                className?: string;
            };
            'divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            };
        }
    }
}