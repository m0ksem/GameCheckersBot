module.exports = {
  isRangeOne(fromX, fromY, toX, toY) {
    return Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 1;
  },

  isRangeTwo(fromX, fromY, toX, toY) {
    return Math.abs(fromX - toX) === 2 && Math.abs(fromY - toY) === 2;
  },

  isDiagonal(fromX, fromY, toX, toY) {
    return Math.abs(fromX - toX) === Math.abs(fromY - toY);
  },

  coordinatesBetween(fromX, fromY, toX, toY) {
    return {
      x: ((toX + fromX) / 2).toFixed(),
      y: ((toY + fromY) / 2).toFixed(),
    };
  },

  areCoordinatesEqual(coords1, coords2) {
    return coords1.x === coords2.x && coords1.y === coords2.y;
  },

  isArrayIncludesCoords(array, coords) {
    for (let i = 0; i < array.length; i += 1) {
      const arrayCoords = array[i];
      if (this.areCoordinatesEqual(arrayCoords, coords)) { return true; }
    }
    return false;
  },

  getNumberSign(number) {
    return Math.abs(number) / number;
  },
};
