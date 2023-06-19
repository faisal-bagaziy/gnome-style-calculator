//getting a collection of button that are  defined  in  the HTML
var operands = document.querySelectorAll(".number");
var operator = document.querySelectorAll(".input");
var  equation = [];
let k = 0; 

//looping over the  collection and  getting  the  value of each 
for (var i = 0; i < operands.length; i++) {
  operands[i].addEventListener("click", function() {
    var buttonValue = this.value;
    updatedEntered(buttonValue);
  });
}

//looping over the  collection and  getting  the  value of each 
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function() {
    var buttonValue = this.value;
    updatedEntered(buttonValue);
  });
}

//display the last entrey and add it to the string 
function updatedEntered(value){
  var entered = document.querySelector(".entered");
  const content = document.createElement('div');
  content.textContent = `${value}`;
  entered.appendChild(content);
  addToEquation(value);
  console.log(equation);
}

//remove last entrey
let del = document.getElementById("del");
  del.addEventListener("click", function() {
    document.querySelector(".entered").lastChild.remove();
    deleteFromEquation()
    console.log(equation)
});

//Clear 
let clear = document.getElementById("clear");
clear.addEventListener("click", function() {
  let entered = document.querySelector(".entered");
  let children = entered.querySelectorAll("*");
  children.forEach(function(child) {
    entered.removeChild(child);
  });
  equation = [];
  k=0;
});

function addToEquation(value){
  if(isNaN(value) && value !== "."){
    equation.push(value);
    k +=2;
  }else if(equation[k] === "" || equation[k] === undefined){
    equation[k] = value;
  }else{
    equation[k] += value;
  }
}

function deleteFromEquation() {
    if(equation[equation.length-1].length > 1){
      sliceThis =  equation[equation.length-1];
      console.log(sliceThis);
      equation[equation.length-1] = sliceThis.slice(0,-1);
    }else{
        equation.pop();
        console.log("imhere");
    }
    k=0;
}

function parseToPostFix() {
  const outputQueue = [];
  const inputStack = [];

  var operators = {
    "+": { precedence: 2, associativity: "left" },
    "-": { precedence: 2, associativity: "left" },
    "×": { precedence: 3, associativity: "left" },
    "÷": { precedence: 3, associativity: "left" },
    "²": { precedence: 4, associativity: "right" },
    "√": { precedence: 4, associativity: "right" },
    "mod": {precedence:3, associativity: "left"},
    "%": {precedence:  3, associativity: "left"},
    "(": { precedence: 50, associativity: "left" }
  };
  
  equation.forEach(function(eq){
     if(eq in operators){
        while (inputStack.length > 0 
            && inputStack[inputStack.length - 1] !== `(` 
            &&((operators[eq].associativity === "left" 
            &&  operators[eq].precedence <= operators[inputStack[inputStack.length - 1]].precedence) 
            || (operators[eq].associativity === "right" 
            &&  operators[eq].precedence >= operators[inputStack[inputStack.length - 1]].precedence))) {
                outputQueue.push(inputStack.pop());
            }
            inputStack.push(eq);
     }else if (eq === `(`){
        inputStack.push(eq);
     }else if (eq == `)`) {
        while (inputStack.length > 0 && inputStack[inputStack.length - 1] !== `(`) {
        console.log(inputStack[inputStack.length - 1]);
        outputQueue.push(inputStack.pop())
        console.log("i just pooped something");
         }
        inputStack.pop();
     }else{
        outputQueue.push(eq);
       }     
    });
    while (inputStack.length > 0) {
        const topOfStack = inputStack.pop();
        if(topOfStack !== `(`){
        outputQueue.push(topOfStack);
        }
   }
    console.log(outputQueue);
    console.log(inputStack);
    evaluatePostfix(outputQueue);
   
}

function evaluatePostfix(postfixEquation){
    const operandStack = [];
    
    var operators = {
    "+": { precedence: 2, associativity: "left" },
    "-": { precedence: 2, associativity: "left" },
    "×": { precedence: 3, associativity: "left" },
    "÷": { precedence: 3, associativity: "left" },
    "²": { precedence: 4, associativity: "right" },
    "√": { precedence: 4, associativity: "right" },
    "mod": { precedence: 50, associativity: "left" },
    "%": {precedence:  3, associativity: "left"}
  };

    postfixEquation.forEach(
        function(token){
            if(!isNaN(token)){
                operandStack.push(token);
            }else if(token in operators){
                if(token === "+" || token === "-" || token === "×" || token === "÷" || token === "mod"){
                    const y = operandStack.pop();
                    const x = operandStack.pop();
                    console.log("im here")

                    if(token === "+"){
                        operandStack.push(parseInt(x) + parseInt(y));
                    }else if(token === "-"){
                        operandStack.push(x-y);
                    }else if(token === "×"){
                        operandStack.push(x*y)
                    }else if(token === "÷"){
                        operandStack.push(x/y);
                    }else{
                        operandStack.push(x%y);
                    }
                }else{
                    const x = operandStack.pop();

                    if(token === "²"){
                        operandStack.push(Math.pow(x,2)); 
                    }else if(token === "%"){
                        operandStack.push(x/100);
                    }else{
                        operandStack.push(Math.pow(x,0.5));
                    }
                }

            }
        }
    )
    console.log("im in evalute: ")
    console.log(operandStack);

}
const equals = document.getElementById("equal");
equals.addEventListener("click", function() {
    equation = equation.filter(function(element){
        return element.trim() !== "";
    });
    console.log(equation);
  parseToPostFix();
});
