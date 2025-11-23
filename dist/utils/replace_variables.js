function replaceVars(str, data = {}) {
    return str.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? `{${key}}`);
}

export { replaceVars };
