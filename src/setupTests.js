import "@testing-library/jest-dom/extend-expect";

delete global.window.matchMedia;
global.window.matchMedia = () => false;
