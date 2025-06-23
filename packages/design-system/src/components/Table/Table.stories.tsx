import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import { TableColumn, SortConfig, TableProps } from './Table.types';
import { 
  BankData, 
  mockPaginationData, 
  smallMockData, 
  largeMockData, 
  samplePaginationData,
  paginationTestConfigs 
} from '../../utils/mockPaginationData';

// Sample data based on the bank table in the image (keeping original for backwards compatibility)

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
    sortable: true,
  },
  {
    key: 'bankName',
    header: 'Bank Name',
    accessor: 'bankName',
    width: '200px',
    sortable: true,
  },
  {
    key: 'trafficPercentage',
    header: '% Traffic',
    accessor: 'trafficPercentage',
    align: 'right',
    width: '200px',
    sortable: true,
    sortFn: (a, b) => {
      const aValue = parseFloat(a.trafficPercentage);
      const bValue = parseFloat(b.trafficPercentage);
      return aValue - bValue;
    },
  },
  {
    key: 'successOrders',
    header: 'Success orders',
    accessor: 'successOrders',
    align: 'right',
    width: '200px',
    sortable: true,
  },
  {
    key: 'amountApproved',
    header: 'Amount approved ($)',
    accessor: 'amountApproved',
    align: 'right',
    width: '200px',
    sortable: true,
    sortFn: (a, b) => {
      const aValue = parseFloat(a.amountApproved.replace(/[^0-9.-]+/g, ''));
      const bValue = parseFloat(b.amountApproved.replace(/[^0-9.-]+/g, ''));
      return aValue - bValue;
    },
  },
  {
    key: 'chargebackRate',
    header: 'Chargeback rate',
    accessor: 'chargebackRate',
    align: 'right',
    width: '200px',
    sortable: true,
    sortFn: (a, b) => {
      const aValue = parseFloat(a.chargebackRate);
      const bValue = parseFloat(b.chargebackRate);
      return aValue - bValue;
    },
  },
  {
    key: 'GroupLimit',
    header: 'Group Limit',
    accessor: 'GroupLimit',
    align: 'right',
    width: '200px',
    sortable: true,
  },
];

const meta = {
  title: 'Components/Table',
  component: Table<BankData>,
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
    fixedLeftmost: {
      control: { type: 'boolean' },
      description: 'Fix the leftmost column',
    },
    fixedRightmost: {
      control: { type: 'boolean' },
      description: 'Fix the rightmost column',
    },
  },
} satisfies Meta<typeof Table<BankData>>;

export default meta;
type Story = StoryObj<typeof meta>;

const TableWithSorting = (args: TableProps<BankData>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>(args.sortConfig);
  const [data, setData] = useState(args.data);

  const handleSort = (newSortConfig: SortConfig) => {
    setSortConfig(newSortConfig);
    
    const column = bankColumns.find(col => col.key === newSortConfig.columnKey);
    if (!column) return;

    const sortedData = [...data].sort((a, b) => {
      if (column.sortFn) {
        return newSortConfig.direction === 'asc' 
          ? column.sortFn(a, b) 
          : column.sortFn(b, a);
      }
      
      const aValue = a[column.accessor];
      const bValue = b[column.accessor];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return newSortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return newSortConfig.direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    setData(newSortConfig.direction === 'none' ? args.data : sortedData);
  };

  return (
    <Table 
      {...args} 
      data={data}
      sortConfig={sortConfig}
      onSort={handleSort}
    />
  );
};

export const Default: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: false,
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const WithFixedLeftmostColumn: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: false,
    fixedLeftmost: true,
  },
  render: (args) => <TableWithSorting {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with the leftmost column (MID name) fixed while the rest of the content scrolls horizontally.',
      },
    },
  },
};

export const WithFixedRightmostColumn: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: false,
    fixedRightmost: true,
  },
  render: (args) => <TableWithSorting {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with the rightmost column (Group Limit) fixed while the rest of the content scrolls horizontally.',
      },
    },
  },
};

