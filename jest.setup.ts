import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Router, { useRouter } from 'next/router';

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('next/router', () => ({ push: jest.fn(), pathname: '' }));
jest.mock((useRouter as unknown) as string, () => ({ push: jest.fn(), pathname: '' }));
