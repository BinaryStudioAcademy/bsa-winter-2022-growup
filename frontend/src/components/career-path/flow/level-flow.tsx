import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ConnectionLineType,
  MarkerType,
  Position,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import { ShieldFillCheck } from 'react-bootstrap-icons';
import avatar from 'assets/img/icons/header-icons/avatar-icon.svg';
import LevelNode from './level-node';
import UserNode from './user-node';

const LevelFlow: React.FC = () => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const nodeTypes = useMemo(
    () => ({ levelNode: LevelNode, userNode: UserNode }),
    [],
  );

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
        id: '1u',
        type: 'userNode',
        data: {
          icon: <img src={avatar} alt="Avatar" />,
          title: 'Fullstack JS Developer',
          subtitle: (
            <>
              <ShieldFillCheck className="text-gu-blue me-2 fs-5" />
              <span>level 2</span>
            </>
          ),
        },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Right,
      },
      {
        id: '1',
        type: 'levelNode',
        data: {
          acquiredSkills: 33,
          totalSkills: 35,
          level: 1,
          progressColor: 'green',
        },
        position: { x: 500, y: 0 },
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
        position: { x: 500, y: 120 },
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
        position: { x: 500, y: 240 },
        targetPosition: Position.Left,
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
        position: { x: 500, y: 360 },
      },
      {
        id: '5',
        type: 'levelNode',
        data: {
          acquiredSkills: 3,
          totalSkills: 35,
          level: 1,
          progressColor: 'grey',
        },
        position: { x: 500, y: 480 },
      },
      {
        id: '6',
        type: 'levelNode',
        data: {
          acquiredSkills: 3,
          totalSkills: 35,
          level: 1,
          progressColor: 'grey',
        },
        position: { x: 500, y: 600 },
      },
    ]);

    setEdges([
      {
        id: 'e1u-1',
        source: '1u',
        target: '1',
        animated: true,
        type: ConnectionLineType.SmoothStep,
        style: { stroke: 'green', strokeWidth: '2px' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'green',
          width: 15,
          height: 15,
          strokeWidth: 2,
        },
      },
      {
        id: 'e1-2',
        source: '1u',
        target: '2',
        animated: true,
        type: ConnectionLineType.SmoothStep,
        style: { stroke: 'blue', strokeWidth: '2px' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'blue',
          width: 15,
          height: 15,
          strokeWidth: 2,
        },
      },
      {
        id: 'e2a-3',
        source: '1u',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        type: ConnectionLineType.SmoothStep,
        style: { stroke: 'red', strokeWidth: '2px' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'red',
          width: 15,
          height: 15,
          strokeWidth: 2,
        },
      },
      {
        id: 'e3b-4',
        source: '1u',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        type: ConnectionLineType.SmoothStep,
        style: { stroke: 'grey', strokeWidth: '2px' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'grey',
          width: 15,
          height: 15,
          strokeWidth: 2,
        },
      },
      {
        id: 'e3b-5',
        source: '1u',
        target: '5',
        sourceHandle: 'b',
        animated: true,
        type: ConnectionLineType.SmoothStep,
        style: { stroke: 'grey', strokeWidth: '2px' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'grey',
          width: 15,
          height: 15,
          strokeWidth: 2,
        },
      },
      {
        id: 'e3b-6',
        source: '1u',
        target: '6',
        sourceHandle: 'b',
        animated: true,
        type: ConnectionLineType.SmoothStep,
        style: { stroke: 'grey', strokeWidth: '2px' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'grey',
          width: 15,
          height: 15,
          strokeWidth: 2,
        },
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
      // fitView
      maxZoom={1}
      // minZoom={0.3}
      snapToGrid={true}
      draggable={false}
      panOnDrag={false}
      nodesDraggable={false}
      connectOnClick={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      style={{ height: '100vh', width: '800px' }}
    />
  );
};

export default LevelFlow;
