// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const paginate = (array: Array<any>, pageSize: number, pageNumber: number) => {
    // Calculate the start index for the current page
    const startIndex = (pageNumber - 1) * pageSize;
    // Calculate the end index for the current page
    const endIndex = pageNumber * pageSize;
    // Return the portion of the array corresponding to the current page
    return array.slice(startIndex, endIndex);
}

export default paginate;
