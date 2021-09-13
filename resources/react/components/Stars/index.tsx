import * as React from 'react';
import Rating from '@material-ui/lab/Rating';

const Star = (props) => (
    <svg {...props} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.8947 14.3211C32.6603 13.6474 32.0892 13.1495 31.3862 13.047L23.3164 11.8021L19.7135 4.06914C19.3767 3.43937 18.7323 3 18 3C17.2677 3 16.6233 3.43937 16.2865 4.06914L12.6836 11.8021L4.56989 13.047C3.91083 13.1495 3.33965 13.6474 3.10532 14.3211C2.87099 14.9802 3.03209 15.7271 3.54469 16.2251L9.43226 22.2445L8.02628 30.8122C7.92376 31.5152 8.23132 32.2182 8.78785 32.6576C9.1247 32.8919 9.49085 32.9944 9.90093 32.9944C10.1938 32.9944 10.5014 32.9212 10.809 32.7601L18 28.7764L25.191 32.7601C25.4986 32.9212 25.8062 32.9944 26.0991 32.9944C26.5092 32.9944 26.8753 32.8919 27.2121 32.6576C27.7687 32.2182 28.0762 31.5152 27.9737 30.8122L26.5677 22.2445L32.4553 16.2251C32.9679 15.7271 33.129 14.9802 32.8947 14.3211Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <filter
                id="filter0_i"
                x="3"
                y="3"
                width="30"
                height="29.9944"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="-1" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            </filter>
        </defs>
    </svg>
);

type StarsProps = {
    name?: string;
    count: number;
    interactive?: boolean;
};

export default function Stars({ interactive = false, count, name = undefined }: StarsProps) {
    const [value, setValue] = React.useState<number | null>(() => count);

    React.useEffect(() => {
        setValue(count);
    }, [count]);

    return (
        <Rating
            icon={<Star className="flex-shrink-0 inline-block w-8 h-8 text-yellow-3" />}
            emptyIcon={<Star className="flex-shrink-0 inline-block w-8 h-8 text-gray-400" />}
            name={name || 'rating'}
            value={value}
            onChange={(_e, newValue) => setValue(newValue)}
            precision={0.5}
            readOnly={!interactive}
        />
    );
}
