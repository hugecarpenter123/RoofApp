// if(zawiera liczby po przecinku) wyrównaj do dwóch miejsc
export const baseFormat = (value: number): string => {
    return value.toFixed(value % 1 != 0 ? 2 : 0)
}

export const cm = (value: number): string => {
    return baseFormat(value) + " cm";
}

export const m2 = (value: number): string => {
    return baseFormat(value) + " m²"
}

export const deg = (value: number): string => {
    return baseFormat(value) + " °"
}
