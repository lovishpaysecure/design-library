import styled from 'styled-components';
import { StyledTypographyProps } from '../components/Typography/Typography.types';

export const StyledTypography = styled.div<StyledTypographyProps>`
  margin: 0;
  text-align: ${props => props.$align};
  font-family: inherit;

  ${props => {
    switch (props.$variant) {
      case 'h1':
        return `
          font-size: 2.5rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 0.5em;
        `;
      case 'h2':
        return `
          font-size: 2rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h3':
        return `
          font-size: 1.75rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h4':
        return `
          font-size: 1.5rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h5':
        return `
          font-size: 1.25rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h6':
        return `
          font-size: 1rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'subtitle1':
        return `
          font-size: 1.125rem;
          line-height: 1.5;
          letter-spacing: 0;
          margin-bottom: 0.35em;
        `;
      case 'subtitle2':
        return `
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: 0.01em;
          margin-bottom: 0.35em;
        `;
      case 'body1':
        return `
          font-size: 1rem;
          line-height: 1.6;
          letter-spacing: 0;
          margin-bottom: 1em;
        `;
      case 'body2':
        return `
          font-size: 0.875rem;
          line-height: 1.6;
          letter-spacing: 0;
          margin-bottom: 1em;
        `;
      case 'caption':
        return `
          font-size: 0.75rem;
          line-height: 1.5;
          letter-spacing: 0.02em;
          margin-bottom: 0.5em;
        `;
      case 'overline':
        return `
          font-size: 0.75rem;
          line-height: 1.5;
          letter-spacing: 0.1em;
          margin-bottom: 0.5em;
          text-transform: uppercase;
        `;
      default:
        return '';
    }
  }}

  font-weight: ${props => {
    switch (props.$weight) {
      case 'regular': return '400';
      case 'medium': return '500';
      case 'semibold': return '600';
      case 'bold': return '700';
      default: return '400';
    }
  }};
`; 