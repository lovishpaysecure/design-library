import styled from 'styled-components';
import { ChartTokens } from '../components/Chart/Chart.types';

export const ChartContainer = styled.div<{ tokens: ChartTokens }>`
  background-color: ${props => props.tokens.container.backgroundColor};
  border: ${props => props.tokens.container.border};
  border-radius: ${props => props.tokens.container.borderRadius};
  padding: ${props => props.tokens.container.padding};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  
  .echarts-legend {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  
  .echarts-legend-item {
    margin-right: ${props => props.tokens.legend.spacing};
  }
  
  .echarts-legend-item-icon {
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .echarts-legend-item.echarts-legend-item-inactive .echarts-legend-item-icon {
    opacity: 0.3;
    background-color: ${props => props.tokens.legend.inactiveColor} !important;
  }
`;

export const ChartTitle = styled.div<{ tokens: ChartTokens }>`
  font-size: 16px;
  font-weight: 600;
  color: #202124;
  margin-bottom: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const ChartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const ControlDropdown = styled.select`
  padding: 6px 12px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 13px;
  color: #5f6368;
  outline: none;
  
  &:focus {
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  }
`;

export const ControlButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 13px;
  color: #5f6368;
  cursor: pointer;
  outline: none;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:focus {
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  }
`; 