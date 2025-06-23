import React, { useMemo, useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption, SeriesOption } from 'echarts';
import * as echarts from 'echarts';
import { useTokens } from '../../hooks/useTokens';
import { ChartProps, ChartTokens, ChartDataPoint, MapDataPoint } from './Chart.types';
import { chartTokens } from './Chart.tokens';

const DEFAULT_COLORS = [
  '#5b7dff', '#ff5656', '#ff9f40', '#4bc0c0', '#9966ff',
  '#ff6384', '#36a2eb', '#ffcd56', '#fd6c9e', '#c9cbcf'
];

export const Chart: React.FC<ChartProps> = ({
  data,
  categories,
  variant = 'line',
  orientation = 'vertical',
  innerRadius = '40%',
  outerRadius = '80%',
  startAngle = 90,
  endAngle = 450,

  mapName = 'world',
  mapZoom = 1,
  mapCenter,
  roam = true,
  emphasis,
  title,
  subtitle,
  height = 400,
  width = '100%',
  legend = { show: true, position: 'bottom', selectedMode: 'multiple' },
  xAxis = {},
  yAxis = { scale: true },
  tooltip = { show: true, trigger: 'axis' },
  grid = { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  zoom,
  loading = false,
  theme = 'light',
  animation = true,
  responsive = true,
  onLegendSelectChanged,
  onDataZoom,
  onClick,
  className,
  style,
  tokens: customTokens,
  customOption = {},
}) => {
  const tokens = useTokens<ChartTokens>('chart', chartTokens, customTokens);
  const [isMapReady, setIsMapReady] = useState(variant !== 'map');

  // Register map data when map variant is used
  useEffect(() => {
    if (variant === 'map') {
      setIsMapReady(false);
      const registerMap = async () => {
        try {
          // Load proper world map data
          const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
          const worldMapData = await response.json();
          
          if (worldMapData && !echarts.getMap(mapName)) {
            echarts.registerMap(mapName, worldMapData);
          }
          setIsMapReady(true);
        } catch (error) {
          console.warn(`Failed to load world map data, using fallback:`, error);
          
          // Fallback to a basic world map if external fetch fails
          const fallbackMap = {
            type: "FeatureCollection" as const,
            features: [
              {
                type: "Feature" as const,
                properties: { name: "South Africa" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[16, -22], [33, -22], [33, -35], [16, -35], [16, -22]]] 
                }
              },
              {
                type: "Feature" as const,
                properties: { name: "China" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[73, 18], [135, 18], [135, 54], [73, 54], [73, 18]]] 
                }
              },
              {
                type: "Feature" as const,
                properties: { name: "India" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[68, 6], [97, 6], [97, 37], [68, 37], [68, 6]]] 
                }
              },
              {
                type: "Feature" as const,
                properties: { name: "United States" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[-171, 18], [-66, 18], [-66, 71], [-171, 71], [-171, 18]]] 
                }
              },
              {
                type: "Feature" as const,
                properties: { name: "Brazil" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[-74, -34], [-34, -34], [-34, 5], [-74, 5], [-74, -34]]] 
                }
              },
              {
                type: "Feature" as const,
                properties: { name: "Australia" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[113, -44], [154, -44], [154, -10], [113, -10], [113, -44]]] 
                }
              },
              {
                type: "Feature" as const,
                properties: { name: "Russia" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[19, 41], [169, 41], [169, 82], [19, 82], [19, 41]]] 
                }
              },
              {
                type: "Feature" as const,
                properties: { name: "Canada" },
                geometry: { 
                  type: "Polygon" as const, 
                  coordinates: [[[-141, 41], [-52, 41], [-52, 84], [-141, 84], [-141, 41]]] 
                }
              }
            ]
          };
          
          if (fallbackMap && !echarts.getMap(mapName)) {
            echarts.registerMap(mapName, fallbackMap);
          }
          setIsMapReady(true);
        }
      };
      
      registerMap();
    } else {
      setIsMapReady(true);
    }
  }, [variant, mapName]);

  // Generate series data with enhanced configurations
  const series: SeriesOption[] = useMemo(() => {
    // Handle pie chart data differently
    if (variant === 'pie') {
      return [{
        type: 'pie' as const,
        radius: [innerRadius, outerRadius],
        startAngle,
        endAngle,
        data: (data as any[]).map((item, index) => ({
          name: item.name,
          value: 'value' in item ? item.value : item.data?.[0] || 0,
          itemStyle: {
            color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        animation,
        animationDuration: 1000,
        animationEasing: 'cubicOut' as const,
        label: {
          show: false, // Hide labels on pie slices, use legend instead
        },
        labelLine: {
          show: false,
        },
      }];
    }
    // Handle geographic map data
    if (variant === 'map') {
      try {
        const mapData = Array.isArray(data) ? data : [];
        const processedData = mapData.map(item => {
          // Ensure we have the required properties
          const mapItem = item as MapDataPoint;
          return {
            name: mapItem?.name || '',
            value: mapItem?.value || 0,
            itemStyle: mapItem?.itemStyle || undefined,
          };
        });

        return [{
          type: 'map' as const,
          map: mapName || 'world',
          data: processedData,
          roam: roam,
          zoom: mapZoom,
          center: mapCenter,
          emphasis: emphasis || {
            focus: 'self',
            itemStyle: {
              areaColor: '#fbbf24',
              borderColor: '#f59e0b',
              borderWidth: 2,
            },
          },
          select: {
            itemStyle: {
              areaColor: '#3b82f6',
            },
          },
          itemStyle: {
            borderColor: '#d1d5db',
            borderWidth: 0.5,
            areaColor: '#f9fafb',
          },
          animation,
          animationDuration: 1000,
          animationEasing: 'cubicOut' as const,
          label: {
            show: false, // Hide labels by default, can be enabled via customOption
          },
        }];
      } catch (error) {
        console.warn('Error processing map data:', error);
        return [];
      }
    }

    // Handle other chart types (line, bar)
    return (data as ChartDataPoint[]).map((item, index) => {
      const color = item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      
      const baseConfig = {
        name: item.name,
        data: item.data,
        itemStyle: {
          color: color,
        },
        emphasis: {
          focus: 'series' as const,
          blurScope: 'coordinateSystem' as const,
        },
        animation,
        animationDuration: 1000,
        animationEasing: 'cubicOut' as const,
      };

      // Determine chart type based on variant prop or individual item type
      const chartType = item.type || variant;

      if (chartType === 'bar') {
        // Calculate bar width based on number of series and desired spacing
        const seriesCount = data.length;
        const maxBarWidth = orientation === 'horizontal' ? 8 : 12; // Thinner bars for better grouping
        const barWidth = Math.min(maxBarWidth, Math.max(4, 60 / seriesCount));
        
        return {
          ...baseConfig,
          type: 'bar' as const,
          barWidth: barWidth,
          barGap: '10%', // Gap between bars in same category
          barCategoryGap: '20%', // Gap between categories
          itemStyle: {
            ...baseConfig.itemStyle,
            borderRadius: orientation === 'horizontal' ? [0, 2, 2, 0] : [2, 2, 0, 0],
          },
        };
      } else {
        return {
          ...baseConfig,
          type: 'line' as const,
          smooth: item.smooth ?? false,
          showSymbol: item.showSymbol ?? false,
          symbol: 'circle' as const,
          symbolSize: 6,
          lineStyle: {
            width: item.lineWidth || 2,
            color: color,
          },
        };
      }
    });
  }, [data, variant, orientation, animation, innerRadius, outerRadius, startAngle, endAngle, mapName, mapZoom, mapCenter, roam, emphasis]);

  // Build complete ECharts option
  const option: EChartsOption = useMemo(() => {
    const baseOption: EChartsOption = {
      // Title configuration
      title: title || subtitle ? {
        text: title,
        subtext: subtitle,
        left: 'left',
        textStyle: {
          fontSize: 18,
          fontWeight: 600 as any,
          color: tokens.axis.textColor,
        },
        subtextStyle: {
          fontSize: 14,
          color: tokens.axis.textColor,
          opacity: 0.7,
        },
      } : undefined,

      // Legend with enhanced interaction
      legend: legend.show ? {
        type: 'scroll',
        orient: legend.orientation || 'horizontal',
        [legend.position || 'bottom']: legend.position === 'left' || legend.position === 'right' ? '3%' : '0%',
        selectedMode: legend.selectedMode ?? 'multiple',
        inactiveColor: legend.inactiveColor || tokens.legend.inactiveColor,
        textStyle: {
          fontSize: parseInt(tokens.legend.fontSize),
          fontWeight: parseInt(tokens.legend.fontWeight) as any,
          color: legend.activeColor || tokens.legend.color,
        },
        itemGap: parseInt(tokens.legend.spacing),
        itemWidth: 12,
        itemHeight: 12,
        icon: 'rect',
        padding: [8, 0, 0, 0],
        formatter: (name: string) => name,
      } : undefined,

      // Tooltip with rich formatting
      tooltip: tooltip.show ? {
        trigger: variant === 'pie' || variant === 'map' ? 'item' : (tooltip.trigger || 'axis'),
        backgroundColor: tooltip.backgroundColor || tokens.tooltip.backgroundColor,
        borderColor: tooltip.borderColor || tokens.tooltip.borderColor,
        borderRadius: parseInt(tokens.tooltip.borderRadius),
        padding: [8, 12],
        textStyle: {
          color: tokens.tooltip.textColor,
          fontSize: parseInt(tokens.tooltip.fontSize),
        },
        formatter: tooltip.formatter || ((params: any) => {
          if (Array.isArray(params)) {
            const categoryName = params[0]?.axisValueLabel || '';
            let content = `<div style="font-weight: 600; margin-bottom: 4px;">${categoryName}</div>`;
            
            params.forEach((param: any) => {
              const color = param.color || '#000';
              const marker = `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 8px;"></span>`;
              content += `<div style="margin: 2px 0;">${marker}${param.seriesName}: <strong>${param.value}</strong></div>`;
            });
            
            return content;
          }
          return `${params.seriesName}: ${params.value}`;
        }),
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: tokens.axis.lineColor,
          },
        },
      } : undefined,

      // Grid configuration (not used for pie charts or maps)
      grid: variant === 'pie' || variant === 'map' ? undefined : {
        left: grid.left || '5%',
        right: grid.right || '3%',
        bottom: grid.bottom || (legend.show ? '18%' : '5%'),
        top: grid.top || (title || subtitle ? '12%' : '5%'),
        containLabel: grid.containLabel ?? true,
      },

      // Visual Map for maps
      visualMap: variant === 'map' ? {
        min: 0,
        max: 100,
        calculable: true,
        realtime: false,
        inRange: {
          color: ['#e0e7ff', '#4338ca'], // Light to dark blue gradient
        },
        right: '2%',
        bottom: '20%',
        textStyle: {
          color: tokens.axis.textColor,
        },
        splitNumber: 5,
        show: false, // Hide the visual map legend as shown in your design
      } : undefined,

      // X-Axis with enhanced formatting (not used for pie charts or maps)
      xAxis: variant === 'pie' || variant === 'map' ? undefined : {
        type: orientation === 'horizontal' && variant === 'bar' ? 'value' : (xAxis.type || 'category'),
        boundaryGap: variant === 'bar' && orientation === 'vertical' ? true : (xAxis.boundaryGap ?? false),
        data: orientation === 'horizontal' && variant === 'bar' ? undefined : categories,
        name: xAxis.name,
        nameLocation: xAxis.nameLocation || 'end',
        nameTextStyle: {
          color: tokens.axis.textColor,
          fontSize: parseInt(tokens.axis.fontSize),
        },
        axisLine: {
          show: xAxis.axisLine?.show ?? false,
          lineStyle: {
            color: tokens.axis.lineColor,
          },
        },
        axisTick: {
          show: xAxis.axisTick?.show ?? false,
          interval: typeof xAxis.axisTick?.interval === 'number' ? xAxis.axisTick.interval : undefined,
        },
        axisLabel: {
          show: xAxis.axisLabel?.show ?? true,
          interval: xAxis.axisLabel?.interval || 'auto',
          rotate: xAxis.axisLabel?.rotate || 0,
          margin: xAxis.axisLabel?.margin || 12,
          color: tokens.axis.textColor,
          fontSize: parseInt(tokens.axis.fontSize),
          formatter: xAxis.axisLabel?.formatter,
        },
        splitLine: {
          show: xAxis.splitLine?.show ?? false,
          lineStyle: {
            color: tokens.axis.gridColor,
            type: 'solid',
            width: 1,
          },
        },
        min: xAxis.min,
        max: xAxis.max,
        interval: typeof xAxis.interval === 'number' ? xAxis.interval : undefined,
        scale: xAxis.scale,
        splitNumber: xAxis.splitNumber,
      },

      // Y-Axis with enhanced formatting (not used for pie charts or maps)
      yAxis: variant === 'pie' || variant === 'map' ? undefined : {
        type: orientation === 'horizontal' && variant === 'bar' ? 'category' : (yAxis.type || 'value'),
        data: orientation === 'horizontal' && variant === 'bar' ? categories : undefined,
        name: yAxis.name,
        nameLocation: yAxis.nameLocation || 'end',
        nameTextStyle: {
          color: tokens.axis.textColor,
          fontSize: parseInt(tokens.axis.fontSize),
        },
        axisLine: {
          show: yAxis.axisLine?.show ?? false,
          lineStyle: {
            color: tokens.axis.lineColor,
          },
        },
        axisTick: {
          show: yAxis.axisTick?.show ?? false,
        },
        axisLabel: {
          show: yAxis.axisLabel?.show ?? true,
          color: tokens.axis.textColor,
          fontSize: parseInt(tokens.axis.fontSize),
          formatter: yAxis.axisLabel?.formatter,
          margin: 16,
        },
        splitLine: {
          show: yAxis.splitLine?.show ?? true,
          lineStyle: {
            color: tokens.axis.gridColor,
            type: 'solid',
            width: 1,
          },
        },
        min: yAxis.min,
        max: yAxis.max,
        interval: typeof yAxis.interval === 'number' ? yAxis.interval : undefined,
        scale: yAxis.scale ?? true,
        splitNumber: yAxis.splitNumber,
      },

      // Data zoom for granular control
      dataZoom: zoom?.show ? [
        {
          type: zoom.type === 'slider' ? 'slider' : 'inside',
          xAxisIndex: zoom.xAxisIndex || [0],
          start: zoom.start || 0,
          end: zoom.end || 100,
          startValue: zoom.startValue,
          endValue: zoom.endValue,
          minSpan: zoom.minSpan || 5,
          maxSpan: zoom.maxSpan || 100,
          filterMode: zoom.filterMode || 'filter',
          height: zoom.type === 'slider' ? 30 : undefined,
          bottom: zoom.type === 'slider' ? 20 : undefined,
        },
        ...(zoom.type !== 'slider' ? [{
          type: 'inside' as const,
          yAxisIndex: zoom.yAxisIndex || [0],
          orient: 'vertical' as const,
        }] : []),
      ] : undefined,

      // Animation configuration
      animation,
      animationDuration: 1000,
      animationEasing: 'cubicOut',

      // Series data
      series,

      // Responsive configuration
      responsive: responsive,
    };

    // Merge with custom options
    return { ...baseOption, ...customOption };
  }, [
    title, subtitle, legend, tooltip, grid, xAxis, yAxis, zoom,
    categories, series, animation, responsive, customOption, tokens
  ]);

  // Event handlers
  const handleLegendSelectChanged = useCallback((params: any) => {
    onLegendSelectChanged?.(params.selected);
  }, [onLegendSelectChanged]);

  const handleDataZoom = useCallback((params: any) => {
    onDataZoom?.(params);
  }, [onDataZoom]);

  const handleClick = useCallback((params: any) => {
    onClick?.(params);
  }, [onClick]);

  const onEvents = {
    'legendselectchanged': handleLegendSelectChanged,
    'datazoom': handleDataZoom,
    'click': handleClick,
  };

  return (
    <div
      className={`chart-wrapper ${className || ''}`}
      style={{
        width,
        height: typeof height === 'number' ? `${height}px` : height,
        border: 'none',
        padding: 0,
        margin: 0,
        background: 'transparent',
        boxShadow: 'none',
        ...style,
      }}
    >
      {!isMapReady && variant === 'map' ? (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: tokens.axis.textColor 
        }}>
          Loading map...
        </div>
      ) : (
        <ReactECharts
          option={option}
          style={{ 
            height: '100%', 
            width: '100%',
            border: 'none',
            padding: 0,
            margin: 0,
            outline: 'none'
          }}
          showLoading={loading}
          onEvents={onEvents}
          opts={{
            renderer: 'canvas',
          }}
        />
      )}
    </div>
  );
};

Chart.displayName = 'Chart'; 