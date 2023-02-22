export const translateTeam = (value) => {
  if (value === 0) {
    return "Zero";
  }

  if (value < 10) {
    return "Low";
  }

  if (value >= 10 && value <= 15) {
    return "Medium";
  }

  return "High";
};

export const translateProduct = (value) => {
  if (value === 0) {
    return "Zero";
  }

  if (value < 7) {
    return "Low";
  }

  if (value >= 7 && value <= 12) {
    return "Medium";
  }

  return "High";
};

export const translateMarketing = (value) => {
  if (value === 0) {
    return "Zero";
  }

  if (value < 7) {
    return "Low";
  }

  if (value >= 7 && value <= 12) {
    return "Medium";
  }

  return "High";
};

export const translateDevelopment = (value) => {
  if (value === 0) {
    return "Zero";
  }

  if (value < 7) {
    return "Low";
  }

  if (value >= 7 && value <= 10) {
    return "Medium";
  }

  return "High";
};

export const translateTokenomics = (value) => {
  if (value === 0) {
    return "Zero";
  }

  if (value < 3) {
    return "Low";
  }

  if (value >= 3 && value <= 5) {
    return "Medium";
  }

  return "High";
};
