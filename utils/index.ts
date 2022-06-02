export * from "./localstorage";
export * from "./symbols";
export * from "./request"

let num_unit = [
    "",
    "",
    "",
    "",
    "",
    "万",
    "万",
    "万",
    "万",
    "亿",
    "亿",
    "亿",
    "亿",
]
export const transform_num_unit = (num: number) => {
    let str = num.toString();
    let index = str.length > 4 ? str.length % 4 : str.length;
    let result: (string | number)[] = [];
    if (index === 0 && str.length >= 4) {
        index = 4;
    };
    let unit = num_unit[str.length];
    result.push(str.slice(0, index))
    if (unit === "万") {
        let float_num = parseInt(str.slice(index, index + 1));
        if (float_num > 0) {
            result.push(float_num)
        };
    };
    return result.join(".") + unit;
};