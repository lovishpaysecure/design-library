import styled from 'styled-components';
import { StyledTypographyProps, TypographyTokens } from '../components/Typography/Typography.types';

export const StyledTypography = styled.div<StyledTypographyProps & { tokens: TypographyTokens }>`
  margin: 0;
  text-align: ${props => props.$align};
  font-family: ${props => props.tokens.fontFamily};
  font-weight: ${props => props.tokens.weights[props.$weight]};

  ${props => {
    const variant = props.tokens.variants[props.$variant];
    return `
      font-size: ${variant.fontSize};
      line-height: ${variant.lineHeight};
      letter-spacing: ${variant.letterSpacing};
      ${variant.marginBottom ? `margin-bottom: ${variant.marginBottom};` : ''}
      ${variant.textTransform ? `text-transform: ${variant.textTransform};` : ''}
    `;
  }}
`; 