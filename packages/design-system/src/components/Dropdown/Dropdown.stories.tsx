import React, { useState } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { DropdownProps, DropdownOption } from './Dropdown.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const defaultOptions: DropdownOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' }
];

const defaultConfig = {
  label: 'Merchant',
  placeholder: 'Merchant ID',
  searchable: true
};

const darkModeTokens = {
  base: {
    background: '#2D2D2D',
    borderColor: '#404040',
    borderRadius: '8px',
    textColor: '#FFFFFF',
    fontSize: '14px',
    padding: '12px 16px',
    height: '44px'
  },
  states: {
    hover: {
      borderColor: '#505050'
    },
    focus: {
      borderColor: '#0D6EFD',
      shadow: '0 0 0 2px rgba(13, 110, 253, 0.2)'
    },
    disabled: {
      background: '#1A1A1A',
      textColor: '#666666'
    },
    error: {
      borderColor: '#DC3545',
      textColor: '#DC3545',
      shadow: '0 0 0 2px rgba(220, 53, 69, 0.2)'
    }
  },
  label: {
    color: '#FFFFFF',
    fontSize: '14px',
    margin: '0 0 8px 0'
  },
  placeholder: {
    color: '#A0A0A0'
  },
  icon: {
    color: '#A0A0A0',
    size: '12px'
  },
  menu: {
    background: '#2D2D2D',
    borderColor: '#404040',
    shadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    maxHeight: '200px'
  },
  item: {
    padding: '12px 16px',
    states: {
      hover: {
        background: '#404040'
      },
      selected: {
        background: '#505050'
      }
    }
  },
  chip: {
    background: '#404040',
    textColor: '#FFFFFF',
    borderColor: '#505050',
    margin: '0 4px 4px 0'
  }
};

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable dropdown component with search functionality and token-based styling.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#1A1A1A' }
      ]
    }
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    fullWidth: { control: 'boolean' },
    config: {
      control: 'object',
      defaultValue: {
        label: 'Merchant',
        placeholder: 'Merchant ID',
        searchable: true,
        clearable: false,
        disabled: false,
        loading: false,
        noOptionsMessage: 'No options available',
        loadingMessage: 'Loading...'
      }
    },
    options: {
      control: 'object',
      defaultValue: defaultOptions
    }
  }
} as Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => {
  const [value, setValue] = useState<string | string[]>('');
  return (
    <div style={{ minWidth: '300px' }}>
      <Dropdown
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: defaultConfig,
    options: defaultOptions
  }
};

export const NonSearchable: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: {
      ...defaultConfig,
      searchable: false
    },
    options: defaultOptions
  }
};

export const Loading: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: {
      ...defaultConfig,
      loading: true
    },
    options: defaultOptions
  }
};

export const Disabled: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: {
      ...defaultConfig,
      disabled: true
    },
    options: defaultOptions
  }
};

export const NoOptions: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: defaultConfig,
    options: []
  }
};

export const FullWidth: Story = {
  render: Template,
  args: {
    fullWidth: true,
    config: defaultConfig,
    options: defaultOptions
  }
};

export const CustomTokens: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: defaultConfig,
    options: defaultOptions,
    tokens: {
      base: {
        background: '#F8F9FA',
        borderColor: '#CED4DA',
        borderRadius: '8px',
        textColor: '#212529',
        fontSize: '14px',
        padding: '12px 16px',
        height: '44px'
      },
      states: {
        hover: {
          borderColor: '#ADB5BD'
        },
        focus: {
          borderColor: '#0D6EFD',
          shadow: '0 0 0 2px rgba(13, 110, 253, 0.2)'
        },
        disabled: {
          background: '#E9ECEF',
          textColor: '#6C757D'
        },
        error: {
          borderColor: '#DC3545',
          textColor: '#DC3545',
          shadow: '0 0 0 2px rgba(220, 53, 69, 0.2)'
        }
      },
      label: {
        color: '#212529',
        fontSize: '14px',
        margin: '0 0 8px 0'
      },
      placeholder: {
        color: '#6C757D'
      },
      icon: {
        color: '#6C757D',
        size: '12px'
      },
      menu: {
        background: '#FFFFFF',
        borderColor: '#CED4DA',
        shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxHeight: '200px'
      },
      item: {
        padding: '12px 16px',
        states: {
          hover: {
            background: '#E9ECEF'
          },
          selected: {
            background: '#E2E6EA'
          }
        }
      },
      chip: {
        background: '#E9ECEF',
        textColor: '#212529',
        borderColor: '#CED4DA',
        margin: '0 4px 4px 0'
      }
    }
  }
};

