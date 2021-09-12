import * as React from 'react';
import cn from 'classnames';

type ModalProps = {
    children: React.ReactNode;
    open: boolean;
    labelledBy: string;
};

export default function Modal({ children, open, labelledBy }: ModalProps) {
    return (
        <div
            className={cn(
                'fixed top-0 left-0  items-center justify-center w-full h-full bg-black bg-opacity-20 js-add-review-modal',
                open ? 'flex' : 'hidden'
            )}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                className="p-12 bg-white rounded-2xl"
            >
                {children}
            </div>
        </div>
    );
}
