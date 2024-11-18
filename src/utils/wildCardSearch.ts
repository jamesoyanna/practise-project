// Function for wildcard search
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function wildCardSearch(
    list: Array<Record<string, string | number>>, // Array of objects to search through
    input: string,
    specifyKey?: string // Optional parameter to specify a specific key for search
) {
    // Function to search text within each item
    const searchText = (item: Record<string, string | number>) => {
        for (const key in item) {
            if (item[specifyKey ? specifyKey : key] == null) {
                // Skip if the specified key (or any key) is null or undefined
                continue
            }
            if (
                // Check if the text in the specified key (or any key) contains the input text (case insensitive)
                item[specifyKey ? specifyKey : key]
                    .toString()
                    .toUpperCase()
                    .indexOf(input.toString().toUpperCase()) !== -1
            ) {
                return true // Return true if a match is found
            }
        }
    }
    // Filter the list to include only items that match the search text
    const result = list.filter((value) => searchText(value))
    return result // Return the filtered result
}
