export const getDistance = (point1, point2) => {
  const { x: x1, y: y1 } = point1;

  const { x: x2, y: y2 } = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const handleCollision = (dotA, dotB) => {
  const impact = {
    x: dotB.x - dotA.x,
    y: dotB.y - dotA.y,
  };

  const distance = getDistance(dotA, dotB);
  const total_radius = dotA.radius + dotB.radius;
  if (distance < total_radius) {
    const overlap = total_radius - distance;

    const scaleFactor = (overlap * 0.5) / distance;

    const shift = {
      x: impact.x * scaleFactor,
      y: impact.y * scaleFactor,
    };

    dotA.x = dotA.x - shift.x;
    dotA.y = dotA.y - shift.y;

    dotB.x = dotB.x + shift.x;
    dotB.y = dotB.y + shift.y;

    impact.x = dotB.x - dotA.x;
    impact.y = dotB.y - dotA.y;

    const mA = dotA.mass;
    const mB = dotB.mass;

    const denominator = (mA + mB) * total_radius * total_radius;

    const vDiff = {
      x: dotB.velocity.x - dotA.velocity.x,
      y: dotB.velocity.y - dotA.velocity.y,
    };

    const numeratorAx = 2 * mB * vDiff.x * impact.x;
    const numeratorAy = 2 * mB * vDiff.y * impact.y;

    const deltaVa = {
      x: (numeratorAx / denominator) * impact.x,
      y: (numeratorAy / denominator) * impact.y,
    };

    const vAFinal = {
      x: dotA.velocity.x + deltaVa.x,
      y: dotA.velocity.y + deltaVa.y,
    };
    dotA.velocity = vAFinal;

    const numeratorBx = 2 * mA * (vDiff.x * -1) * (impact.x * -1);
    const numeratorBy = 2 * mA * (vDiff.y * -1) * (impact.y * -1);

    const deltaVb = {
      x: (numeratorBx / denominator) * (impact.x * -1),
      y: (numeratorBy / denominator) * (impact.y * -1),
    };

    const vBfinal = {
      x: dotB.velocity.x + deltaVb.x,
      y: dotB.velocity.y + deltaVb.y,
    };
    dotB.velocity = vBfinal;
  }
};
