import { EChartsOption } from 'echarts';

export interface ChartDataPoint {
  name: string;
  data: (number | null)[];
  color?: string;
  lineWidth?: number;
  type?: 'line' | 'bar' | 'pie';
  smooth?: boolean;
  showSymbol?: boolean;
}

// Specific type for pie chart data (simpler structure)
export interface PieChartDataPoint {
  name: string;
  value: number;
  color?: string;
}



// Specific type for geographic map data
export interface MapDataPoint {
  name: string; // Country/region name (must match map data)
  value: number; // Data value for coloring
  itemStyle?: {
    areaColor?: string; // Custom color for this region
    borderColor?: string; // Border color
  };
}

export interface ChartLegendConfig {
  show?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  orientation?: 'horizontal' | 'vertical';
  selectedMode?: boolean | 'single' | 'multiple';
  inactiveColor?: string;
  activeColor?: string;
}

export interface ChartAxisConfig {
  show?: boolean;
  type?: 'category' | 'value' | 'time' | 'log';
  name?: string;
  nameLocation?: 'start' | 'middle' | 'end';
  min?: number | string | 'dataMin';
  max?: number | string | 'dataMax';
  interval?: number | 'auto';
  scale?: boolean;
  splitNumber?: number;
  boundaryGap?: boolean | [string, string];
  axisLabel?: {
    show?: boolean;
    interval?: number | 'auto';
    rotate?: number;
    margin?: number;
    formatter?: string | ((value: any, index: number) => string);
  };
  axisTick?: {
    show?: boolean;
    interval?: number | 'auto';
  };
  axisLine?: {
    show?: boolean;
  };
  splitLine?: {
    show?: boolean;
  };
}

export interface ChartTooltipConfig {
  show?: boolean;
  trigger?: 'item' | 'axis' | 'none';
  formatter?: string | ((params: any) => string);
  backgroundColor?: string;
  borderColor?: string;
  textStyle?: {
    color?: string;
    fontSize?: number;
  };
}

export interface ChartGridConfig {
  show?: boolean;
  left?: string | number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  containLabel?: boolean;
}

export interface ChartZoomConfig {
  show?: boolean;
  type?: 'slider' | 'inside' | 'select';
  xAxisIndex?: number | number[];
  yAxisIndex?: number | number[];
  start?: number;
  end?: number;
  startValue?: number | string;
  endValue?: number | string;
  minSpan?: number;
  maxSpan?: number;
  filterMode?: 'filter' | 'weakFilter' | 'empty' | 'none';
}

export interface ChartTokens {
  legend: {
    fontSize: string;
    fontWeight: string;
    color: string;
    inactiveColor: string;
    spacing: string;
  };
  axis: {
    lineColor: string;
    textColor: string;
    fontSize: string;
    gridColor: string;
  };
  tooltip: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    fontSize: string;
    borderRadius: string;
    padding: string;
  };
}

export interface ChartProps {
  data: ChartDataPoint[] | PieChartDataPoint[] | MapDataPoint[];
  categories: string[];
  variant?: 'line' | 'bar' | 'pie' | 'map';
  orientation?: 'vertical' | 'horizontal';
  // Pie chart specific options
  innerRadius?: number | string; // For donut charts
  outerRadius?: number | string;
  startAngle?: number;
  endAngle?: number;

  // Map specific options
  mapName?: string; // Map to use ('world', 'africa', 'asia', etc.)
  mapZoom?: number; // Zoom level for the map
  mapCenter?: [number, number]; // [longitude, latitude] center point
  roam?: boolean; // Enable pan and zoom
  emphasis?: {
    focus?: 'self' | 'adjacency';
    itemStyle?: {
      areaColor?: string;
      borderColor?: string;
      borderWidth?: number;
    };
  };
  title?: string;
  subtitle?: string;
  height?: number | string;
  width?: number | string;
  legend?: ChartLegendConfig;
  xAxis?: ChartAxisConfig;
  yAxis?: ChartAxisConfig;
  tooltip?: ChartTooltipConfig;
  grid?: ChartGridConfig;
  zoom?: ChartZoomConfig;
  loading?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  animation?: boolean;
  responsive?: boolean;
  onLegendSelectChanged?: (selected: Record<string, boolean>) => void;
  onDataZoom?: (params: any) => void;
  onClick?: (params: any) => void;
  className?: string;
  style?: React.CSSProperties;
  tokens?: Partial<ChartTokens>;
  customOption?: Partial<EChartsOption>;
} 