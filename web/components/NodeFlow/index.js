import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { useIsomorphicLayoutEffect, useMeasure } from "react-use";
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState, ReactFlowProvider, Controls } from 'reactflow';
import InfoNode from './InfoNode';
import { Box, Button } from '@chakra-ui/react'
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import { flat } from '../../lib/functions/flat'

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 372
const nodeHeight = 176

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};


const NodeFlow = ({ data }) => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [ref, { height, width }] = useMeasure();
  const nodeTypes = useMemo(() => ({ special: InfoNode }), []);

  useEffect(() => {
    const flatEdges = flat(data.edges)
    const initialNodes = [
      ...data.nodes.map((node) => {
        return {
          id: node.id,
          type: 'special',
          data: {
            ...node
          },
          position: { x: 0, y: 0 },
        }
      })
    ]
    const initialEdges = [
      ...flatEdges.map((edge, i) => {
        return {
          ...edge,
          id: `e${i}`,
          animated: true,
          type: 'smoothstep',
          arrowHeadType: 'arrow',
          style: { strokeWidth: 2 },
          labelStyle: { textTransform: 'uppercase' },
        }
      })
    ];
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );

    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [edges, nodes, setEdges, setNodes]
  );

  return (
    <Box ref={ref} w={'full'} h={'90vh'} overflow={'hidden'} flexGrow={1} position="relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        />
        <Controls
          style={{ boxShadow: 'none' }}
        />
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          zIndex: '10',
          fontSize: '12px',
        }}>
          <Button size='xs' mr={2} onClick={() => onLayout('TB')}>vertical layout</Button>
          <Button size='xs' onClick={() => onLayout('LR')}>horizontal layout</Button>
        </div>
      </ReactFlowProvider>
    </Box>
  );
};

export default NodeFlow;
