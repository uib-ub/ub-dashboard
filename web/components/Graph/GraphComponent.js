import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getSelectionBounds, boundsToViewport } from "@sayari/trellis";
import { withResizeDetector } from "react-resize-detector";
import * as Force from "@sayari/trellis/layout/force";
import { Renderer } from "@sayari/trellis/bindings/react/renderer";
import { styleNode } from "./utils";

const force = Force.Layout();

const Graph = ({ edges, nodes, width, height, targetRef }) => {
  const _width = useRef(width);
  _width.current = width;

  const _height = useRef(width);
  _height.current = height;

  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
    x: 0,
    y: 0,
    zoom: 1,
    hoverNode: undefined,
    hoverEdge: undefined
  });

  useEffect(() => {
    force({ nodes, edges }).then(({ nodes, edges }) => {
      const { x, y, zoom } = boundsToViewport(getSelectionBounds(nodes, 60), { width: _width.current, height: _height.current });
      setGraph((graph) => ({ ...graph, nodes, edges, x, y, zoom }));
    });
  }, []);

  const onNodeDrag = useCallback(({ nodeX, nodeY, target: { id, x = 0, y = 0 } }) => {
    setGraph((graph) => ({
      ...graph,
      nodes: graph.nodes.map((node) => (node.id === id ? { ...node, x: nodeX, y: nodeY } : node))
    }));
  }, []);
  const onViewportDrag = useCallback(({ viewportX: x, viewportY: y }) => {
    setGraph((graph) => ({ ...graph, x, y }));
  }, []);
  const onViewportWheel = useCallback(({ viewportX: x, viewportY: y, viewportZoom: zoom }) => {
    setGraph((graph) => ({ ...graph, x, y, zoom }));
  }, []);
  const onNodePointerEnter = useCallback(({ target: { id } }) => {
    setGraph((graph) => ({ ...graph, hoverNode: id }));
  }, []);
  const onNodePointerLeave = useCallback(() => {
    setGraph((graph) => ({ ...graph, hoverNode: undefined }));
  }, []);
  const onEdgePointerEnter = useCallback(({ target: { id } }) => {
    setGraph((graph) => ({ ...graph, hoverEdge: id }));
  }, []);
  const onEdgePointerLeave = useCallback(() => {
    setGraph((graph) => ({ ...graph, hoverEdge: undefined }));
  }, []);

  const styledNodes = useMemo(() => {
    return graph.nodes.map((node) => styleNode(node, graph.hoverNode === node.id));
  }, [graph.nodes, graph.hoverNode]);

  const styledEdges = useMemo(() => {
    return graph.edges.map((edge) => ({
      ...edge,
      style: edge.id === graph.hoverEdge ? { width: 4, arrow: "forward" } : { width: 1, arrow: "forward", stroke: "#272643" }
    }));
  }, [graph.edges, graph.hoverEdge]);

  return (
    <div
      ref={targetRef}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh"
      }}
    >
      {width === undefined || height === undefined ? (
        <span />
      ) : (
        <Renderer
          width={width}
          height={height}
          nodes={styledNodes}
          edges={styledEdges}
          x={graph.x}
          y={graph.y}
          zoom={graph.zoom}
          onNodeDrag={onNodeDrag}
          onNodePointerEnter={onNodePointerEnter}
          onNodePointerLeave={onNodePointerLeave}
          onEdgePointerEnter={onEdgePointerEnter}
          onEdgePointerLeave={onEdgePointerLeave}
          onViewportDrag={onViewportDrag}
          onViewportWheel={onViewportWheel}
        />
      )}
    </div>
  );
};

export default withResizeDetector(Graph);
