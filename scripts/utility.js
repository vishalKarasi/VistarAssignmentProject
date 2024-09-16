const colors = ["#4700FF", "#9E04C5", "#F3CB3B", "#008080"];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const getColor = (index) => colors[index % colors.length];
