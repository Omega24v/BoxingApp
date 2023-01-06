export const loadData = (key: string) => {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return undefined
        }
        return JSON.parse(serializedData);
    } catch (e) {
        return undefined
    }
}

export const setData = (data: any, key: string) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (e) {
        // do nothing
    }
}
