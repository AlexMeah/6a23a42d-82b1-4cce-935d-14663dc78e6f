import * as React from 'react';
import '../css/app.css';

import components from '../react/components';
import { render } from 'react-dom';

const reactComponentsToHydrate = Array.from(
    document.querySelectorAll('[data-react-component-name]')
);

reactComponentsToHydrate.forEach((el) => {
    const name = el.getAttribute('data-react-component-name');
    const props = JSON.parse(el.getAttribute('data-react-props') || '{}');
    const Component = components[name];

    try {
        console.log('Hydrating:', name);
        render(<Component {...props} />, el);
    } catch (err) {
        console.error('Hydration failed:', name, err);
    } finally {
        console.log('Hydrated:', name);
    }
});
