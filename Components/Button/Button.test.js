var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var should = require('should');
import Button from "./Button";

describe('Button',  () => {
  it('renders without problems', () => {
    var root = TestUtils.renderIntoDocument(<Button />);
    root.should.be.ok;
  });

  it('renders childrens when passed', () => {
    var root = TestUtils.renderIntoDocument(<Button><i>prova</i></Button>);
    TestUtils.findRenderedDOMComponentWithTag(root,"i").textContent.should.eql("prova");
  });

  it('uses disabled props if passed', () => {
    var root = TestUtils.renderIntoDocument(<Button disabled/>);
    TestUtils.findRenderedDOMComponentWithTag(root,"button").disabled.should.eql(true);
  });
});