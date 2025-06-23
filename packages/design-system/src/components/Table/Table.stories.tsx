import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import { TableColumn } from './Table.types';

// Sample data based on the bank table in the image
interface BankData {
  midName: string;
  bankName: string;
  trafficPercentage: string;
  successOrders: number;
  amountApproved: string;
  chargebackRate: string;   
  GroupLimit: string;
}

const sampleBankData: BankData[] = [
  {
    midName: 'MID_Alpha',
    bankName: 'HDFC Bank',
    trafficPercentage: '12.8%',
    successOrders: 1254,
    amountApproved: '$894,320',
    chargebackRate: '0.32%',
    GroupLimit: '1000',
  },    
  {
    midName: 'MID_Bravo',
    bankName: 'ICICI Bank',
    trafficPercentage: '9.5%',
    successOrders: 987,
    amountApproved: '$641,000',
    chargebackRate: '0.18%',  
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Charlie',
    bankName: 'Axis Bank',
    trafficPercentage: '7.3%',
    successOrders: 765,
    amountApproved: '$432,780',
    chargebackRate: '0.44%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Delta',
    bankName: 'SBI',
    trafficPercentage: '14.1%',
    successOrders: 1487,
    amountApproved: '$980,100',
    chargebackRate: '0.51%',
    GroupLimit: '1000',
  },
  {
    midName: 'MID_Echo',
    bankName: 'Kotak Mahindra',
    trafficPercentage: '6.4%',
    successOrders: 654,
    amountApproved: '$375,210',
    chargebackRate: '0.23%',
    GroupLimit: '1000',
  },
];

const bankColumns: TableColumn<BankData>[] = [
  {
    key: 'midName',
    header: 'MID name',
    accessor: 'midName',
    width: '200px',
  },
  {
    key: 'bankName',
    header: 'Bank Name',
    accessor: 'bankName',
    width: '200px',
  },
  {
    key: 'trafficPercentage',
    header: '% Traffic',
    accessor: 'trafficPercentage',
    align: 'right',
    width: '200px',
  },
  {
    key: 'successOrders',
    header: 'Success orders',
    accessor: 'successOrders',
    align: 'right',
    width: '200px',
  },
  {
    key: 'amountApproved',
    header: 'Amount approved ($)',
    accessor: 'amountApproved',
    align: 'right',
    width: '200px',
  },
  {
    key: 'chargebackRate',
    header: 'Chargeback rate',
    accessor: 'chargebackRate',
    align: 'right',
    width: '200px',
  },
  {
    key: 'GroupLimit',
    header: 'Group Limit',
    accessor: 'GroupLimit',
    align: 'right',
    width: '200px',
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    hoverable: {
      control: { type: 'boolean' },
    },
    showHeader: {
      control: { type: 'boolean' },
    },
    sortable: {
      control: { type: 'boolean' },
    },
    fixedColumn: {
      control: { type: 'select' },
      options: ['none', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
  },
};

export const WithLeftFixedColumn: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    fixedColumn: 'left',
  },
};

export const WithRightFixedColumn: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    fixedColumn: 'right',
  },
};

export const WithFixedColumnAndSelection: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    isRowSelection: true,
    fixedColumn: 'left',
    onRowSelect: (selectedIndexes: number[]) => {
      console.log('Selected rows:', selectedIndexes);
    },
  },
};

export const Striped: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'bordered',
    size: 'medium',
    hoverable: true,
    showHeader: true,
  },
};

export const SmallSize: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'small',
    hoverable: true,
    showHeader: true,
  },
};

export const LargeSize: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'large',
    hoverable: true,
    showHeader: true,
  },
};

export const NoHeader: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'medium',
    hoverable: true,
    showHeader: false,
  },
};

export const WithClickableRows: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    onRowClick: (row: BankData, index: number) => {
      alert(`Clicked on row ${index + 1}: ${row.bankName}`);
    },
  },
};

export const WithSorting: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: true,
    onSort: (column: TableColumn<BankData>, direction: 'asc' | 'desc') => {
      alert(`Sort ${column.header} in ${direction} order`);
    },
  },
};

export const WithRowSelection: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    isRowSelection: true,
    selectedRows: [],
    onRowSelect: (selectedIndexes: number[]) => {
      console.log('Selected rows:', selectedIndexes);
    },
  },
}; 