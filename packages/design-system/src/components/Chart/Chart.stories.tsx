import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';
import { ChartDataPoint } from './Chart.types';

const generateTimeData = (days: number = 30) => {
  const categories = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    categories.push(`${date.getDate()}${i === 0 ? ' Jun' : ''}`);
  }
  
  return categories;
};

const generateMerchantData = (categories: string[]): ChartDataPoint[] => [
  {
    name: 'Merchant 1',
    data: categories.map(() => Math.floor(Math.random() * 40) + 30),
    color: '#3b82f6',
    // Remove type - let variant prop control chart type
  },
  {
    name: 'Merchant 2',
    data: categories.map(() => Math.floor(Math.random() * 35) + 25),
    color: '#ef4444',
    // Remove type - let variant prop control chart type
  },
  {
    name: 'Merchant 3',
    data: categories.map(() => Math.floor(Math.random() * 45) + 20),
    color: '#f59e0b',
    // Remove type - let variant prop control chart type
  },
  {
    name: 'Merchant 4',
    data: categories.map(() => Math.floor(Math.random() * 30) + 35),
    color: '#10b981',
    // Remove type - let variant prop control chart type
  },
  {
    name: 'Merchant 5',
    data: categories.map(() => Math.floor(Math.random() * 25) + 40),
    color: '#8b5cf6',
    // Remove type - let variant prop control chart type
  },
];

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive chart component with legend toggling, line fading, and granular axis controls. Built with Apache ECharts for high performance and professional appearance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
    },
    animation: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: generateMerchantData(generateTimeData(25)),
    categories: generateTimeData(25),
    title: 'Chart 1',
    height: 420,
    legend: {
      show: true,
      position: 'bottom',
      selectedMode: 'multiple',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    yAxis: {
      type: 'value',
      scale: true,
      splitLine: {
        show: true,
      },
      axisLabel: {
        formatter: '${value}',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        interval: 'auto',
        rotate: 0,
      },
    },
    grid: {
      left: '5%',
      right: '3%',
      bottom: '18%',
      top: '8%',
      containLabel: true,
    },
  },
};

// Bar Chart Variant
export const BarChartVariant: Story = {
  args: {
    data: [
      {
        name: 'Revenue',
        data: [45000, 52000, 48000, 61000, 55000, 67000],
        color: '#3b82f6',
        // Remove type - let variant prop control chart type
      },
      {
        name: 'Expenses',
        data: [32000, 38000, 35000, 45000, 41000, 48000],
        color: '#ef4444',
        // Remove type - let variant prop control chart type
      },
    ],
    categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
    variant: "bar",
    title: "Revenue vs Expenses - Bar Chart",
    height: 400,
  },
};

// Horizontal Bar Chart
export const HorizontalBarChart: Story = {
  args: {
    data: [
      {
        name: 'Revenue',
        data: [45000, 52000, 48000, 61000, 55000, 67000],
        color: '#3b82f6',
      },
      {
        name: 'Expenses',
        data: [32000, 38000, 35000, 45000, 41000, 48000],
        color: '#ef4444',
      },
    ],
    categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
    variant: "bar",
    orientation: "horizontal",
    title: "Revenue vs Expenses - Horizontal Bar Chart",
    height: 400,
  },
};

// Pie Chart
export const PieChart: Story = {
  args: {
    data: [
      { name: 'Direct', value: 320, color: '#3b82f6' },
      { name: 'Email', value: 240, color: '#ef4444' },
      { name: 'Union Ads', value: 149, color: '#f59e0b' },
      { name: 'Video Ads', value: 100, color: '#10b981' },
    ],
    categories: [],
    variant: "pie",
    title: "Traffic Sources",
    height: 400,
    legend: {
      show: true,
      position: 'right',
    },
  },
};

