// Define a type for primitive values
type Primitive = string | number | boolean

// Define a type for a primer function that takes a primitive value and returns a primitive value
export type Primer = (value: Primitive) => Primitive

// Function to sort an array of objects by a specific field
const sortBy = <T extends Record<string, Primitive>>(
    field: keyof T,
    reverse: boolean,
    primer?: Primer
) => {
    // Define a key function based on the primer function (if provided)
    const key = primer
        ? function (x: T) {
              return primer(x[field])
          }
        : function (x: T) {
              return x[field]
          }
    // Determine the sort order (ascending or descending)
    const isReverse = !reverse ? 1 : -1
    // Return a comparison function to be used by the sort method
    return function (a: T, b: T) {
        // Get the values to compare
        const valueA = key(a)
        const valueB = key(b)
        // Compare string values using localeCompare for proper sorting
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return isReverse * valueA.localeCompare(valueB)
        }
        // Fallback comparison for other types
        return isReverse * (valueA > valueB ? 1 : valueB > valueA ? -1 : 0)
    }
}

export default sortBy
