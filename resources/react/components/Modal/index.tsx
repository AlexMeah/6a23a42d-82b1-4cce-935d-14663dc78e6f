import * as React from 'react';
import cn from 'classnames';

type ModalProps = {
    children: React.ReactNode;
    open: boolean;
    labelledBy: string;
    close: () => void;
};

export default function Modal({ children, open, labelledBy, close }: ModalProps) {
    return (
        <div
            className={cn(
                'fixed top-0 left-0 z-50 items-center justify-center w-full h-full bg-black bg-opacity-20 js-add-review-modal',
                open ? 'flex' : 'hidden'
            )}
            onClick={close}
        >
            <div
                onClick={(e) => e.stopPropagation()}
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
