export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  try {
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error)
    return null
  }
}

