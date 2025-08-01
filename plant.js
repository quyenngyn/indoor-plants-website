"use strict";

class Plant {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.data = [];
  }

  addData(month, leafCount) {
    this.data.push({ month, leafCount });
  }

  getName() {
    return this.name;
  }

  getColor() {
    return this.color;
  }

  getData() {
    return this.data;
  }

  getGrowthRate() {
    const sortedData = this.data.sort((a, b) => a.month - b.month);
    let totalGrowth = 0;

    for (let i = 1; i < sortedData.length; i++) {
      totalGrowth += sortedData[i].leafCount - sortedData[i - 1].leafCount;
    }

    return totalGrowth / (sortedData.length - 1);
  }
}

export { Plant };

