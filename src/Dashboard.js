import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generateRandomData } from './data';
import { calculateSMA, calculateVolatility, calculateRSI } from './utils';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [indicators, setIndicators] = useState({
    price: true,
    sma: true,
    volatility: true,
    rsi: true,
  });
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    const randomData = generateRandomData(100);
    setData(randomData);
  }, []);

  const smaData = calculateSMA(data, 20);
  const volatilityData = calculateVolatility(data, 20);
  const rsiData = calculateRSI(data, 14);

  // Combine data for chart
  const chartData = data.map((item, index) => {
    const sma = smaData.find(s => s.date === item.date)?.sma || null;
    const vol = volatilityData.find(v => v.date === item.date)?.volatility || null;
    const rsi = rsiData.find(r => r.date === item.date)?.rsi || null;
    return {
      date: item.date,
      price: item.price,
      sma,
      volatility: vol,
      rsi,
    };
  });

  const handleIndicatorChange = (indicator) => {
    setIndicators(prev => ({
      ...prev,
      [indicator]: !prev[indicator],
    }));
  };

  const generateNewData = () => {
    const randomData = generateRandomData(100);
    setData(randomData);
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-primary">Advanced Financial Analytics Dashboard</h1>
          <p className="text-center text-muted">Analyze key financial indicators with customizable metrics</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={4} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Customize Metrics</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="Price"
                  checked={indicators.price}
                  onChange={() => handleIndicatorChange('price')}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Moving Average (SMA)"
                  checked={indicators.sma}
                  onChange={() => handleIndicatorChange('sma')}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Volatility"
                  checked={indicators.volatility}
                  onChange={() => handleIndicatorChange('volatility')}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="RSI"
                  checked={indicators.rsi}
                  onChange={() => handleIndicatorChange('rsi')}
                  className="mb-2"
                />
              </Form>
              <hr />
              <Form.Group className="mb-3">
                <Form.Label>Chart Type</Form.Label>
                <Form.Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                </Form.Select>
              </Form.Group>
              <Button variant="secondary" onClick={generateNewData} className="w-100">
                Generate New Data
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8} lg={9}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Financial Indicators Chart</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={500}>
                {chartType === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {indicators.price && <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" strokeWidth={2} />}
                    {indicators.sma && <Line type="monotone" dataKey="sma" stroke="#82ca9d" name="SMA (20)" strokeWidth={2} />}
                    {indicators.volatility && <Line type="monotone" dataKey="volatility" stroke="#ffc658" name="Volatility" strokeWidth={2} />}
                    {indicators.rsi && <Line type="monotone" dataKey="rsi" stroke="#ff7300" name="RSI" yAxisId="rsi" strokeWidth={2} />}
                  </LineChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {indicators.price && <Bar dataKey="price" fill="#8884d8" name="Price" />}
                    {indicators.sma && <Bar dataKey="sma" fill="#82ca9d" name="SMA (20)" />}
                    {indicators.volatility && <Bar dataKey="volatility" fill="#ffc658" name="Volatility" />}
                    {indicators.rsi && <Bar dataKey="rsi" fill="#ff7300" name="RSI" />}
                  </BarChart>
                )}
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="info" className="text-center">
            This dashboard provides a professional layer of data analysis, displaying key financial indicators (Moving Averages, Volatility, RSI) for random data sets with full customization options.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
