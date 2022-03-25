import { v4 as uuidv4 } from 'uuid';
import { ConnectionLineType, MarkerType } from 'react-flow-renderer';
import { IEdge } from '../common/interfaces';

export const getEdge = (
  source: string,
  target: string,
  color: string,
): IEdge => {
  return {
    id: uuidv4(),
    source,
    target,
    animated: true,
    type: ConnectionLineType.SmoothStep,
    style: { stroke: color, strokeWidth: '2px' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: color,
      width: 15,
      height: 15,
      strokeWidth: 2,
    },
  };
};
