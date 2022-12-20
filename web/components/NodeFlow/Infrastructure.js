import React, { useMemo, useState } from 'react';
import { useMeasure } from "react-use";
import { Box } from '@chakra-ui/react'
import ReactFlow, {
  ReactFlowProvider,
  isNode,
  Background,
  Controls,
} from 'reactflow';
import InfoNode from './InfoNode';
import dagre from 'dagre';
import { flatten, groupBy } from 'lodash-es';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const NODE_DEFAULT_WIDTH = 372;
const NODE_DEFAULT_HEIGHT = 176;

const getLayoutedElements = (elements) => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: el.__rf?.width ?? NODE_DEFAULT_WIDTH,
        height: el.__rf?.height ?? NODE_DEFAULT_HEIGHT,
      });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = 'top';
      el.sourcePosition = 'bottom';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x:
          nodeWithPosition.x -
          nodeWithPosition.width / 2 +
          Math.random() / 1000,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      };
    }

    return el;
  });
};

/**
 * Our edges are nested, so we need to deeply flatten the array
 * @param {*} array 
 * @returns array
 */
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


export default function NodeFlowInfrastrucure({ data }) {
  const [ref, { height, width }] = useMeasure();
  const nodeTypes = useMemo(() => ({ special: InfoNode }), []);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.project({ x: width, y: height });
    reactFlowInstance.fitView({ padding: 0.15, includeHiddenNodes: true });
  };


  const edges = flat(data.edges)
  const nodes = flat(data.nodes)
  /* console.log(JSON.stringify(data, null, 2))
  console.log(JSON.stringify(nodes, null, 2))
  console.log(JSON.stringify(edges, null, 2)) */

  const initialElements = [
    ...nodes.map((node) => {
      return {
        id: node.id,
        type: 'special',
        data: {
          ...node
        },
        position: { x: 0, y: 0 },
      }
    }),
    ...edges.map((edge, i) => {
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

  const layoutedElements = getLayoutedElements(initialElements);

  const [elements, setElements] = useState(layoutedElements);

  return (
    <Box ref={ref} w={'full'} h={'90vh'} overflow={'hidden'} flexGrow={1} position="relative">
      {/* <Box h={height} w={width} overflow={'hidden'} flexGrow={1} position="relative" > */}
      <ReactFlowProvider>
        <Controls
          style={{ top: 10, left: 10, boxShadow: 'none' }}
        />
        <ReactFlow
          onLoad={onLoad}
          elements={elements}
          nodeTypes={nodeTypes}
          connectionLineType="smoothstep"
          nodesConnectable={false}
        />
        <Background color="#777" gap={16} />
      </ReactFlowProvider>
      {/* </Box> */}
    </Box>
  )
}
