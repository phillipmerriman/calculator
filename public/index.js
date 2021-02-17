$(document).ready(function () {
  // Make our variables global to the runtime of our application
  let firstNumber = 0;
  let secondNumber = 0;
  let operator = "";
  let result = 0;
  let isOperatorChosen = false;
  let isCalculated = false;

  // Use a function to initialize our calculator.
  // This way when the user hits clear, we can guarantee a reset of the app.
  function initializeCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    isOperatorChosen = false;
    isCalculated = false;

    $.ajax({
        type: "GET",
        url: "/api/",
    }).then(function (data) {
        data.map((index) => {
          $("#results-card").prepend(`<h1">${index.calculation}</h1><hr />`);
        });        
    });

    $("#first-number, #second-number, #operator, #this-result").empty();
  }

  $(".number").on("click", function () {
    // Check if we've already run a calculation, if so... we'll just.
    if (isCalculated) {
      return false;
    }

    // If operator is chosen, we should be writing the secondNumber, otherwise, the firstNumber
    if (isOperatorChosen) {
      secondNumber += $(this).val();
      $("#second-number").text(secondNumber);
    } else {
      firstNumber += $(this).val();
      $("#first-number").text(firstNumber);
    }
  });

  $(".operator").on("click", function () {
    // Check if a first number has already been selected
    // Or we've already run a calculation, if so we just exit.
    if (!firstNumber || isCalculated) {
      return false;
    }

    // Set isOperatorChosen to true so we start writing to secondNumber
    isOperatorChosen = true;

    // Store off the operator
    operator = $(this).val();

    // Set the HTML of the #operator to the text of what was clicked
    $("#operator").text($(this).text().trim());
  });

  $(".equal").on("click", function () {
    // If we already clicked equal, don't do the calculation again
    if (isCalculated) {
      return false;
    }

    // Set isCalculated to true so that we don't get in a weird UI state by clicking buttons again
    isCalculated = true;

    // Use parseInt to convert our string representation of numbers into actual integers
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    // Based on the operator that was chosen.
    // Then run the operation and set the HTML of the result of that operation
    if (operator === "plus") {
      result = firstNumber + secondNumber;
    } else if (operator === "minus") {
      result = firstNumber - secondNumber;
    } else if (operator === "times") {
      result = firstNumber * secondNumber;
    } else if (operator === "divide") {
      result = firstNumber / secondNumber;
    } else if (operator === "power") {
      result = Math.pow(firstNumber, secondNumber);
    }

    $("#this-result").text(result);
    
    let calc = firstNumber + $("#operator").text() + secondNumber + " = " + result;
    
    $.ajax({
        type: "POST",
        url: "/api/submit",
        dataType: "json",
        data: {
            calculation: calc,
        },
    }).then(function (data) {
        $("#results-card").prepend(
          `<h1">${data.calculation}</h1><hr />`
        );
    });
  });

  $(".clear").on("click", function () {
    $("#results-card").empty();
    // Call initializeCalculator so we can reset the state of our app
    initializeCalculator();
  });

  // Call initializeCalculater so we can set the state of our app
  initializeCalculator();
});
