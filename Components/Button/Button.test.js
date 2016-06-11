var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var expect = require('expect');
import Button from "./Button";

describe('Button', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<Button />);
    expect(root).toExist();
  });


  it('uses disabled props if passed', function () {
    var root = TestUtils.renderIntoDocument(<Button disabled/>);
    expect(TestUtils.findRenderedDOMComponentWithTag(root,"button").disabled).toBe(true);
  });
});