export const Multiselect: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: {
      ...defaultConfig,
      multiselect: true,
      placeholder: 'Select multiple options'
    },
    options: defaultOptions
  }
};

export const MultiselectWithLimit: Story = {
  render: Template,
  args: {
    fullWidth: false,
    config: {
      ...defaultConfig,
      multiselect: true,
      maxSelectedItems: 3,
      placeholder: 'Select up to 3 options'
    },
    options: defaultOptions
  }
};

export const DarkMode: Story = {
  render: Template,
  parameters: {
    backgrounds: { default: 'dark' }
  },
  args: {
    fullWidth: false,
    config: defaultConfig,
    options: defaultOptions,
    tokens: darkModeTokens
  }
};

const mockOptions: DropdownOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

const mockUsers: DropdownOption[] = [
  { 
    value: '1', 
    label: 'John Doe',
    data: { 
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Developer'
    }
  },
  { 
    value: '2', 
    label: 'Jane Smith',
    data: { 
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'Designer'
    }
  },
  { 
    value: '3', 
    label: 'Bob Johnson',
    data: { 
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'Manager'
    }
  },
];

// Basic single-select dropdown
export const SingleSelect = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    
    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        options={mockOptions}
        config={{
          label: 'Single Select',
          placeholder: 'Select one option',
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic single-select dropdown with default configuration.',
      },
    },
  },
};

// Multiselect dropdown with chips
export const MultiSelectWithChips = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string[]>([]);
    
    const handleChange = (val: string | string[]) => {
      if (Array.isArray(val)) {
        setValue(val);
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        options={mockOptions}
        config={{
          label: 'Multi Select',
          placeholder: 'Select up to 3 options',
          multiselect: true,
          maxSelectedItems: 3,
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select dropdown with chip display and maximum selection limit.',
      },
    },
  },
};

// Searchable dropdown
export const SearchableDropdown = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    
    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        options={mockOptions}
        config={{
          label: 'Searchable Dropdown',
          placeholder: 'Type to search options',
          searchable: true,
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with search functionality to filter options.',
      },
    },
  },
};

// Disabled state
export const DisabledState = {
  render: (args: DropdownProps) => (
    <Dropdown
      {...args}
      options={mockOptions}
      config={{
        label: 'Disabled Dropdown',
        placeholder: 'Cannot interact',
        disabled: true,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown in disabled state, preventing user interaction.',
      },
    },
  },
};

// Error state
export const ErrorState = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    
    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        options={mockOptions}
        config={{
          label: 'Error State Dropdown',
          placeholder: 'Required field',
          required: true,
          error: 'This field is required',
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown displaying an error state with error message and required indicator.',
      },
    },
  },
};

// Custom option rendering
export const CustomOptionRendering = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    
    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        options={mockUsers}
        config={{
          label: 'User Selection',
          placeholder: 'Select a user',
          renderOption: (option) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src={option.data.avatar} 
                style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} 
                alt={option.label} 
              />
              <div>
                <div style={{ fontWeight: 500 }}>{option.label}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{option.data.role}</div>
              </div>
            </div>
          ),
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with custom option rendering, displaying user avatars and additional information.',
      },
    },
  },
};

// API Loading with search
export const AsyncSearchWithLoading = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    const [options, setOptions] = useState<DropdownOption[]>([]);
    
    const mockAPI = async (search: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockOptions.filter(opt => 
        opt.label.toLowerCase().includes(search.toLowerCase())
      );
    };

    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        options={options}
        config={{
          label: 'Async Search',
          placeholder: 'Type to search (min 2 chars)',
          searchable: true,
          search: {
            mode: 'api',
            minChars: 2,
            debounceMs: 300,
          },
          loadOptions: async (search) => {
            const results = await mockAPI(search);
            setOptions(results);
            return {
              options: results,
            };
          },
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with asynchronous search and loading states, demonstrating API integration.',
      },
    },
  },
};

