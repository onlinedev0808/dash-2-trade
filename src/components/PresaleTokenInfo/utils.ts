export const teamColor = (value) => {
  if (value === 0) {
    return "text-red";
  }

  if (value < 10) {
    return "text-orange";
  }

  if (value >= 10 && value <= 15) {
    return "text-yellow";
  }

  return "text-green";
};

export const productColor = (value) => {
  if (value === 0) {
    return "text-red";
  }

  if (value < 7) {
    return "text-orange";
  }

  if (value >= 7 && value <= 12) {
    return "text-yellow";
  }

  return "text-green";
};

export const marketingColor = (value) => {
  if (value === 0) {
    return "text-red";
  }

  if (value < 7) {
    return "text-orange";
  }

  if (value >= 7 && value <= 12) {
    return "text-yellow";
  }

  return "text-green";
};

export const developmentColor = (value) => {
  if (value === 0) {
    return "text-red";
  }

  if (value < 7) {
    return "text-orange";
  }

  if (value >= 7 && value <= 10) {
    return "text-yellow";
  }

  return "text-green";
};

export const tokenomicsColor = (value) => {
  if (value === 0) {
    return "text-red";
  }

  if (value < 3) {
    return "text-orange";
  }

  if (value >= 3 && value <= 5) {
    return "text-yellow";
  }

  return "text-green";
};
