import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import {  type Server } from 'miragejs'

// type CylinderSizeKey = '50kg' | '25kg' | '12.5kg' | 'Smart Device'


export default function inStockFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/instock/`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const instockData = schema.db.inStockData
        console.log('instock :', instockData)

        const sanitizeInstock = instockData.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeInstock
        let total = instockData.length

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, parseInt(pageSize), parseInt(pageIndex))

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    

    const keyMapping: { [key: string]: string } = {
        '12.5kg': 'twelve',
        '25kg': 'twentyFive',
        '50kg': 'fifty',
        'Smart Device': 'smartDevice'
    };

    server.get(`${apiPrefix}/instock/stats`, (schema) => {
        const instockData = schema.db.inStockData;
        console.log('data:', instockData);

        const result: { [key: string]: any } = {};

        instockData.forEach((cylinder: { CylinderSize: string; Status: string; CylinderID: string }) => {
            // Use the alternative name if available, otherwise use the original key
            const key = keyMapping[cylinder.CylinderSize] || cylinder.CylinderSize;

            if (!result[key]) {
                result[key] = {
                    filled: [],
                    unfilled: [],
                    totals: 0,
                };
            }

            if (cylinder.Status === 'filled') {
                result[key].filled.push(cylinder.CylinderID);
            } else {
                result[key].unfilled.push(cylinder.CylinderID);
            }
            result[key].totals++;
        });

        console.log(result);

        return result;
    });
}
