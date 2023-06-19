My implementable allow the end user to put equation in their raw form"String form, infix notation" --> `(a + b) ∗ c ` it will count the proper priorities and handle parentheses,  generally some calculator allow user to calculate only 2 operand  --> `a+b` --> Then `*c`.

## Parsing expressions
#### Shunting Yard algorithm
it's not efficient to design a solution for infix notation that is the reason i will parse the expressions to postfix notation `(a + b) ∗ c --> a b + c ∗`. that's why i will use Shunting Yard algorithm to parse the expression since it's the most known one especially for mathematical expression.

Shunting yard algorithms convert infix to postfix, why? its much easier to evaluate the converted expression. Now lets talk about it's mechanism:

- it will use two stacks one for operators and one for output. done
- if the incoming symbol is an operand, print it"add it to output stack".
- if the incoming symbol is a  left parenthesis push it to the operator stack.
- If the incoming symbol is a right parenthesis:
	- discard the right parenthesis
	- pop and print"add to output stack" until you encounter left parenthesis; pop it and discard it.
- If the incoming symbol is an operator and the stack is empty or contains a left parenthesis on top, push the incoming operator onto the stack.
- If the incoming symbol is an operator and has either higher precedence than the operator on the top of the stack, or has the same precedence as the operator on the top of the stack and is ==right associative== -- push it on the stack.
- If the incoming symbol is an operator and has either lower precedence than the operator on the top of the stack, or has the same precedence as the operator on the top of the stack and is ==left associative== -- continue to pop the stack until this is not true. T==hen, push the incoming operator.==
- At the end of the expression, pop and print all operators on the stack. (No parentheses should remain.)

## evaluating postfix expression
- While there are input tokens left, read the next token and then do one of two things:

    - If the token is a value, push it onto the stack.
    - Otherwise, the token is an operator (operator here includes both operators and functions), so we do the following:
        - Presuming the operator takes n arguments, pop the top n values from the stack.
        - Apply the operator to these n values.
        - Push the result(s), if any, back onto the stack.
	- When there is no more input, there should only be one value in the stack -- that value is the result of the calculation.