// Map Chart - Region wise payments (matches your design)
export const RegionWisePayments: Story = {
  render: () => {
    const regionData = [
      { name: 'South Africa', value: 95 },
      { name: 'China', value: 5 },
      { name: 'India', value: 5 },
      // Other countries with lower values to create the gradient effect
      { name: 'United States', value: 2 },
      { name: 'Brazil', value: 3 },
      { name: 'Australia', value: 1 },
      { name: 'Russia', value: 2 },
      { name: 'Canada', value: 1 },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {/* Legend on the left like in your design */}
          <div style={{ minWidth: '200px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '24px', fontWeight: '600' }}>
              Region wise payments
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: '#4338ca', 
                  borderRadius: '50%' 
                }}></div>
                <span style={{ fontSize: '18px', color: '#374151' }}>South Africa</span>
                <span style={{ fontSize: '18px', fontWeight: '600', marginLeft: 'auto' }}>95%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: '#6366f1', 
                  borderRadius: '50%' 
                }}></div>
                <span style={{ fontSize: '18px', color: '#374151' }}>Asia</span>
                <span style={{ fontSize: '18px', fontWeight: '600', marginLeft: 'auto' }}>05%</span>
              </div>
            </div>
          </div>
          
          {/* Map on the right */}
          <div style={{ flex: 1 }}>
            <Chart
              data={regionData}
              categories={[]}
              variant="map"
              mapName="world"
              height={400}
              roam={true}
              emphasis={{
                focus: 'self',
                itemStyle: {
                  areaColor: '#312e81',
                  borderColor: '#1e1b4b',
                  borderWidth: 2,
                },
              }}
              legend={{
                show: false,
              }}
              customOption={{
                backgroundColor: '#ffffff',
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Simple Map Chart
export const MapChart: Story = {
  args: {
    data: [
      { name: 'South Africa', value: 95 },
      { name: 'China', value: 5 },
      { name: 'India', value: 3 },
      { name: 'United States', value: 8 },
      { name: 'Brazil', value: 12 },
      { name: 'Australia', value: 7 },
      { name: 'Russia', value: 4 },
      { name: 'Canada', value: 6 },
    ],
    categories: [],
    variant: "map",
    mapName: "world",
    title: "Global Data Distribution",
    height: 500,
    roam: true,
    emphasis: {
      focus: 'self',
      itemStyle: {
        areaColor: '#4338ca',
        borderColor: '#3730a3',
        borderWidth: 2,
      },
    },
    legend: {
      show: false,
    },
  },
};

// Skeleton Loading States
export const SkeletonLoading: Story = {
  args: {
    data: generateMerchantData(generateTimeData(25)),
    categories: generateTimeData(25),
    title: 'Chart Loading State',
    subtitle: 'This is a subtitle',
    height: 420,
    loading: true,
    legend: {
      show: true,
      position: 'bottom',
      selectedMode: 'multiple',
    },
  },
};

export const SkeletonBarChart: Story = {
  args: {
    data: [
      {
        name: 'Revenue',
        data: [45000, 52000, 48000, 61000, 55000, 67000],
        color: '#3b82f6',
      },
      {
        name: 'Expenses',
        data: [32000, 38000, 35000, 45000, 41000, 48000],
        color: '#ef4444',
      },
    ],
    categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
    variant: "bar",
    title: "Bar Chart Loading State",
    height: 400,
    loading: true,
  },
};

export const SkeletonPieChart: Story = {
  args: {
    data: [
      { name: 'Direct', value: 320, color: '#3b82f6' },
      { name: 'Email', value: 240, color: '#ef4444' },
      { name: 'Union Ads', value: 149, color: '#f59e0b' },
      { name: 'Video Ads', value: 100, color: '#10b981' },
    ],
    categories: [],
    variant: "pie",
    title: "Pie Chart Loading State",
    height: 400,
    loading: true,
    legend: {
      show: true,
      position: 'bottom',
    },
  },
};

export const SkeletonMapChart: Story = {
  args: {
    data: [
      { name: 'South Africa', value: 95 },
      { name: 'China', value: 5 },
      { name: 'India', value: 3 },
    ],
    categories: [],
    variant: "map",
    mapName: "world",
    title: "Map Chart Loading State",
    height: 500,
    loading: true,
    legend: {
      show: false,
    },
  },
};

export const SkeletonWithCustomContent: Story = {
  args: {
    data: generateMerchantData(generateTimeData(10)),
    categories: generateTimeData(10),
    title: 'Custom Skeleton Content',
    height: 300,
    loading: true,
    skeletonContent: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Loading custom chart content...
      </div>
    ),
  },
};
