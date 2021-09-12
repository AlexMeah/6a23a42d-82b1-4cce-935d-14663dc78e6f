import * as React from 'react';
import cn from 'classnames';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export default function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'border border-gray-400 text-primary-brown py-3 px-6 rounded hover:shadow font-bold',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
