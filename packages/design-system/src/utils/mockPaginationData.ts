// Mock data for testing pagination functionality
// This provides a larger dataset to properly test pagination controls

export interface BankData {
  midName: string;
  bankName: string;
  trafficPercentage: string;
  successOrders: number;
  amountApproved: string;
  chargebackRate: string;   
  GroupLimit: string;
}

// Array of bank names for variety
const bankNames = [
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'State Bank of India',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
  'Central Bank of India',
  'Bank of India',
  'Indian Overseas Bank',
  'UCO Bank',
  'Bank of Maharashtra',
  'Federal Bank',
  'South Indian Bank',
  'Karnataka Bank',
  'Karur Vysya Bank',
  'Tamilnad Mercantile Bank',
  'City Union Bank',
  'Dhanlaxmi Bank',
  'Nainital Bank',
  'Catholic Syrian Bank',
  'Lakshmi Vilas Bank'
];

// Helper function to generate random values
const generateRandomData = (index: number): BankData => {
  const bankIndex = index % bankNames.length;
  const midSuffix = String.fromCharCode(65 + (index % 26)); // A-Z
  const midNumber = Math.floor(index / 26) + 1;
  
  return {
    midName: `MID_${midSuffix}${midNumber.toString().padStart(2, '0')}`,
    bankName: bankNames[bankIndex],
    trafficPercentage: `${(Math.random() * 20 + 1).toFixed(1)}%`,
    successOrders: Math.floor(Math.random() * 2000) + 500,
    amountApproved: `$${(Math.random() * 1000000 + 100000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    chargebackRate: `${(Math.random() * 0.8 + 0.1).toFixed(2)}%`,
    GroupLimit: Math.random() > 0.5 ? '1000' : '2000',
  };
};

// Generate a large dataset for pagination testing (87 entries)
export const mockPaginationData: BankData[] = Array.from({ length: 87 }, (_, index) => 
  generateRandomData(index)
);

// Smaller dataset for basic testing (22 entries to match the original design)
export const smallMockData: BankData[] = Array.from({ length: 22 }, (_, index) => 
  generateRandomData(index)
);

// Large dataset for stress testing (250 entries)
export const largeMockData: BankData[] = Array.from({ length: 250 }, (_, index) => 
  generateRandomData(index)
);

// Predefined sample data with realistic values
export const samplePaginationData: BankData[] = [
  {
    midName: 'MID_Alpha_01',
    bankName: 'HDFC Bank',
    trafficPercentage: '12.8%',
    successOrders: 1254,
    amountApproved: '$894,320',
    chargebackRate: '0.32%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Bravo_02',
    bankName: 'ICICI Bank',
    trafficPercentage: '9.5%',
    successOrders: 987,
    amountApproved: '$641,000',
    chargebackRate: '0.18%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Charlie_03',
    bankName: 'Axis Bank',
    trafficPercentage: '7.3%',
    successOrders: 765,
    amountApproved: '$432,780',
    chargebackRate: '0.44%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Delta_04',
    bankName: 'State Bank of India',
    trafficPercentage: '14.1%',
    successOrders: 1487,
    amountApproved: '$980,100',
    chargebackRate: '0.51%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Echo_05',
    bankName: 'Kotak Mahindra Bank',
    trafficPercentage: '6.4%',
    successOrders: 654,
    amountApproved: '$375,210',
    chargebackRate: '0.23%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Foxtrot_06',
    bankName: 'Punjab National Bank',
    trafficPercentage: '11.2%',
    successOrders: 1123,
    amountApproved: '$756,890',
    chargebackRate: '0.39%',
    GroupLimit: '2000',
  },
  {
    midName: 'MID_Golf_07',
    bankName: 'Bank of Baroda',
    trafficPercentage: '8.7%',
    successOrders: 892,
    amountApproved: '$523,450',
    chargebackRate: '0.28%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Hotel_08',
    bankName: 'Canara Bank',
    trafficPercentage: '13.5%',
    successOrders: 1345,
    amountApproved: '$867,230',
    chargebackRate: '0.41%',
    GroupLimit: '2000',
  },
  {
    midName: 'MID_India_09',
    bankName: 'Union Bank of India',
    trafficPercentage: '5.9%',
    successOrders: 567,
    amountApproved: '$289,670',
    chargebackRate: '0.19%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Juliet_10',
    bankName: 'Indian Bank',
    trafficPercentage: '10.3%',
    successOrders: 1034,
    amountApproved: '$678,950',
    chargebackRate: '0.35%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Kilo_11',
    bankName: 'Federal Bank',
    trafficPercentage: '15.7%',
    successOrders: 1567,
    amountApproved: '$1,234,560',
    chargebackRate: '0.47%',
    GroupLimit: '2000',
  },
  {
    midName: 'MID_Lima_12',
    bankName: 'South Indian Bank',
    trafficPercentage: '4.2%',
    successOrders: 421,
    amountApproved: '$198,760',
    chargebackRate: '0.16%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Mike_13',
    bankName: 'Karnataka Bank',
    trafficPercentage: '9.8%',
    successOrders: 978,
    amountApproved: '$612,340',
    chargebackRate: '0.33%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_November_14',
    bankName: 'Karur Vysya Bank',
    trafficPercentage: '7.6%',
    successOrders: 756,
    amountApproved: '$445,680',
    chargebackRate: '0.25%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Oscar_15',
    bankName: 'Central Bank of India',
    trafficPercentage: '12.1%',
    successOrders: 1210,
    amountApproved: '$823,450',
    chargebackRate: '0.38%',
    GroupLimit: '2000',
  }
];

// Export different dataset configurations for testing
export const paginationTestConfigs = {
  small: {
    data: smallMockData,
    defaultPageSize: 5,
    description: 'Small dataset (22 items) for basic pagination testing'
  },
  medium: {
    data: mockPaginationData,
    defaultPageSize: 10,
    description: 'Medium dataset (87 items) for comprehensive pagination testing'
  },
  large: {
    data: largeMockData,
    defaultPageSize: 25,
    description: 'Large dataset (250 items) for stress testing pagination performance'
  },
  realistic: {
    data: samplePaginationData,
    defaultPageSize: 7,
    description: 'Curated realistic data for demo purposes'
  }
}; 