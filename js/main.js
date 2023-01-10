// When screen is clicked, screen will clear (to result) the first time; 

// When cleared screen is clicked, current result will be cleared;

//Input Vars
// const keys = document.querySelectorAll('.key');
// console.log(keys);
// keys.forEach(function(currentKey){
//   currentKey.addEventListener('click', e => console.log(`${e.target} 25`))
// });

//Global Vars
let previousResult = "", operator = "", newNum="", calculated = false;

// Key Bindings
document.querySelector('#zero').addEventListener('click', keyZeroAction);
document.querySelector('#one').addEventListener('click', keyOneAction);
document.querySelector('#two').addEventListener('click', keyTwoAction);
document.querySelector('#three').addEventListener('click', keyThreeAction);
document.querySelector('#four').addEventListener('click', keyFourAction);
document.querySelector('#five').addEventListener('click', keyFiveAction);
document.querySelector('#six').addEventListener('click', keySixAction);
document.querySelector('#seven').addEventListener('click', keySevenAction);
document.querySelector('#eight').addEventListener('click', keyEightAction);
document.querySelector('#nine').addEventListener('click', keyNineAction);
document.querySelector('#decimal').addEventListener('click', keyDecimalAction);
document.querySelector('#multiply').addEventListener('click', e => keyMultiplyAction(e));
document.querySelector('#add').addEventListener('click', e => keyAddAction(e));
document.querySelector('#subtract').addEventListener('click', e => keySubtractAction(e));
document.querySelector('#divide').addEventListener('click', e => keyDivideAction(e));
document.querySelector('#equals').addEventListener('click', keyEqualsAction);
document.querySelector('.calcScreen').addEventListener('click', clear);

//Display output
let display = document.querySelector('.calcScreen h1')//.innerText


//Key Binding Actions
function keyZeroAction(){
    inputNum("0");
}
function keyOneAction(){
    inputNum("1");
}
function keyTwoAction(){
    inputNum("2");
}
function keyThreeAction(){
    inputNum("3");
}
function keyFourAction(){
    inputNum("4");
}
function keyFiveAction(){
    inputNum("5");
}
function keySixAction(){
    inputNum("6");
}
function keySevenAction(){
    inputNum("7");
}
function keyEightAction(){
    inputNum("8");
}
function keyNineAction(){
    inputNum("9");
}
function keyDecimalAction(){
    inputDec();
}
function keyMultiplyAction(e){
    operation("*", e);
}
function keyAddAction(e){
    operation("+", e);
}
function keySubtractAction(e){
    operation("-", e);
}
function keyDivideAction(e){
    operation("/", e);
}
function keyEqualsAction(){ 
    calculate();           
}
function clear(){
    //CE
    if(newNum!=="" && !calculated) 
    {
        newNum="";
        operator="";
        console.log("CE")
    }
    
    //AC  
    else 
    {
        previousResult = "";
        newNum = "";
        operator = "";
        calculated = false;
        console.log("AC")
    }
    clearOperationBackgrounds();
    updateDisplay();
    console.log(`Previous Result is ${previousResult}; Operator = ${operator}; New Number is ${newNum}; Calculated is ${calculated}; Display = ${display}`);
}

function clearOperationBackgrounds(){
    document.querySelectorAll('.operator').forEach(thisButton => thisButton.style.backgroundColor = "");
}

//Calculation Functions

function updateDisplay() {
    // if((previousResult!=="" && newNum!=="" && !calculated)
    //         ||(previousResult==="" && operator==="" && newNum!=="" && !calculated))
    //     display = newNum;
    // else
    //     display = previousResult;
    if(newNum!=="" && !calculated){
        display.innerText = newNum;
        //document.querySelector('.calcScreen h1').innerText = newNum;
        console.log("updated display with newNum")
    }
        
    else{
        display.innerText = previousResult;
        console.log("updated display with prevNum")
    }
        
}

function inputDec(){
    if(calculated && newNum!==""){
            clear(); //AC
    }
    if(newNum.includes(".")){
        console.log("Number already has a decimal")
        return;
    }
    if(Number(newNum)===0 || newNum ==="")
        newNum = "0.";
    else
        newNum += ".";
    
    calculated = false;
    updateDisplay();
}
        

function inputNum(inputNumberVal){
    if(calculated && newNum!=="")
        clear(); //AC
    newNum += inputNumberVal;    
    calculated = false;
    updateDisplay();

    console.log(`InputNum: Previous Result is ${previousResult}; Operator = ${operator}; New Number is ${newNum}; Calculated is ${calculated};`);
}

function operation(inputOp, e){
    console.log(`Starting Operation: Previous Result is ${previousResult}; Operator = ${operator}; New Number is ${newNum}; Calculated is ${calculated};`);


//if calculation in progress (both prev & new nums) and starting new calculation ontop of it's result 
if(previousResult !=="" && operator !=="" && newNum!=="" && !calculated){
    calculate();
    console.log("calc in progress, calulating and starting new calculation ontop of its result ")
}

//if calc completed, and this is a new operation ontop of previous result
    //previousResult!=="" && operator!=="" && newNum == "" && caculated)
if(previousResult!=="" && operator!=="" && newNum !== "" && calculated){
    newNum = "";
    console.log("Calc completed.. starting new operation ontop of previous result")
}
    
// If (starting new calculation from AC
else if(previousResult === "" && operator === ""){
    previousResult = newNum;
    newNum = "";
    console.log("Starting new calculation from AC")
}
// else (new calc started but no 2nd arg defined yet, so just switching operators, so just need shared logic
console.log(`Operator changed to: ${inputOp}`)
operator = inputOp;
clearOperationBackgrounds();
document.querySelector(`#${e.srcElement.id}`).style.backgroundColor = "red";
updateDisplay();
 
}

function calculate(){
    if(operator === "/" && ["","0"].includes(newNum))
        {
            clear()
            console.log("Error: Can't divide by nothing")
            return;
        }    

        console.log(`Calculated: Storing result of following equation: ${previousResult}${operator}${newNum} ... into previousResult`);
    previousResult = eval(`${previousResult}${operator}${newNum}`);
        console.log(`Calculated: Previous Result is now ${previousResult}`);

    clearOperationBackgrounds();
    calculated = true;
    updateDisplay();

/* Calculate
    *Input Parameters: PreviousResult, Operator, outputScreen, isNum2
    *Return: OperationResult
    *Logic:
        * if(operator=division)
            * if outputScreenNumber != 0 
                * Return "Error: Can't Divide by 0"
            * else
                * switch(this.operation) {
                    case "+":
                        return param1 + param2;
                    case "-":
                        return param1 - param2;
                    case "*":
                        return param1 * param2;
                    case "/":{
                        if outputScreenNumber != 0 
                            * Return "Error: Can't Divide by 0"
                        return param1 / param2;
                    }
                        
                }
        
*/
}




