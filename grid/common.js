export const getDistance = (point1, point2) => {
  const { x: x1, y: y1 } = point1;

  const { x: x2, y: y2 } = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const insideRect = (point, rect) => {
  const { x, y } = point;
  if (
    x > rect.x &&
    x < rect.x + rect.size &&
    y > rect.y &&
    y < rect.y + rect.size
  ) {
    return true;
  }
  return false;
};
