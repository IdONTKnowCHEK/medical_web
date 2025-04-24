export const splitText = (text: string) => {
  return text
    .split(/(\s+|[\u4e00-\u9fff]|[，。！？；])/g)
    .filter(Boolean)
    .map((word) => ({ text: word }));
};
