import React, { useMemo } from 'react';
import ReactFlow, { Edge, Node } from 'react-flow-renderer';
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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      maxZoom={1}
      minZoom={0.3}
      snapToGrid={true}
      draggable={false}
      panOnDrag={false}
      nodesDraggable={false}
      connectOnClick={false}
      zoomOnPinch={false}
      zoomOnScroll={true}
      zoomOnDoubleClick={false}
      className="level-flow bg-white me-3"
      attributionPosition="bottom-left"
    />
  );
};

export default LevelFlow;
