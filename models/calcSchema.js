const mongoose = require("mongoose");

// schema
const calcSchema = {
  calculation: String,
};

// model
const Calculation = mongoose.model("calculation", calcSchema);

const calc1 = new Calculation({
  calculation: "2 + 2 = 4",
});

const calc2 = new Calculation({
  calculation: "7 * 7 = 49",
});

const calc3 = new Calculation({
  calculation: "81 / 9 = 9",
});

const defaultCalcs = [calc1, calc2, calc3];

module.exports = Calculation;
