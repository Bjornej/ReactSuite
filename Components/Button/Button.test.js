var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var should = require('should');
import Button from "./Button";
import Promise from "core-js/es6/promise";

describe('Button', () => {
  it('renders without problems', () => {
    var root = TestUtils.renderIntoDocument(<Button />);
    root.should.be.ok;
  });

  it('renders childrens when passed', () => {
    var root = TestUtils.renderIntoDocument(<Button><i>prova</i></Button>);
    TestUtils.findRenderedDOMComponentWithTag(root, "i").textContent.should.eql("prova");
  });

  it('uses disabled props if passed', () => {
    var root = TestUtils.renderIntoDocument(<Button disabled/>);
    TestUtils.findRenderedDOMComponentWithTag(root, "button").disabled.should.eql(true);
  });

  it('is not disabled by default', () => {
    var root = TestUtils.renderIntoDocument(<Button/>);
    TestUtils.findRenderedDOMComponentWithTag(root, "button").disabled.should.be.false;
  });

  it('it is disabled when a promise-returning function is running', () => {
    var p = new Promise(() => { });
    var root = TestUtils.renderIntoDocument(<Button onClick={() => { return p; } }/>);
    var button = TestUtils.findRenderedDOMComponentWithTag(root, "button");

    TestUtils.Simulate.click(button);

    button.disabled.should.be.true;
  });

  it('it is not disabled when a promise-returning function has run', () => {
    var p = new Promise(() => { });
    var root = TestUtils.renderIntoDocument(<Button onClick={() => { return p; } }/>);
    var button = TestUtils.findRenderedDOMComponentWithTag(root, "button");

    TestUtils.Simulate.click(button);
    Promise.resolve(p);

    button.disabled.should.be.false;
  });

  it('while function is running onClick function is not invoked', () => {
    var p = new Promise(() => { });
    var i = 0;
    var root = TestUtils.renderIntoDocument(<Button onClick={() => { i++; return p; } }/>);
    var button = TestUtils.findRenderedDOMComponentWithTag(root, "button");

    TestUtils.Simulate.click(button);
    TestUtils.Simulate.click(button);
    TestUtils.Simulate.click(button);
    TestUtils.Simulate.click(button);
    TestUtils.Simulate.click(button);

    Promise.resolve(p);
    i.should.be.eql(1);
  });
});