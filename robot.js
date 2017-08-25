let directionMap = {
  north: { value: 'north', left: 'west', right: 'east'},
  east: { value: 'east', left: 'north', right: 'south'},
  south: { value: 'south', left: 'east', right: 'west'},
  west: { value: 'west', left: 'south', right: 'north'}
};

class Robot {
  constructor() {
  	this.direction = null;
  	this.isPlaced = false;
  	this.tableSize = { x: 4, y: 4 };
  	this.position = { x: null, y: null };
  }

  place (paramList) {
	  let x = typeof(paramList[0]) == 'string' ? parseInt(paramList[0]) : paramList[0];
	  let y = typeof(paramList[1]) == 'string' ? parseInt(paramList[1]) : paramList[1];
	  let direction = directionMap[paramList[2]].value;

	  if (x > this.tableSize.x || y > this.tableSize.y) {
	    return this;
	  }

	  this.isPlaced = true;
	  this.position.x = x;
	  this.position.y = y;
	  this.direction = direction;

	  return this;
	};

	move () {
	  if (!this.isPlaced) {
	    return this;
	  }

	  let x = this.position.x;
	  let y = this.position.y;

	  switch (this.direction) {
	    case 'north':
	      if (++y < this.tableSize.y) {
	        this.position = {x: x, y: y}
	      }
	      break;
	    case 'east':
	      if (++x < this.tableSize.x) {
	        this.position = {x: x, y: y}
	      }
	      break;
	    case 'south':
	      if (--y >= 0) {
	        this.position = {x: x, y: y};
	      }
	      break;
	    case 'west':
	      if (--x >= 0) {
	        this.position = {x: x, y: y}
	      }
	      break;
	    default:
	      break;
	  }

	  return this;
	};

	left (direction) {
	  if (!this.isPlaced) {
	    return this;
	  }

	  let resultDirection = directionMap[this.direction]['left'];

	  if (resultDirection) {
	    this.direction = resultDirection;
	  }

	  return this;
	};

	right (direction) {
	  if (!this.isPlaced) {
	    return this;
	  }

	  let resultDirection = directionMap[this.direction]['right'];

	  if (resultDirection) {
	    this.direction = resultDirection;
	  }

	  return this;
	};

	report () {
	  if (!this.isPlaced) {
	    return this;
	  }

	  console.log('REPORT:', [this.position.x, this.position.y,this.direction.toUpperCase()].join(','));

	  return this;
	};

	execInstructions (instructionList) {
	  let instruction;
	  let robot = this;

	  for (let i = 0; i<instructionList.length; i++) {
	    instruction = instructionList[i];

	    let instructionArr = instruction.split(' ');
	    let command = instructionArr[0].toLowerCase();

	    if (instructionArr.length == 2) {
	     	let args = instructionArr[1].toLowerCase().split(',');
	      robot = this[command](args);
	    } else {
	      robot = this[command]()
	    }
	  }

	  return robot;
	};
}

module.exports = Robot;
