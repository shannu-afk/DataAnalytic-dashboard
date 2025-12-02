// Generate random financial data
export const generateRandomData = (numPoints) => {
  const data = [];
  let price = 100; // Starting price

  for (let i = 0; i < numPoints; i++) {
    // Random price change between -5% and +5%
    const change = (Math.random() - 0.5) * 0.1;
    price = price * (1 + change);
    price = parseFloat(price.toFixed(2));

    const date = new Date();
    date.setDate(date.getDate() - (numPoints - i));

    data.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD format
      price,
    });
  }

  return data;
};
