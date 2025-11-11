// Mock for react-native-svg to prevent TurboModule issues in tests
const React = require('react');

const mockComponent = (name) => ({ children, ...props }) =>
  React.createElement(name, props, children);

const mockSvgComponent = (name) => (props) =>
  React.createElement(name, props);

module.exports = {
  __esModule: true,
  default: mockComponent('Svg'),
  Svg: mockComponent('Svg'),
  Circle: mockSvgComponent('Circle'),
  Ellipse: mockSvgComponent('Ellipse'),
  G: mockComponent('G'),
  Text: mockComponent('Text'),
  TSpan: mockComponent('TSpan'),
  TextPath: mockComponent('TextPath'),
  Path: mockSvgComponent('Path'),
  Polygon: mockSvgComponent('Polygon'),
  Polyline: mockSvgComponent('Polyline'),
  Line: mockSvgComponent('Line'),
  Rect: mockSvgComponent('Rect'),
  Use: mockSvgComponent('Use'),
  Image: mockSvgComponent('Image'),
  Symbol: mockComponent('Symbol'),
  Defs: mockComponent('Defs'),
  LinearGradient: mockComponent('LinearGradient'),
  RadialGradient: mockComponent('RadialGradient'),
  Stop: mockSvgComponent('Stop'),
  ClipPath: mockComponent('ClipPath'),
  Pattern: mockComponent('Pattern'),
  Mask: mockComponent('Mask'),
  Marker: mockComponent('Marker'),
  ForeignObject: mockComponent('ForeignObject'),
};