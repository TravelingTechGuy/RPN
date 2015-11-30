Reverse Polish Notation calculator
==================================

This app uses the Vorpal REPL environment to simulate an RPN calculator.

## Installation

1. Clone the repo
1. Run `npm install` in the app's folder

## Running the app

1. Run `npm start` (or `node index`) in the app's folder
1. You'll be put into the ap, with a **$** prompt
1. You can type `help` to see available commands
1. Type `rpn` to start using the calculator
1. Type `q` or `exit` to exit the app
1. Type any number to add it to the queue
1. Type one of the 4 operands (+, - ,/ , *) to carry out the operations on the last 2 operands

## Sample run

```shell
> npm start
$ help

  Commands:

    help [command]   Provides help for a given command.
    exit [options]   Exit program
    rpn              Start RPN functionality
$ rpn
Welcome to RPN. Enter numbers or operators. To exit, type `exit`.
$ rpn: 3
3
$ rpn: 7
7
$ rpn: +
10
$ rpn: 2
2
$ rpn: -
-8
$ rpn: 2
2
$ rpn: /
-0.25
$ rpn: q
KBye!
```

## Error handling

Error handling is rudimentary. 

1. Only numbers that can be parsed, operators, and end commands are checked for.
1. The execution code always checks to see that there are 2 available operands on the stack before calculating:
If there are none, an error is issued. If there's only one, an error is issued, and it is placed back on stack.
1. It may be possible to break this REPL, or send option parameters. But this was built as quick exercise, and not intended for production use (although who uses an RPN calculator in production?).