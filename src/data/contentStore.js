const STORAGE_KEY = "medha-site-content";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDeep(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? clone(savedValue) : clone(defaultValue);
  }

  if (defaultValue && typeof defaultValue === "object") {
    const result = {};
    const keys = new Set([
      ...Object.keys(defaultValue),
      ...Object.keys(savedValue || {}),
    ]);

    keys.forEach((key) => {
      const defaultChild = defaultValue[key];
      const savedChild = savedValue ? savedValue[key] : undefined;

      if (savedChild === undefined) {
        result[key] = clone(defaultChild);
        return;
      }

      if (Array.isArray(defaultChild) || (defaultChild && typeof defaultChild === "object")) {
        result[key] = mergeDeep(defaultChild, savedChild);
        return;
      }

      result[key] = savedChild;
    });

    return result;
  }

  return savedValue === undefined ? clone(defaultValue) : savedValue;
}

export function loadContent(defaultContent) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return clone(defaultContent);
    }

    const parsed = JSON.parse(raw);
    return mergeDeep(defaultContent, parsed);
  } catch {
    return clone(defaultContent);
  }
}

export function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
}