// Infinite scroll pagination
export const InfiniteScrollPagination = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    const [options, setOptions] = useState<DropdownOption[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const loadMoreItems = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newOptions = mockOptions.slice((page - 1) * pageSize, page * pageSize);
      setOptions([...options, ...newOptions]);
      setPage(page + 1);
    };

    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        options={options}
        onLoadMore={loadMoreItems}
        config={{
          label: 'Paginated List',
          placeholder: 'Scroll to load more',
          pagination: {
            pageSize,
            currentPage: page,
            totalItems: mockOptions.length,
          },
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with infinite scroll pagination, loading more items as the user scrolls.',
      },
    },
  },
};

// Full width layout
export const FullWidthLayout = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    
    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
      }
    };

    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <Dropdown
          {...args}
          value={value}
          onChange={handleChange}
          options={mockOptions}
          fullWidth
          config={{
            label: 'Full Width Dropdown',
            placeholder: 'Fills container width',
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown that fills the width of its container.',
      },
    },
  },
};

// Advanced example with all features
export const AdvancedExample = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string[]>([]);
    const [options, setOptions] = useState<DropdownOption[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const mockAPI = async (search: string, currentPage: number) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const filtered = mockUsers.filter(user => 
        user.label.toLowerCase().includes(search.toLowerCase())
      );
      return {
        options: filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
        total: filtered.length,
      };
    };

    const loadMoreItems = async () => {
      setPage(page + 1);
    };

    const handleChange = (val: string | string[]) => {
      if (Array.isArray(val)) {
        setValue(val);
      }
    };

    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <Dropdown
          {...args}
          value={value}
          onChange={handleChange}
          options={options}
          onLoadMore={loadMoreItems}
          fullWidth
          config={{
            label: 'Advanced User Selection',
            placeholder: 'Search and select users',
            searchable: true,
            multiselect: true,
            maxSelectedItems: 3,
            search: {
              mode: 'api',
              minChars: 2,
              debounceMs: 300,
            },
            pagination: {
              pageSize,
              currentPage: page,
              totalItems: mockUsers.length,
            },
            loadOptions: async (search) => {
              const result = await mockAPI(search, page);
              const newOptions = result.options;
              setOptions(page === 1 ? newOptions : [...options, ...newOptions]);
              return {
                options: newOptions,
                pagination: {
                  pageSize,
                  currentPage: page,
                  totalItems: result.total,
                },
              };
            },
            renderOption: (option) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src={option.data.avatar} 
                  style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} 
                  alt={option.label} 
                />
                <div>
                  <div style={{ fontWeight: 500 }}>{option.label}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{option.data.role}</div>
                </div>
              </div>
            ),
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced example combining multiple features: multi-select, async search, pagination, custom rendering, and full width layout.',
      },
    },
  },
};

// Required Field Example
export const RequiredField = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    
    const handleChange = (val: string | string[]) => {
      if (typeof val === 'string') {
        setValue(val);
        setError(undefined);
      }
    };

    const handleBlur = () => {
      if (!value) {
        setError('This field is required');
      }
    };

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        options={mockOptions}
        config={{
          label: 'Required Field Example',
          placeholder: 'Please select an option',
          required: true,
          error: error,
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a required dropdown field with validation on blur.',
      },
    },
  },
};

// Form Validation Example
export const FormValidation = {
  render: (args: DropdownProps) => {
    const [formData, setFormData] = useState({
      user: '',
      role: '',
    });
    const [errors, setErrors] = useState({
      user: '',
      role: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = {
        user: !formData.user ? 'Please select a user' : '',
        role: !formData.role ? 'Please select a role' : '',
      };
      setErrors(newErrors);

      if (Object.values(newErrors).every(error => !error)) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Dropdown
            {...args}
            value={formData.user}
            onChange={(val) => setFormData(prev => ({ ...prev, user: val as string }))}
            options={mockUsers}
            config={{
              label: 'Select User',
              placeholder: 'Choose a user',
              required: true,
              error: errors.user,
              renderOption: (option) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img 
                    src={option.data.avatar} 
                    style={{ width: 24, height: 24, borderRadius: '50%' }} 
                    alt={option.label} 
                  />
                  <span>{option.label}</span>
                </div>
              ),
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Dropdown
            {...args}
            value={formData.role}
            onChange={(val) => setFormData(prev => ({ ...prev, role: val as string }))}
            options={[
              { value: 'admin', label: 'Administrator' },
              { value: 'user', label: 'Regular User' },
              { value: 'guest', label: 'Guest' },
            ]}
            config={{
              label: 'Select Role',
              placeholder: 'Choose a role',
              required: true,
              error: errors.role,
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit Form
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of form validation with multiple required dropdowns.',
      },
    },
  },
}; 