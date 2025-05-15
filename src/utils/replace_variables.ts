export function replaceVars(str: string, data: Record<string, any> = {}) {
  return str.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? `{${key}}`);
}
