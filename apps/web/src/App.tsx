import React from 'react';
import { Button } from '@paysecure-design/design-system/Button';
import { Typography } from '@paysecure-design/design-system/Typography';
import { Table } from '@paysecure-design/design-system/Table';

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'DM Sans, sans-serif' }}>
      <Typography variant="h1" style={{ marginBottom: '8px', color: '#1f2937' }}>
        Paysecure Design System
      </Typography>
      <Typography variant="subtitle1" style={{ marginBottom: '32px', color: '#6b7280' }}>
        Chart Component Demo (Available in Storybook)
      </Typography>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          padding: '40px', 
          border: '2px dashed #e5e7eb', 
          borderRadius: '12px',
          backgroundColor: '#f9fafb',
          marginBottom: '24px'
        }}>
          <Typography variant="h3" style={{ marginBottom: '16px', color: '#374151' }}>
            📊 Interactive Chart Component
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '24px', color: '#6b7280' }}>
            A powerful chart component with legend toggling, line fading, and granular axis controls.<br/>
            Built with Apache ECharts for high performance and professional appearance.
          </Typography>
          
          <div style={{ display: 'grid', gap: '12px', textAlign: 'left', maxWidth: '500px', margin: '0 auto 24px' }}>
            <Typography variant="body2" style={{ color: '#059669' }}>
              ✅ <strong>Interactive Legends</strong> - Click to show/hide lines
            </Typography>
            <Typography variant="body2" style={{ color: '#059669' }}>
              ✅ <strong>Line Fading</strong> - Deselected lines become inactive
            </Typography>
            <Typography variant="body2" style={{ color: '#059669' }}>
              ✅ <strong>Zoom & Pan</strong> - Mouse wheel and drag controls
            </Typography>
            <Typography variant="body2" style={{ color: '#059669' }}>
              ✅ <strong>Granular Axis Control</strong> - Adjust scales and intervals
            </Typography>
            <Typography variant="body2" style={{ color: '#059669' }}>
              ✅ <strong>High Data Density</strong> - Handles large datasets efficiently
            </Typography>
            <Typography variant="body2" style={{ color: '#059669' }}>
              ✅ <strong>Real-time Updates</strong> - Smooth animations and transitions
            </Typography>
          </div>

          <Button 
            variant="primary" 
            onClick={() => window.open('/storybook', '_blank')}
            style={{ marginRight: '12px' }}
          >
            View in Storybook
          </Button>
          
          <Button 
            variant="tertiary"
            onClick={() => window.open('https://github.com/apache/echarts', '_blank')}
          >
            Learn About ECharts
          </Button>
        </div>

        <div style={{ 
          padding: '24px', 
          backgroundColor: '#f0f9ff', 
          borderRadius: '8px',
          border: '1px solid #3b82f6',
          marginBottom: '32px'
        }}>
          <Typography variant="h6" style={{ marginBottom: '8px', color: '#1e40af' }}>
            📚 Complete Storybook Documentation
          </Typography>
          <Typography variant="body2" style={{ color: '#1e40af' }}>
            The Chart component includes comprehensive Storybook stories covering:<br/>
            • All legend interactions • Zoom controls • High data density • Real-time updates
          </Typography>
        </div>

        {/* New Table with Pagination Skeleton Demo */}
        <div style={{ 
          padding: '24px', 
          backgroundColor: '#f9fafb', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <Typography variant="h6" style={{ marginBottom: '16px', color: '#374151' }}>
            🆕 Table with Pagination Skeleton
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '16px', color: '#6b7280' }}>
            Demonstrating the new showPaginationSkeleton prop - a loading state for pagination controls.
          </Typography>
          
          <Table
            columns={[
              { key: 'name', header: 'Name', accessor: 'name' as any },
              { key: 'value', header: 'Value', accessor: 'value' as any },
            ]}
            data={[
              { name: 'Sample Data 1', value: '100' },
              { name: 'Sample Data 2', value: '200' },
            ]}
            pagination={{
              currentPage: 1,
              totalPages: 5,
              pageSize: 10,
              totalItems: 50,
              showFirstLast: true,
              showPrevNext: true,
              maxVisiblePages: 5,
            }}
            showPaginationSkeleton={true}
            onPageChange={(page) => console.log('Page changed to:', page)}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 