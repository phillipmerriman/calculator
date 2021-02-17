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

    // Call to the db to get the last 10 calculations
    $.ajax({
      type: "GET",
      url: "/api/",
    }).then(function (data) {
      data.slice(-10).map((index) => {
        $("#results-card").prepend(`<h1">${index.calculation}</h1><hr />`);
      });
    });
  }

  // Handle clicks on numbers
  $(".number").on("click", function () {
    // Check if we've already run a calculation, if so... we'll just exit.
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

  // Handle clicks on operators
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

  // Handle clicks on "equals" button
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

    // Based on the operator that was chosen,
    // run the operation and set the HTML of the result of that operation
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

    // Render result of calculation to current calculation card
    $("#this-result").text(result);

    // Variable that makes a string out of the calculation, that we will add to the DB
    let calc = `${firstNumber} ${$("#operator").text()} ${secondNumber} = ${result}`;

    // Add the calculation to the DB
    $.ajax({
      type: "POST",
      url: "/api/submit",
      dataType: "json",
      data: {
        calculation: calc,
      },
    }).then(function (data) {
      $("#results-card").empty();
      initializeCalculator();
    });
  });

  // Handle click on "clear" button
  $(".clear").on("click", function () {
    // Empty the results card prior to populating it with 10 most recent calculations
    $("#results-card").empty();
    // Empty the current calculation card
    $("#first-number, #second-number, #operator, #this-result").empty();
    // Call initializeCalculator so we can reset the state of our app
    initializeCalculator();
  });

  // Call initializeCalculater so we can set the state of our app
  initializeCalculator();
});
