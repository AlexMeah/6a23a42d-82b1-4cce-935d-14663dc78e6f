import * as React from 'react';
import { hydrate } from 'react-dom';
import ProductPage, { ProductProps } from '../../react/pages/ProductPage';

const props: ProductProps = window.PAGE_DATA;

hydrate(<ProductPage {...props} />, document.getElementById('app'));
