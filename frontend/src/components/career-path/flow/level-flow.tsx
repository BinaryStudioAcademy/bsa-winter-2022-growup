import React, { useMemo } from 'react';
import { useState, useWindowSize } from 'hooks/hooks';
import ReactFlow, { Edge, Node, ReactFlowInstance } from 'react-flow-renderer';
import { LEVEL_WIDTH, MAX_LEVEL_FLOW_WIDTH } from './common/constants';
import LevelNode from './level-node';
import UserNode from './user-node';
import './level-flow.scss';

interface Props {
  nodes: Node[];
  edges: Edge[];
}

const LevelFlow: React.FC<Props> = ({ nodes, edges }) => {
  const nodeTypes = useMemo(
    () => ({ levelNode: LevelNode, userNode: UserNode }),
    [],
  );

  useWindowSize();

  const [instance, setInstance] = useState<ReactFlowInstance>();
  const levelFlow = document.getElementById('level-flow');
  const levelFlowHeight = (edges.length || 1) * LEVEL_WIDTH;
  const levelFlowWidth = levelFlow?.clientWidth || 1;
  const prefZoom = levelFlowWidth / MAX_LEVEL_FLOW_WIDTH;

  if (instance) {
    levelFlow && (levelFlow.style.height = `${levelFlowHeight * prefZoom}px`);
    instance.fitView();
    const { x, zoom } = instance.getViewport();
    instance.setViewport({ x, y: 25, zoom });
  }

  return (
    <ReactFlow
      id="level-flow"
      onInit={(flowInstance: ReactFlowInstance): void =>
        setInstance(flowInstance)
      }
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      draggable={false}
      panOnDrag={false}
      nodesDraggable={false}
      connectOnClick={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      className="level-flow bg-white"
      attributionPosition="bottom-left"
    />
  );
};

export default LevelFlow;
