'use strict';

var vorpal = require('vorpal')(); //Vorpal is a REPL environment
var stack = []; //our stack

//exit process on 'q' command
var exit = function(args, cb) {
  console.log('KBye!');
  process.exit();
};

//calculate and print out result
var calculate = function(operator) {
  var operand1 = stack.pop();
  if(typeof operand1 === 'undefined') {
    console.log('You need 2 operands on stack to call an operation');
    return;
  }
  var operand2 = stack.pop();
  if(typeof operand2 === 'undefined') {
    console.log('You need 2 operands on stack to call an operation');
    stack.push(operand1); //return operand1 to stack;
    return;
  }
  var result;
  switch(operator) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '/':
      result = operand1 / operand2;
      break;
    case '*':
      result = operand1 * operand2;
      break;
    default: //we shouldn't get here - taken care of at input handling function, but just in case
      console.log('Use one of following operations: +, -, /, *');
      return;
  }
  console.log(result);
  stack.push(result);
};

//handle input to command
var handleInput = function(args, cb) {
  if(args === 'q') {
    exit();
  }
  var number = parseFloat(args);
  if(isNaN(number)) {
    if(args !== '+' && args !== '-' && args !== '/' && args !== '*') {
      console.log('Input can be either a number, or one of the following operations: +, -, /, *');
      return cb();
    }
    calculate(args);
  }
  else {
    stack.push(number);
    console.log(number);
  }
  cb();
};

//handle exit command
vorpal.find('exit')
  .description('Exit program')
  .alias('q')
  .action(exit);

//enter RPN mode - requied since Vorpal does
vorpal
  .mode('rpn')
  .description('Start RPN functionality')
  .init(function(args, cb) {
    console.log('Welcome to RPN. Enter numbers or operators. To exit, type `q` or `exit`.');
    cb();
  })
  .action(handleInput);

//show contents of stack
vorpal
  .command('stack')
  .alias('list')
  .description('Dump stack contents')
  .action(function(args, cb) {
    console.log(stack);
    cb();
  });

vorpal
  .delimiter('$')
  .show();