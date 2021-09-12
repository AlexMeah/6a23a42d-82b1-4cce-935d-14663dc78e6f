import View from '@ioc:Adonis/Core/View';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

import components from '../resources/react/components';

declare global {
    interface Window {
        PAGE_DATA: any;
    }
}

View.global('reactComponent', (componentName, props) => {
    const Component = components[componentName];

    if (!Component) {
        throw new Error('Component ' + componentName + ' not found!');
    }

    return ReactDOMServer.renderToStaticMarkup(
        <div data-react-component-name={componentName} data-react-props={JSON.stringify(props)}>
            <Component {...props} />
        </div>
    );
});