export const WithBothEdgesFixed: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: false,
    fixedLeftmost: true,
    fixedRightmost: true,
  },
  render: (args) => <TableWithSorting {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with both leftmost (MID name) and rightmost (Group Limit) columns fixed while the middle content scrolls horizontally.',
      },
    },
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
    sortable: false,
    isRowSelection: true,
    fixedLeftmost: true,
    onRowSelect: (selectedRows: any[]) => {
      console.log('Selected rows:', selectedRows);
    },
  },
  render: (args) => <TableWithSorting {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with row selection and leftmost column fixed. The selection checkbox column is automatically fixed with the leftmost column.',
      },
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
    sortable: false,
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const Bordered: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'bordered',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: false,
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const SmallSize: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'small',
    hoverable: true,
    showHeader: true,
    sortable: false,
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const LargeSize: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'large',
    hoverable: true,
    showHeader: true,
    sortable: false,
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const NoHeader: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'medium',
    hoverable: true,
    showHeader: false,
    sortable: false,
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const WithClickableRows: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'default',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: false,
    onRowClick: (row: BankData, index: number) => {
      alert(`Clicked on row ${index + 1}: ${row.bankName}`);
    },
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const WithSorting: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: true,
    sortConfig: {
      columnKey: 'successOrders',
      direction: 'desc',
    },
  },
  render: (args) => <TableWithSorting {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with sorting enabled. Click on column headers to sort. Each click cycles through ascending, descending, and no sort. Custom sort functions are implemented for percentage and currency columns.',
      },
    },
  },
};

export const WithSortingAndFixedColumns: Story = {
  args: {
    columns: bankColumns,
    data: sampleBankData,
    variant: 'striped',
    size: 'medium',
    hoverable: true,
    showHeader: true,
    sortable: true,
    fixedLeftmost: true,
    fixedRightmost: true,
  },
  render: (args) => <TableWithSorting {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with both sorting and fixed columns. The leftmost and rightmost columns stay fixed while allowing sorting on all columns.',
      },
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
    sortable: false,
    isRowSelection: true,
    selectedRows: [],
    onRowSelect: (selectedIndexes: number[]) => {
      console.log('Selected rows:', selectedIndexes);
    },
  },
  render: (args) => <TableWithSorting {...args} />,
};

export const WithPagination: Story = {
  render: (args) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | undefined>(args.sortConfig);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(args.data);

    const pageSize = 10; // Items per page
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    // Calculate the data for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    const handleSort = (newSortConfig: SortConfig) => {
      setSortConfig(newSortConfig);
      
      const column = bankColumns.find(col => col.key === newSortConfig.columnKey);
      if (!column) return;

      const sortedData = [...data].sort((a, b) => {
        if (column.sortFn) {
          return newSortConfig.direction === 'asc' 
            ? column.sortFn(a, b) 
            : column.sortFn(b, a);
        }
        
        const aValue = a[column.accessor];
        const bValue = b[column.accessor];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return newSortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          if (aNum < bNum) return newSortConfig.direction === 'asc' ? -1 : 1;
          if (aNum > bNum) return newSortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        }
        
        return newSortConfig.direction === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

      setData(sortedData);
      setCurrentPage(1); // Reset to first page when sorting
    };

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const paginationConfig = {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
      showFirstLast: true,
      showPrevNext: true,
      maxVisiblePages: 5
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Table with Pagination (87 items)</h3>
        <p style={{ marginBottom: '16px', color: '#6B7280' }}>
          Table with pagination controls showing {pageSize} items per page from a dataset of {totalItems} entries.
          Test navigation between pages, sorting, and different page sizes.
        </p>
        <Table
          {...args}
          data={currentPageData}
          sortConfig={sortConfig}
          onSort={handleSort}
          pagination={paginationConfig}
          onPageChange={handlePageChange}
        />
      </div>
    );
  },
  args: {
    columns: bankColumns,
    data: mockPaginationData, // Using the larger mock dataset
    variant: 'default',
    size: 'medium',
    sortable: true,
    hoverable: true,
    showHeader: true,
    fixedLeftmost: false,
    fixedRightmost: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the table with pagination functionality using a larger dataset (87 items). The pagination shows information about the current page and provides navigation controls including First, Previous, page numbers, Next, and Last buttons.',
      },
    },
  },
};

