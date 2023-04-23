export const drawFillRectangle = (rectangle, ctxRef) => {
    const { x1, y1, w, h, color } = rectangle

    ctxRef.current.beginPath()
    ctxRef.current.fillStyle = color
    ctxRef.current.fillRect(x1, y1, w, h)
}

export const drawFillSquare = (square, ctxRef) => {
    const { x1, y1, s, color } = square

    ctxRef.current.beginPath()
    ctxRef.current.fillStyle = color
    ctxRef.current.fillRect(x1, y1, s, s)
}

export const drawFillTriangle = (triangle, ctxRef) => {
    const { x1, y1, x2, y2, x3, y3, color } = triangle;
  
    ctxRef.current.beginPath()
    ctxRef.current.fillStyle = color;
    ctxRef.current.moveTo(x1, y1)
    ctxRef.current.lineTo(x2, y2)
    ctxRef.current.lineTo(x3, y3)
    ctxRef.current.closePath()
    ctxRef.current.fill()
}

export const drawFillCircle = (circle, ctxRef) => {
    const { x1, y1, r, color } = circle;
  
    ctxRef.current.beginPath();
    ctxRef.current.fillStyle = color;
    ctxRef.current.arc(x1, y1, r, 0, 2 * Math.PI);
    ctxRef.current.fill();
}

export const RectangleHitDetector = (dragTarget, rectangle, x, y) => {
    const { x1, y1, h, w} = rectangle

    if (x >= x1 && x <= x1 + w && y >= y1 && y <= y1 + h) {
        dragTarget.current = rectangle
        return true
    }
    return false
}

export const SquareHitDetector = (dragTarget, square, x, y) => {
    const { x1, y1, s } = square;
    
    if (x >= x1 && x <= x1 + s && y >= y1 && y <= y1 + s) {
        dragTarget.current = square;
        return true;
    }
    return false;
}

export const TriangleHitDetector = (dragTarget, triangle, x, y) => {
    const { x1, y1, x2, y2, x3, y3 } = triangle

    const d1 = (x - x1) * (y2 - y1) - (x2 - x1) * (y - y1)
    const d2 = (x - x2) * (y3 - y2) - (x3 - x2) * (y - y2)
    const d3 = (x - x3) * (y1 - y3) - (x1 - x3) * (y - y3)
    const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0)
    const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0)
    if (!(has_neg && has_pos)) {
        dragTarget.current = triangle
        return true
    }
    return false
}

export const CircleHitDetector = (dragTarget, circle, x, y) => {
    const { x1, y1, r } = circle

    const dx = x - x1
    const dy = y - y1
    const distanceSquared = (dx * dx) + (dy * dy)
    if (distanceSquared < r * r) {
        dragTarget.current = circle
        return true;
    }
    return false;
}