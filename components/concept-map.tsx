'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Info
} from 'lucide-react'
import { conceptNodes, conceptEdges } from '@/lib/sample-data'
import { Category } from '@/lib/types'

export function ConceptMap() {
  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const categoryColors: Record<Category, string> = {
    '不動産': '#4ade80',
    'ビジネス': '#38bdf8',
    '経済': '#a78bfa',
    '金融': '#fbbf24',
  }

  const categoryBgColors: Record<string, string> = {
    '不動産': 'bg-chart-1/20 text-chart-1 border-chart-1/50',
    'ビジネス': 'bg-chart-2/20 text-chart-2 border-chart-2/50',
    '経済': 'bg-chart-3/20 text-chart-3 border-chart-3/50',
    '金融': 'bg-chart-4/20 text-chart-4 border-chart-4/50',
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setSelectedNode(null)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true)
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getConnectedNodes = (nodeId: string) => {
    const connected = new Set<string>()
    conceptEdges.forEach(edge => {
      if (edge.from === nodeId) connected.add(edge.to)
      if (edge.to === nodeId) connected.add(edge.from)
    })
    return connected
  }

  const connectedToSelected = selectedNode ? getConnectedNodes(selectedNode) : new Set<string>()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              <h2 className="font-medium">金融概念の関係図</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
              <Button variant="secondary" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {(['不動産', 'ビジネス', '経済', '金融'] as Category[]).map(cat => (
              <div key={cat} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: categoryColors[cat] }}
                />
                <span className="text-xs text-muted-foreground">{cat}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Concept Map Canvas */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          <div 
            ref={containerRef}
            className="relative h-[500px] overflow-hidden cursor-grab active:cursor-grabbing bg-background"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg 
              width="100%" 
              height="100%" 
              style={{ 
                transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                transformOrigin: 'center center'
              }}
            >
              {/* Edges */}
              {conceptEdges.map((edge, idx) => {
                const fromNode = conceptNodes.find(n => n.id === edge.from)
                const toNode = conceptNodes.find(n => n.id === edge.to)
                if (!fromNode || !toNode) return null

                const isHighlighted = selectedNode && 
                  (edge.from === selectedNode || edge.to === selectedNode)
                const isDimmed = selectedNode && !isHighlighted

                return (
                  <g key={idx}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isHighlighted ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                      strokeWidth={isHighlighted ? 2 : 1}
                      opacity={isDimmed ? 0.2 : 1}
                      strokeDasharray={isHighlighted ? 'none' : '4 2'}
                    />
                    {/* Edge label */}
                    <text
                      x={(fromNode.x + toNode.x) / 2}
                      y={(fromNode.y + toNode.y) / 2 - 8}
                      textAnchor="middle"
                      fill="hsl(var(--muted-foreground))"
                      fontSize="10"
                      opacity={isDimmed ? 0.2 : 0.8}
                    >
                      {edge.relationship}
                    </text>
                  </g>
                )
              })}

              {/* Nodes */}
              {conceptNodes.map((node) => {
                const isSelected = selectedNode === node.id
                const isConnected = connectedToSelected.has(node.id)
                const isDimmed = selectedNode && !isSelected && !isConnected

                return (
                  <g 
                    key={node.id} 
                    className="cursor-pointer"
                    onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  >
                    {/* Node circle with glow effect when selected */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={36}
                        fill={categoryColors[node.category]}
                        opacity={0.2}
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={28}
                      fill="hsl(var(--card))"
                      stroke={categoryColors[node.category]}
                      strokeWidth={isSelected ? 3 : 2}
                      opacity={isDimmed ? 0.3 : 1}
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isDimmed ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'}
                      fontSize="11"
                      fontWeight="500"
                      opacity={isDimmed ? 0.3 : 1}
                    >
                      {node.label.length > 8 ? (
                        <>
                          <tspan x={node.x} dy="-0.3em">{node.label.slice(0, Math.ceil(node.label.length / 2))}</tspan>
                          <tspan x={node.x} dy="1.1em">{node.label.slice(Math.ceil(node.label.length / 2))}</tspan>
                        </>
                      ) : (
                        node.label
                      )}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Selected Node Info Panel */}
            {selectedNode && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72">
                <Card className="bg-card/95 backdrop-blur border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        {conceptNodes.find(n => n.id === selectedNode)?.label}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={categoryBgColors[conceptNodes.find(n => n.id === selectedNode)?.category || '金融']}
                      >
                        {conceptNodes.find(n => n.id === selectedNode)?.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2">関連する概念：</p>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from(connectedToSelected).map(nodeId => {
                        const node = conceptNodes.find(n => n.id === nodeId)
                        if (!node) return null
                        const edge = conceptEdges.find(e => 
                          (e.from === selectedNode && e.to === nodeId) ||
                          (e.to === selectedNode && e.from === nodeId)
                        )
                        return (
                          <Badge 
                            key={nodeId} 
                            variant="secondary" 
                            className="text-xs cursor-pointer"
                            onClick={() => setSelectedNode(nodeId)}
                          >
                            {node.label}
                            {edge && <span className="ml-1 opacity-60">（{edge.relationship}）</span>}
                          </Badge>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>概念をクリックすると関連する概念がハイライトされます。ドラッグで表示位置を移動できます。</p>
              <p>ズームコントロールで表示サイズを調整できます。</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
