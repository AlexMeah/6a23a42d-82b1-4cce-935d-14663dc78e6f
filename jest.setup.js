import '@testing-library/jest-dom';
import edge from 'edge.js';

global.fetch = require('jest-fetch-mock');

const { join } = require('path');

edge.mount(join(__dirname, 'resources/views'));
