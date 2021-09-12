import '@testing-library/jest-dom';
import edge from 'edge.js';

const { join } = require('path');

edge.mount(join(__dirname, 'resources/views'));
