const wordsToCapitalize = [
  'igcse',
  'ial',
  'gce',
  'o',
  'a',
  'gcse',
  'ict',
  'as',
  'a2',
];

export default (filename) => {
  const extensionIndex = filename.lastIndexOf('.');
  if (extensionIndex !== -1) {
    filename = filename.slice(0, extensionIndex);
  }

  const dashRemoved = filename.replace(/-/g, ' ');
  let capitalized = dashRemoved.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });

  wordsToCapitalize.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    capitalized = capitalized.replace(regex, word.toUpperCase());
  });

  return capitalized;
};