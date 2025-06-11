import React from 'react';
import styled from 'styled-components';
import { Button } from '@pay-design/design-system/Button';
import { Typography } from '@pay-design/design-system/Typography';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function App() {
  return (
    <Container>
      <Typography variant="h1">Design System Demo</Typography>
      
      <Section>
        <Typography variant="h2">Button Variants</Typography>
        <ButtonGrid>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </ButtonGrid>
      </Section>

      <Section>
        <Typography variant="h2">Button Sizes</Typography>
        <ButtonRow>
          <Button size="small">Small Button</Button>
          <Button size="medium">Medium Button</Button>
          <Button size="large">Large Button</Button>
        </ButtonRow>
      </Section>

      <Section>
        <Typography variant="h2">Full Width Button</Typography>
        <ButtonRow>
          <Button fullWidth>Full Width Button</Button>
        </ButtonRow>
      </Section>

      <Section>
        <Typography variant="h2">Disabled State</Typography>
        <ButtonGrid>
          <Button variant="primary" disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
          <Button variant="tertiary" disabled>Disabled Tertiary</Button>
          <Button variant="ghost" disabled>Disabled Ghost</Button>
        </ButtonGrid>
      </Section>

      <Section>
        <Typography variant="h2">With Icons</Typography>
        <ButtonGrid>
          <Button>
            <span>🚀</span>
            <span>With Icon</span>
          </Button>
          <Button variant="secondary">
            <span>⚡️</span>
            <span>Fast Performance</span>
          </Button>
          <Button variant="tertiary">
            <span>🎨</span>
            <span>Design System</span>
          </Button>
          <Button variant="ghost">
            <span>🔄</span>
            <span>Sync Tokens</span>
          </Button>
        </ButtonGrid>
      </Section>
    </Container>
  );
} 