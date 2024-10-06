import _ from "lodash";

// Calculate the sum of amounts grouped by type
export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) {
        return _.sumBy(objs, "amount"); // Total sum of all transactions if no type is specified
      }
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();

  return sum;
}

// Calculate labels with percentage for each type
export function getLabels(transaction) {
  let amountSum = getSum(transaction, "type");
  let total = _.sum(amountSum.map((obj) => obj.total)); // Total sum of all types

  let percent = _(amountSum)
    .map((objs) => ({
      ...objs,
      percent: (100 * objs.total) / total,
    }))
    .value();

  return percent;
}

// Prepare chart configuration data
export function chart_Data(transaction, custom) {
  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg); // Ensure unique colors for the chart

  let dataValue = getSum(transaction, "type"); // Get sum by type

  const config = {
    data: {
      datasets: [
        {
          data: dataValue.map((item) => item.total), // Data values for chart
          backgroundColor: bg, // Background colors
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115, // Adjust cutout size for chart
    },
  };

  return custom ?? config; // Return custom config if provided
}

// Calculate total sum of amounts
export function getTotal(transaction) {
  return _.sum(getSum(transaction, "type").map((obj) => obj.total)); // Total sum of all types
}
