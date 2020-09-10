const digitTo7SegmentMapping = {
  f: [1, 0, 0, 0, 1, 1, 1, 0],
  a: [1, 1, 1, 0, 1, 1, 1, 0],
  i: [0, 0, 0, 0, 1, 1, 0, 0],
  l: [0, 0, 0, 1, 1, 1, 0, 0],
  // Use of undefined for displaying a warning if digit not in mapping.
  undefined: [0, 0, 0, 0, 0, 0, 1, 0],
  "-": [0, 0, 0, 0, 0, 0, 1, 0],
  "1": [0, 1, 1, 0, 0, 0, 0, 0],
  "2": [1, 1, 0, 1, 1, 0, 1, 0],
  "3": [1, 1, 1, 1, 0, 0, 1, 0],
  "4": [0, 1, 1, 0, 0, 1, 1, 0],
  "5": [1, 0, 1, 1, 0, 1, 1, 0],
  "6": [1, 0, 1, 1, 1, 1, 1, 0],
  "7": [1, 1, 1, 0, 0, 0, 0, 0],
  "8": [1, 1, 1, 1, 1, 1, 1, 0],
  "9": [1, 1, 1, 0, 0, 1, 1, 0],
  "0": [1, 1, 1, 1, 1, 1, 0, 0],
};

export function digitTo7Segment(digit, point) {
  let _digit = digit;
  if (Object.keys(digitTo7SegmentMapping).indexOf(digit) === -1) {
    _digit = undefined;
  }
  const pointValue = point ? 1 : 0;
  const segments = digitTo7SegmentMapping[_digit].concat();
  if (_digit === undefined) {
    console.warn(`The '${digit}' character is not mapped to a 7 segment`);
  }
  segments[segments.length - 1] = segments[segments.length - 1] + pointValue;
  return segments;
}
