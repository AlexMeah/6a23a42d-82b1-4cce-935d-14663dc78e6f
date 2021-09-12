import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Stars from '.';

describe('Star component', () => {
    describe('Static', () => {
        it('should render the correct number of highlighted stars based on count prop', () => {
            let { container } = render(<Stars count={4} />);

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(4);

            ({ container } = render(<Stars count={3} />));

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(3);
        });

        it('should round to the nearest full star', () => {
            let { container } = render(<Stars count={4.4} />);

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(4);

            ({ container } = render(<Stars count={4.5} />));

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(5);

            ({ container } = render(<Stars count={4.6} />));

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(5);
        });
    });

    describe('Interactive', () => {
        it('should update on change', () => {
            let { container } = render(<Stars interactive count={0} />);

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(0);

            userEvent.click(screen.getAllByRole('radio')[2]);

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(3);

            userEvent.click(screen.getAllByRole('radio')[4]);

            expect(container.querySelectorAll('.stars__star')).toHaveLength(5);
            expect(container.querySelectorAll('.stars--fill')).toHaveLength(5);
        });
    });
});
