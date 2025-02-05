export default class NumberHelper {
  static getRangeAscending(start: number, end: number): number[] {
    return Array.from(Array(end - start + 1).keys()).map((x) => x + start);
  }

  static getRangeDescending(start: number, end: number): number[] {
    return Array.from(Array(end - start + 1).keys()).map((x) => end - x);
  }
}