// New story for small dataset pagination
export const PaginationSmallDataset: Story = {
  render: (args) => {
    const { data: testData, description } = paginationTestConfigs.small;
    const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(testData);

    const pageSize = 10; // Standardized to 10 items per page
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    const handleSort = (newSortConfig: SortConfig) => {
      setSortConfig(newSortConfig);
      
      const column = bankColumns.find(col => col.key === newSortConfig.columnKey);
      if (!column) return;

      const sortedData = [...data].sort((a, b) => {
        if (column.sortFn) {
          return newSortConfig.direction === 'asc' 
            ? column.sortFn(a, b) 
            : column.sortFn(b, a);
        }
        
        const aValue = a[column.accessor];
        const bValue = b[column.accessor];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return newSortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          if (aNum < bNum) return newSortConfig.direction === 'asc' ? -1 : 1;
          if (aNum > bNum) return newSortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        }
        
        return newSortConfig.direction === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

      setData(sortedData);
      setCurrentPage(1);
    };

    const paginationConfig = {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
      showFirstLast: true,
      showPrevNext: true,
      maxVisiblePages: 5
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Small Dataset Pagination</h3>
        <p style={{ marginBottom: '16px', color: '#6B7280' }}>
          {description} - Shows {pageSize} items per page.
        </p>
        <Table
          {...args}
          data={currentPageData}
          sortConfig={sortConfig}
          onSort={handleSort}
          pagination={paginationConfig}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    );
  },
  args: {
    columns: bankColumns,
    data: smallMockData,
    variant: 'default',
    size: 'medium',
    sortable: true,
    hoverable: true,
    showHeader: true,
  },
};

// New story for large dataset pagination
export const PaginationLargeDataset: Story = {
  render: (args) => {
    const { data: testData, description } = paginationTestConfigs.large;
    const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(testData);

    const pageSize = 10; // Standardized to 10 items per page
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    const handleSort = (newSortConfig: SortConfig) => {
      setSortConfig(newSortConfig);
      
      const column = bankColumns.find(col => col.key === newSortConfig.columnKey);
      if (!column) return;

      const sortedData = [...data].sort((a, b) => {
        if (column.sortFn) {
          return newSortConfig.direction === 'asc' 
            ? column.sortFn(a, b) 
            : column.sortFn(b, a);
        }
        
        const aValue = a[column.accessor];
        const bValue = b[column.accessor];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return newSortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          if (aNum < bNum) return newSortConfig.direction === 'asc' ? -1 : 1;
          if (aNum > bNum) return newSortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        }
        
        return newSortConfig.direction === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

      setData(sortedData);
      setCurrentPage(1);
    };

    const paginationConfig = {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
      showFirstLast: true,
      showPrevNext: true,
      maxVisiblePages: 7
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Large Dataset Pagination</h3>
        <p style={{ marginBottom: '16px', color: '#6B7280' }}>
          {description} - Shows {pageSize} items per page across {totalPages} pages.
        </p>
        <Table
          {...args}
          data={currentPageData}
          sortConfig={sortConfig}
          onSort={handleSort}
          pagination={paginationConfig}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    );
  },
  args: {
    columns: bankColumns,
    data: largeMockData,
    variant: 'striped',
    size: 'medium',
    sortable: true,
    hoverable: true,
    showHeader: true,
  },
};

// New story for custom cell renderers
export const CustomCellRenderers: Story = {
  render: (args) => {
    const [data, setData] = useState(mockPaginationData.slice(0, 10)); // Use first 10 items

    // Custom columns with various cell renderers
    const customColumns: TableColumn<BankData>[] = [
      {
        key: 'midName',
        header: 'MID Name',
        accessor: 'midName',
        width: '180px',
        render: (value, row, rowIndex) => (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: rowIndex % 2 === 0 ? '#10B981' : '#F59E0B'
            }} />
            <span style={{ fontWeight: 600, color: '#374151' }}>
              {value}
            </span>
          </div>
        ),
      },
      {
        key: 'bankName',
        header: 'Bank Name',
        accessor: 'bankName',
        width: '200px',
        render: (value, row) => (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2px' 
          }}>
            <span style={{ fontWeight: 500, color: '#111827' }}>
              {value}
            </span>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>
              Group: {row.GroupLimit}
            </span>
          </div>
        ),
      },
      {
        key: 'trafficPercentage',
        header: '% Traffic',
        accessor: 'trafficPercentage',
        align: 'center',
        width: '120px',
        render: (value) => {
          const percentage = parseFloat(value);
          const color = percentage >= 10 ? '#10B981' : percentage >= 5 ? '#F59E0B' : '#EF4444';
          return (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '12px',
              backgroundColor: `${color}15`,
              border: `1px solid ${color}30`,
              fontSize: '12px',
              fontWeight: 600,
              color: color
            }}>
              {value}
            </div>
          );
        },
      },
      {
        key: 'successOrders',
        header: 'Success Orders',
        accessor: 'successOrders',
        align: 'right',
        width: '140px',
        render: (value) => (
          <span style={{ 
            fontFamily: 'monospace', 
            fontWeight: 600,
            color: '#374151'
          }}>
            {value.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'amountApproved',
        header: 'Amount Approved',
        accessor: 'amountApproved',
        align: 'right',
        width: '150px',
        render: (value) => (
          <div style={{ textAlign: 'right' }}>
            <span style={{ 
              fontWeight: 600, 
              color: '#059669',
              fontSize: '14px'
            }}>
              {value}
            </span>
          </div>
        ),
      },
      {
        key: 'chargebackRate',
        header: 'Chargeback Rate',
        accessor: 'chargebackRate',
        align: 'center',
        width: '140px',
        render: (value) => {
          const rate = parseFloat(value);
          const isLow = rate < 0.3;
          const isMedium = rate >= 0.3 && rate < 0.5;
          
          return (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isLow ? '#10B981' : isMedium ? '#F59E0B' : '#EF4444'
              }} />
              <span style={{ 
                fontWeight: 500,
                color: isLow ? '#059669' : isMedium ? '#D97706' : '#DC2626'
              }}>
                {value}
              </span>
            </div>
          );
        },
      },
      {
        key: 'actions',
        header: 'Actions',
        accessor: 'midName', // Using midName as a unique identifier
        width: '120px',
        align: 'center',
        sortable: false,
        render: (value, row, rowIndex) => (
          <div style={{ 
            display: 'flex', 
            gap: '4px', 
            justifyContent: 'center' 
          }}>
            <button
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => alert(`Edit ${row.midName}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              Edit
            </button>
            <button
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid #FCA5A5',
                borderRadius: '4px',
                backgroundColor: '#FEF2F2',
                color: '#DC2626',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                if (confirm(`Delete ${row.midName}?`)) {
                  setData(prev => prev.filter((_, index) => index !== rowIndex));
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEE2E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FEF2F2';
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Custom Cell Renderers</h3>
        <p style={{ marginBottom: '16px', color: '#6B7280' }}>
          This table demonstrates various custom cell renderers including badges, indicators, 
          formatted text, and interactive buttons. Each column shows different rendering possibilities.
        </p>
        <Table
          {...args}
          columns={customColumns}
          data={data}
          sortable={true}
          hoverable={true}
          showHeader={true}
        />
      </div>
    );
  },
  args: {
    columns: [],
    data: [],
    variant: 'default',
    size: 'medium',
    fixedLeftmost: false,
    fixedRightmost: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the power of custom cell renderers. You can render any React component inside table cells including buttons, badges, indicators, formatted text, and interactive elements. The render function receives the cell value, full row data, and row index.',
      },
    },
  },
};

// New story for toggle/status renderers
export const InteractiveCellRenderers: Story = {
  render: (args) => {
    const [data, setData] = useState(
      mockPaginationData.slice(0, 8).map(item => ({
        ...item,
        status: Math.random() > 0.5 ? 'active' : 'inactive',
        enabled: Math.random() > 0.3
      }))
    );

    const interactiveColumns: TableColumn<typeof data[0]>[] = [
      {
        key: 'midName',
        header: 'MID Name',
        accessor: 'midName',
        width: '180px',
      },
      {
        key: 'bankName',
        header: 'Bank Name',
        accessor: 'bankName',
        width: '180px',
      },
      {
        key: 'status',
        header: 'Status',
        accessor: 'status',
        align: 'center',
        width: '120px',
        render: (value, row, rowIndex) => (
          <button
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: value === 'active' ? '#10B981' : '#6B7280',
              color: 'white',
              transition: 'all 0.2s'
            }}
            onClick={() => {
              setData(prev => prev.map((item, index) => 
                index === rowIndex 
                  ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
                  : item
              ));
            }}
          >
            {value === 'active' ? 'Active' : 'Inactive'}
          </button>
        ),
      },
      {
        key: 'enabled',
        header: 'Enabled',
        accessor: 'enabled',
        align: 'center',
        width: '100px',
        render: (value, row, rowIndex) => (
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => {
                setData(prev => prev.map((item, index) => 
                  index === rowIndex 
                    ? { ...item, enabled: e.target.checked }
                    : item
                ));
              }}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
          </label>
        ),
      },
      {
        key: 'trafficPercentage',
        header: 'Traffic %',
        accessor: 'trafficPercentage',
        align: 'center',
        width: '140px',
        render: (value) => {
          const percentage = parseFloat(value);
          return (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '6px',
                backgroundColor: '#E5E7EB',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(percentage * 5, 100)}%`,
                  height: '100%',
                  backgroundColor: percentage >= 10 ? '#10B981' : percentage >= 5 ? '#F59E0B' : '#EF4444',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500 }}>
                {value}
              </span>
            </div>
          );
        },
      },
      {
        key: 'actions',
        header: 'Quick Actions',
        accessor: 'midName',
        width: '180px',
        align: 'center',
        sortable: false,
        render: (value, row, rowIndex) => (
          <div style={{ 
            display: 'flex', 
            gap: '4px', 
            justifyContent: 'center' 
          }}>
            <button
              style={{
                padding: '4px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => alert(`View details for ${row.midName}`)}
              title="View Details"
            >
              👁️
            </button>
            <button
              style={{
                padding: '4px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => alert(`Configure ${row.midName}`)}
              title="Configure"
            >
              ⚙️
            </button>
            <button
              style={{
                padding: '4px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => alert(`Download report for ${row.midName}`)}
              title="Download"
            >
              📥
            </button>
          </div>
        ),
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Interactive Cell Renderers</h3>
        <p style={{ marginBottom: '16px', color: '#6B7280' }}>
          This table shows interactive elements like toggles, checkboxes, progress bars, and action buttons. 
          Try clicking the status buttons, checkboxes, and action icons to see the interactivity.
        </p>
        <Table
          {...args}
          columns={interactiveColumns}
          data={data}
          sortable={true}
          hoverable={true}
          showHeader={true}
        />
      </div>
    );
  },
  args: {
    columns: [],
    data: [],
    variant: 'default',
    size: 'medium',
    fixedLeftmost: false,
    fixedRightmost: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates interactive cell renderers including clickable status buttons, checkboxes, progress bars, and action buttons. All interactions update the table data in real-time, showing how custom renderers can create fully interactive table experiences.',
      },
    },
  },
}; 