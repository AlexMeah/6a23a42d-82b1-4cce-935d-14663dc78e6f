import * as React from 'react';
import cn from 'classnames';

export default function Stars({ interactive = false, count, name = undefined }) {
    const [roundedCount, setRoundedCount] = React.useState(() => Math.round(count));

    return (
        <ul
            className={cn('flex space-x-2 text-yellow-400 stars', {
                'js-stars': interactive,
            })}
        >
            {Array(5)
                .fill(0)
                .map((_v, index) => (
                    <li
                        key={index}
                        className={cn('stars__star', {
                            'stars--fill': index + 1 <= roundedCount,
                        })}
                    >
                        {interactive ? (
                            <label className="cursor-pointer">
                                <input
                                    onChange={(e) => setRoundedCount(+e.target.value)}
                                    className="stars__star-input"
                                    type="radio"
                                    required
                                    name={name || 'rating'}
                                    value={index + 1}
                                    checked={Boolean(roundedCount === index + 1)}
                                />
                                <i className={cn('stars__star-icon')}></i>
                            </label>
                        ) : (
                            <i className="stars__star-icon"></i>
                        )}
                    </li>
                ))}
        </ul>
    );
}
