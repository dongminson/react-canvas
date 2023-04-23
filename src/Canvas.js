import React, { 
    useRef, 
    useCallback, 
    useEffect 
} from 'react';
import { 
    drawFillRectangle, 
    drawFillSquare, 
    drawFillTriangle,
    drawFillCircle,
    RectangleHitDetector,
    SquareHitDetector,
    TriangleHitDetector,
    CircleHitDetector
} from './utils/helpers'

const Canvas = () => {
    const canvas = useRef(null)
    const ctxRef = useRef(null)
    const dragTarget = useRef(null)
    const shapes = [
        { type: 'rectangle', color: 'red', x1: 50, y1: 100, w: 100, h: 50 },
        { type: 'circle', color: 'blue', x1: 350, y1: 250, r: 50 },
        { type: 'square', color: 'yellow', x1: 350, y1: 50, s: 50 },
        { type: 'triangle', color: 'green', x1: 150, y1: 300, x2: 200, y2: 200, x3: 250, y3: 300 }
    ]
    let isSelected = false
    
    let startX = null
    let startY = null

    const draw = useCallback(() => {
        const drawShapes = (shape) => {
            switch(shape.type) {
                case 'rectangle':
                    drawFillRectangle(shape, ctxRef)
                break;
                case 'square':
                    drawFillSquare(shape, ctxRef)
                break;
                case 'triangle':
                    drawFillTriangle(shape, ctxRef)
                break
                case 'circle':
                    drawFillCircle(shape, ctxRef)
                break
                default:
                break
            }
        }
        ctxRef.current.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight)
        shapes.map(shape => drawShapes(shape))
    }, [shapes]);

    useEffect(() => {
        const canvasElement = canvas.current
        canvasElement.width = canvasElement.clientWidth
        canvasElement.height = canvasElement.clientHeight
        const ctx = canvasElement.getContext('2d')
        ctxRef.current = ctx
    }, [])

    useEffect(() => {
        draw()
    }, [draw])

    const ShapeHitDetector = (dragTarget, shape, x, y) => {
        switch(shape.type) {
            case 'rectangle':
                return RectangleHitDetector(dragTarget, shape, x, y)
            case 'square':
                return SquareHitDetector(dragTarget, shape, x, y)
            case 'triangle':
                return TriangleHitDetector(dragTarget, shape, x, y)
            case 'circle':
                return CircleHitDetector(dragTarget, shape, x, y)
            default:
                return false
        }
    }

    const isTargetHit = (x, y) => {
        let isHit = null
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i]
            isHit = ShapeHitDetector(dragTarget, shape, x, y)
            if (isHit) {
                break
            }
        }
        return isHit;
    }

    const handleMouseDown = e => {
        startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft)
        startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop)
        isSelected = isTargetHit(startX, startY)
    }

    const handleMouseMove = e => {
        if (!isSelected) {
            return
        }
        const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft)
        const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop)
        const dx = mouseX - startX
        const dy = mouseY - startY
        const target = dragTarget.current.type
        startX = mouseX
        startY = mouseY
        if (dragTarget.current && (target === 'rectangle' || target === 'circle' || target === 'square')) {
            dragTarget.current.x1 += dx
            dragTarget.current.y1 += dy
        } else if (dragTarget && target === 'triangle') {
            dragTarget.current.x1 += dx
            dragTarget.current.x2 += dx
            dragTarget.current.x3 += dx
            dragTarget.current.y1 += dy
            dragTarget.current.y2 += dy
            dragTarget.current.y3 += dy
        }
        draw()
    }

    const handleMouseUp = e => {
        dragTarget.current = null
        isSelected = false
    }

    const handleMouseOut = e => {
        handleMouseUp(e)
    }

    return (
        <canvas
            width="500"
            height="500"
            style={{ backgroundColor: "#f1f1f1", border: "1px solid #ccc" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
            ref={canvas}>
        </canvas>
    )
}

export default Canvas