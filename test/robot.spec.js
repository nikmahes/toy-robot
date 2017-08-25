let chai = require('chai');
let path = require('path');
let sinon = require('sinon');
let should = chai.should();
let Robot = require(path.join(__dirname, '..', 'robot'));

describe('Robot', () => {
  let robot;
  let spy;

  it('constructor requires no arguments', () => {
    () => {
      robot = new Robot();
    }.should.not.throw(Error);
  });

  it('initilize direction as null', () => {
    should.equal(robot.direction, null);
  });

  it('initilize isPlaced as false', () => {
    should.equal(robot.isPlaced, false);
  });

  it('initilize position as (null, null)', () => {
    should.equal(robot.position.x, null);
    should.equal(robot.position.y, null);
  });

  it('initilize tableSize as (4, 4)', () => {
    should.equal(robot.tableSize.x, 4);
    should.equal(robot.tableSize.y, 4);
  });

  it('should place a robot correctly on valid point on the table', () => {
    robot = robot.place([0,1,'north']);
    should.equal(robot.isPlaced, true);
    should.equal(robot.position.x, 0);
    should.equal(robot.position.y, 1);
    should.equal(robot.direction, 'north');
  });

  it('should ignore any place instruction that is off the board', () => {
    robot = robot.place([0,1,'north']);
    robot = robot.place([5,3,'west']);
    should.equal(robot.isPlaced, true);
    should.equal(robot.position.x, 0);
    should.equal(robot.position.y, 1);
    should.equal(robot.direction, 'north');
  });

  it('should correctly replace the robot if asked to', () => {
    robot = robot.place([0,1,'north']);
    robot = robot.move();
    robot = robot.place([2,2,'east']);
    should.equal(robot.position.x, 2);
    should.equal(robot.position.y, 2);
    should.equal(robot.direction, 'east');
  });

  it('should correctly turn left when issued a left command', () => {
    robot = robot.place([0,1,'east']);
    robot = robot.left();
    should.equal(robot.direction, 'north');
  });

  it('should correctly move when issued a move command', () => {
    robot = robot.place([0,1,'east']);
    robot = robot.move();
    should.equal(robot.position.x, 1);
    should.equal(robot.position.y, 1);
  });

  it('should report it\'s current position & direction when issued a report instruction', () => {
    spy = sinon.spy(console, 'log');
    robot = robot.place([0,1,'east']);
    robot = robot.report();
    robot = robot.move();
    robot = robot.report();
    should.equal(spy.called, true);
    should.equal(spy.callCount, 2);
    should.equal(spy.getCall(0).args[1], '0,1,EAST');
    should.equal(spy.getCall(1).args[1], '1,1,EAST');
    spy.restore();
  });

  it('should ignore all instructions before the first place instruction', () => {
    robot = robot.left();
    robot = robot.move();
    robot = robot.place([0,0,'south']);
    should.equal(robot.position.x, 0);
    should.equal(robot.position.y, 0);
    should.equal(robot.direction, 'south');
  });

   it('should ignore all instructions that would make it fall off the board', () => {
    robot = robot.place([4,4,'north']);
    robot = robot.move();
    robot = robot.right();
    robot = robot.move();
    should.equal(robot.position.x, 4);
    should.equal(robot.position.y, 4);
    should.equal(robot.direction, 'east');
  });

  it('should correctly run a series of parsed instructions 1', () => {
    spy = sinon.spy(console, 'log');
    robot.execInstructions([
      'PLACE 0,0,NORTH',
      'MOVE',
      'REPORT'
    ]);

    should.equal(robot.position.x, 0);
    should.equal(robot.position.y, 1);
    should.equal(robot.direction, 'north');
    should.equal(spy.called, true);
    should.equal(spy.getCall(0).args[1], '0,1,NORTH');
    spy.restore();
  });

  it('should correctly run a series of parsed instructions 2', () => {
    spy = sinon.spy(console, 'log');
    robot.execInstructions([
      'PLACE 0,0,NORTH',
      'LEFT',
      'REPORT'
    ]);

    should.equal(robot.position.x, 0);
    should.equal(robot.position.y, 0);
    should.equal(robot.direction, 'west');
    should.equal(spy.called, true);
    should.equal(spy.getCall(0).args[1], '0,0,WEST');
    spy.restore();
  });

  it('should correctly run a series of parsed instructions 3', () => {
    spy = sinon.spy(console, 'log');
    robot.execInstructions([
      'PLACE 1,2,EAST',
      'MOVE',
      'MOVE',
      'LEFT',
      'MOVE',
      'REPORT'
    ]);

    should.equal(robot.position.x, 3);
    should.equal(robot.position.y, 3);
    should.equal(robot.direction, 'north');
    should.equal(spy.called, true);
    should.equal(spy.getCall(0).args[1], '3,3,NORTH');
    spy.restore();
  });
});
