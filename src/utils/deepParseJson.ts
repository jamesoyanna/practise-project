// Function to check if a string is a valid number
const isNumString = (str: string): boolean => !isNaN(Number(str))

// Define types for JSON objects and arrays
type JsonObject = { [key: string]: unknown }
type JsonArray = Array<unknown>
type Json = JsonObject | JsonArray | string | number | boolean | null

// Function to deeply parse JSON data
function deepParseJson(jsonString: Json): Json {
    if (typeof jsonString === 'string') {
        // If the input is a string
        if (isNumString(jsonString)) {
            // If the string represents a number, return it as is
            return jsonString
        }
        try {
            // Try to parse the string as JSON and recursively call deepParseJson
            return deepParseJson(JSON.parse(jsonString))
        } catch (err) {
            // If parsing fails, return the original string
            return jsonString
        }
    } else if (Array.isArray(jsonString)) {
        // If the input is an array, recursively call deepParseJson for each element
        return jsonString.map((val) => deepParseJson(val as JsonArray))
    } else if (typeof jsonString === 'object' && jsonString !== null) {
        // If the input is an object, recursively call deepParseJson for each property
        return Object.keys(jsonString).reduce<JsonObject>((obj, key) => {
            const val = jsonString[key]
            // If the property value is a string representing a number, keep it as a string
            // Otherwise, recursively call deepParseJson
            obj[key] = isNumString(val as string)
                ? val
                : deepParseJson(val as number)
            return obj
        }, {})
    } else {
        // If the input is neither a string nor an object nor an array, return it as is
        return jsonString
    }
}

export default deepParseJson;
