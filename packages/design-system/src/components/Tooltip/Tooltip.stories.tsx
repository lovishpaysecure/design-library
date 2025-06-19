import React from 'react';
import { Tooltip } from './Tooltip';
import { Typography } from '../Typography/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export const Default = () => (
  <Tooltip content={<span>This is a tooltip using <b>Typography</b>!</span>}>
    <button style={{ fontSize: 24, padding: 8 }}>
      <FontAwesomeIcon icon={faInfoCircle} />
    </button>
  </Tooltip>
);

export const Placement = () => (
  <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
    <Tooltip content={<Typography variant="body2">Tooltip on top</Typography>} placement="top">
      <button>Top</button>
    </Tooltip>
    <Tooltip content={<Typography variant="body2">Tooltip on right</Typography>} placement="right">
      <button>Right</button>
    </Tooltip>
    <Tooltip content={<Typography variant="body2">Tooltip on bottom</Typography>} placement="bottom">
      <button>Bottom</button>
    </Tooltip>
    <Tooltip content={<Typography variant="body2">Tooltip on left</Typography>} placement="left">
      <button>Left</button>
    </Tooltip>
  </div>
);

export const WithLineBreak = () => (
  <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
    <Tooltip 
      content="This is a very long tooltip that will break into multiple lines when linebreak is enabled"
      linebreak={true}
      maxWidth="200px"
    >
      <button>Linebreak Enabled</button>
    </Tooltip>
    <Tooltip 
      content="This is a very long tooltip that will stay on one line when linebreak is disabled"
      linebreak={false}
    >
      <button>Linebreak Disabled</button>
    </Tooltip>
  </div>
);

export const LineBreakComparison = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', marginTop: 40 }}>
    <div style={{ display: 'flex', gap: 40 }}>
      <Tooltip 
        content="Short tooltip"
        linebreak={false}
      >
        <button>Short Content (No Linebreak)</button>
      </Tooltip>
      <Tooltip 
        content="Short tooltip"
        linebreak={true}
        maxWidth="300px"
      >
        <button>Short Content (With Linebreak)</button>
      </Tooltip>
    </div>
    <div style={{ display: 'flex', gap: 40 }}>
      <Tooltip 
        content="This is a very long tooltip content that demonstrates how the tooltip behaves without linebreak enabled"
        linebreak={false}
      >
        <button>Long Content (No Linebreak)</button>
      </Tooltip>
      <Tooltip 
        content="This is a very long tooltip content that demonstrates how the tooltip behaves with linebreak enabled and max-width applied"
        linebreak={true}
        maxWidth="250px"
      >
        <button>Long Content (With Linebreak)</button>
      </Tooltip>
    </div>
  </div>
); 