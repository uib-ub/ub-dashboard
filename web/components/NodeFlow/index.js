import React, { useState, useCallback } from 'react';
import { useMeasure } from "react-use";
import { Box } from '@chakra-ui/react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  isNode,
  Background,
} from 'react-flow-renderer';
import InfoNode from './InfoNode';
import dagre from 'dagre';

const position = { x: 20, y: 0 };
const edgeType = 'smoothstep';

const nodeTypes = {
  special: InfoNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 172;

const getLayoutedElements = (elements, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

function flat(array) {
  var result = [];
  array.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
}

export default function NodeFlow({ data }) {
  const [ref, { height, width }] = useMeasure();
  const edges = flat(data.edges)

  const initialElements = [
    ...data.nodes.map((node, index) => {
      return {
        id: node.id,
        type: 'special',
        data: {
          ...node
        },
        position: position,
      }
    }),
    ...edges.map((edge, i) => {
      return {
        ...edge,
        id: `e${i}`,
        animated: true,
        type: edgeType,
      }
    })
  ];
  const layoutedElements = getLayoutedElements(initialElements);

  const [elements, setElements] = useState(layoutedElements);
  const onConnect = (params) =>
    setElements((els) =>
      addEdge({ ...params, type: 'smoothstep', animated: true }, els)
    );
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setElements(layoutedElements);
    },
    [elements]
  );

  return (
    <Box ref={ref} minH={'full'} overflow={'hidden'}>
      <Box h={height} w={width} flexGrow={1} position="relative">
        <ReactFlowProvider>
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            connectionLineType="smoothstep"
          />
          <Background color="#aaa" gap={16} />
          {/* <div className={styles.controls}>
            <button onClick={() => onLayout('TB')}>vertical layout</button>
            <button onClick={() => onLayout('LR')}>horizontal layout</button>
          </div> */}
        </ReactFlowProvider>
      </Box>
    </Box>
  )
}

