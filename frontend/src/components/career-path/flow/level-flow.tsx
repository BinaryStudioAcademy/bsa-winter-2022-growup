import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import LevelNode from './level-node';

const connectionLineStyle = { stroke: '#5fcb64' };
const snapGrid: [number, number] = [20, 20];

const LevelFlow: React.FC = () => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({ levelNode: LevelNode }), []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  useEffect(() => {
    setNodes([
      {
        id: '1',
        type: 'levelNode',
        data: {
          acquiredSkills: 33,
          totalSkills: 35,
          level: 1,
          progressColor: 'green',
        },
        position: { x: 200, y: 0 },
      },
      {
        id: '2',
        type: 'levelNode',
        data: {
          acquiredSkills: 25,
          totalSkills: 35,
          level: 1,
          progressColor: 'blue',
        },
        position: { x: 200, y: 150 },
      },
      {
        id: '3',
        type: 'levelNode',
        data: {
          acquiredSkills: 17,
          totalSkills: 35,
          level: 1,
          progressColor: 'red',
        },
        position: { x: 200, y: 300 },
      },
      {
        id: '4',
        type: 'levelNode',
        data: {
          acquiredSkills: 3,
          totalSkills: 35,
          level: 1,
          progressColor: 'grey',
        },
        position: { x: 200, y: 450 },
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: 'green', strokeWidth: '2px' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: 'blue', strokeWidth: '2px' },
      },
      {
        id: 'e3b-4',
        source: '3',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: 'grey', strokeWidth: '2px' },
      },
    ]);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapGrid={snapGrid}
      fitView
      snapToGrid={true}
      nodesDraggable={false}
      style={{ height: 700 }}
    />
  );
};

export default LevelFlow;
