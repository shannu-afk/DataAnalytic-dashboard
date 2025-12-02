// Calculate Simple Moving Average
export const calculateSMA = (data, period) => {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.price, 0);
    sma.push({
      date: data[i].date,
      sma: parseFloat((sum / period).toFixed(2)),
    });
  }
  return sma;
};

// Calculate Volatility (Standard Deviation)
export const calculateVolatility = (data, period) => {
  const volatility = [];
  for (let i = period - 1; i < data.length; i++) {
    const prices = data.slice(i - period + 1, i + 1).map(d => d.price);
    const mean = prices.reduce((a, b) => a + b, 0) / period;
    const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    volatility.push({
      date: data[i].date,
      volatility: parseFloat(stdDev.toFixed(2)),
    });
  }
  return volatility;
};

// Calculate RSI (Relative Strength Index)
export const calculateRSI = (data, period = 14) => {
  const rsi = [];
  const gains = [];
  const losses = [];

  for (let i = 1; i < data.length; i++) {
    const change = data[i].price - data[i - 1].price;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }

  for (let i = period - 1; i < gains.length; i++) {
    const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
    const rs = avgGain / avgLoss;
    const rsiValue = 100 - (100 / (1 + rs));
    rsi.push({
      date: data[i + 1].date,
      rsi: parseFloat(rsiValue.toFixed(2)),
    });
  }
  return rsi;
};
