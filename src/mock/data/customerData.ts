//FAKE DATA FOR TABLE ITEM IN B2C AND B2B
export const customerB2cData = [
    {
        id: 1,
        customerName: 'Emmanuel Akpan',
        customerId: 'gr43252',
        phoneNumber: '09012345678',
        address: '42 Ifelodun Str, Ajayi Road,Ogba',
        dateOnboarded: '22nd Jan, 2023',
        virtualWalletBalance: '400,112.00',
        totalGasQuantityPurchased: '500.140 Kg',
        totalGasAmount: '112,000',
        hub: 'Ikeja',
        totalTransactionAmount: ' 425,500.00',
        debt: '0.00',
        assets: [
            {
                gasCurrentReading: 2,
                smartDeviceId: 'hfqa88',
                cylinderId: 'CI002',
                totalGas: 25,
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundMethod: 'Giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        transactionHistory: [
            {
                id: 1,
                invoiceId: 'ID601',
                transactionDetails: 'Regulator',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st jan,2023',
                status: 'unpaid',
            },
            {
                id: 2,
                invoiceId: 'ID071',
                transactionDetails: 'Gas Fee (12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Dec,2023',
                status: 'paid',
            },
        ],
    },
    {
        id: 2,
        customerName: 'Dammie Komolafe',
        // gasCurrentReading: 2.5,
        customerId: 'ir49252',
        phoneNumber: '08087345678',
        address: '2 Ikeja Str, Ajah',
        dateOnboarded: '22nd Jan, 2023',
        virtualWalletBalance: '400,112.00',
        totalGasQuantityPurchased: '500.140 Kg',
        totalGasAmount: '322,000',
        hub: 'Yaba',
        totalTransactionAmount: ' 425,500.00',
        debt: '0.00',
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],
        assets: [
            {
                gasCurrentReading: 2.5,
                smartDeviceId: 'SD1234',
                cylinderId: 'CI002',
                totalGas: 25,
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
            },
        ],

        transactionHistory: [
            {
                invoiceId: 'ID691',
                transactionDetails: 'Hose',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st May,2023',
                status: 'unpaid',
            },
            {
                invoiceId: 'ID871',
                transactionDetails: 'Homefort Cylinder (12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Jun,2023',
                status: 'paid',
            },
        ],
    },
    {
        id: 3,

        customerName: 'Faith Oduaran',
        customerId: 'ir49452',
        phoneNumber: '08087345678',
        address: '2 Ikeja Str, Surulere',
        dateOnboarded: '22nd Jan, 2023',
        virtualWalletBalance: '400,112.00',
        totalGasQuantityPurchased: '500.140 Kg',
        hub: 'Ajah',
        totalTransactionAmount: ' 425,500.00',
        totalGasAmount: '1,342,000',
        assets: [
            {
                gasCurrentReading: 4,
                smartDeviceId: 'hfqa13',
                cylinderId: 'CI002',
                totalGas: 25,
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],
        debt: '0.00',

        transactionHistory: [
            {
                invoiceId: 'ID091',
                transactionDetails: 'Annual Subscription',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Apr,2022',
                status: 'paid',
            },
            {
                invoiceId: 'ID271',
                transactionDetails: 'Homefort Cylinder (12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Feb,2022',
                status: 'paid',
            },
        ],
    },
    {
        id: 4,
        customerName: 'Emmanuel Odogie',
        customerId: 'oq87632',
        phoneNumber: '08123456789',
        address: '5 Opebi St, Ikeja',
        dateOnboarded: '15th Mar, 2022',
        totalGasAmount: '912,560',
        virtualWalletBalance: '320,500.00',
        totalGasQuantityPurchased: '700.250 Kg',
        hub: 'Ikeja',
        totalTransactionAmount: ' 600,200.00',
        debt: '50,000.00',
        assets: [
            {
                gasCurrentReading: 5.5,
                smartDeviceId: 'hfqa19',
                cylinderId: 'CI002',
                totalGas: 25,
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        transactionHistory: [
            {
                invoiceId: 'ID501',
                transactionDetails: 'Hose',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '1st Nov,2023',
                status: 'unpaid',
            },
            {
                invoiceId: 'ID871',
                transactionDetails: 'Gas Fee(12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Feb,2022',
                status: 'paid',
            },
        ],
    },
    {
        id: 5,
        customerName: 'Edward Akpan',
        customerId: 'ut37294',
        phoneNumber: '08098765432',
        address: '8 Allen Ave, Ikeja',
        dateOnboarded: '10th Jul, 2023',
        virtualWalletBalance: '600,300.00',
        totalGasQuantityPurchased: '850.370 Kg',
        totalGasAmount: '712,000',
        hub: 'Ajah',
        totalTransactionAmount: ' 780,900.00',
        debt: '0.00',
        assets: [
            {
                gasCurrentReading: 6.5,
                smartDeviceId: 'hfqa15',
                totalGas: 12,
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        cylinderId: 'CI002',
        transactionHistory: [
            {
                invoiceId: 'ID601',
                transactionDetails: 'Regulator',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '9th Dec,2023',
                status: 'paid',
            },
            {
                invoiceId: 'ID031',
                transactionDetails: 'Gas Fee(12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Feb,2022',
                status: 'paid',
            },
        ],
    },
    {
        id: 6,

        customerName: 'Emeka Oton',
        customerId: 'wp93147',
        phoneNumber: '09011223344',
        totalGasAmount: '672,000',
        address: '15 Maryland Mall, Maryland',
        dateOnboarded: '5th Sep, 2022',
        virtualWalletBalance: '200,000.00',
        totalGasQuantityPurchased: '400.200 Kg',
        hub: 'Ikeja',
        totalTransactionAmount: ' 320,400.00',
        debt: '20,000.00',
        assets: [
            {
                gasCurrentReading: 8,
                smartDeviceId: 'hfqa32',
                totalGas: 12.5,
                cylinderId: 'CI002',
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
                cylinderId: 'CI002',
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',

                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        transactionHistory: [
            {
                invoiceId: 'ID101',
                transactionDetails: 'Hose',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '9th Sep,2023',
                status: 'uncredited',
            },
            {
                invoiceId: 'ID081',
                transactionDetails: 'Annual Subscription',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Mar,2022',
                status: 'credited',
            },
        ],
    },
    {
        id: 7,

        customerName: 'Yahaya Bello',
        customerId: 'tl84920',
        phoneNumber: '07055667788',
        address: '24 Marina, Lagos Island',
        dateOnboarded: '18th Dec, 2023',
        virtualWalletBalance: '750,600.00',
        totalGasQuantityPurchased: '920.480 Kg',
        hub: 'Yaba',
        totalTransactionAmount: ' 900,000.00',
        totalGasAmount: '862,000',
        assets: [
            {
                gasCurrentReading: 2.5,
                smartDeviceId: 'hfqa40',
                totalGas: 25,
                cylinderId: 'CI002',
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
                cylinderId: 'CI002',
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'credited',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],
        debt: '10,000.00',
        cylinderId: 'CI002',

        transactionHistory: [
            {
                invoiceId: 'ID941',
                transactionDetails: 'Hose',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '9th Jul,2023',
                status: 'credited',
            },
            {
                invoiceId: 'ID031',
                transactionDetails: 'Gas Fee(12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Feb,2022',
                status: 'credited',
            },
        ],
    },
    {
        id: 8,
        customerName: 'Gift Kackson',
        customerId: 're57293',
        phoneNumber: '08011223344',
        address: '10 Adetokunbo St, Victoria Island',
        dateOnboarded: '3rd Feb, 2022',
        virtualWalletBalance: '400,900.00',
        totalGasQuantityPurchased: '600.300 Kg',
        totalGasAmount: '672,000',
        hub: 'Ikeja',
        totalTransactionAmount: ' 550,700.00',
        debt: '30,000.00',
        assets: [
            {
                gasCurrentReading: 11,
                smartDeviceId: 'hfqa11',
                totalGas: 12.5,
                cylinderId: 'CI002',
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
                cylinderId: 'CI002',
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'credited',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        transactionHistory: [
            {
                invoiceId: 'ID671',
                transactionDetails: 'Regulator',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '9th Dec,2023',
                status: 'paid',
            },
            {
                invoiceId: 'ID031',
                transactionDetails: 'Homefort Gas Cylinder(12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Feb,2023',
                status: 'paid',
            },
        ],
    },
    {
        id: 9,
        customerName: 'Oto Jack',
        customerId: 'xy71983',
        phoneNumber: '09099887766',
        address: '18 Ajose Adeogun St, Victoria Island',
        dateOnboarded: '20th May, 2023',
        virtualWalletBalance: '150,200.00',
        totalGasQuantityPurchased: '300.150 Kg',
        totalGasAmount: '12,512,000',
        hub: 'Ajah',
        totalTransactionAmount: ' 250,300.00',
        debt: '0.00',
        assets: [
            {
                gasCurrentReading: 2.5,
                smartDeviceId: 'hfqa09',
                cylinderId: 'CI002',
                totalGas: 25,
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
                cylinderId: 'CI002',
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        transactionHistory: [
            {
                invoiceId: 'ID691',
                transactionDetails: 'Regulator',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '19th Oct,2022',
                status: 'paid',
            },
            {
                invoiceId: 'ID431',
                transactionDetails: 'Homefort Gas Cylinder(12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Nov,2023',
                status: 'paid',
            },
        ],
    },
    {
        id: 10,

        customerName: 'Emma Naira',
        customerId: 'pq62935',
        phoneNumber: '08133445566',
        address: '9 Bourdillon Road, Ikoyi',
        dateOnboarded: '12th Oct, 2022',
        virtualWalletBalance: '270,800.00',

        totalGasQuantityPurchased: '500.180 Kg',
        totalGasAmount: '542,000',
        hub: 'Ikeja',
        totalTransactionAmount: ' 400,600.00',
        debt: '15,000.00',
        assets: [
            {
                gasCurrentReading: 11,
                smartDeviceId: 'hfqa11',
                cylinderId: 'CI002',
                totalGas: 12.5,
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
                cylinderId: 'CI002',
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        transactionHistory: [
            {
                invoiceId: 'ID651',
                transactionDetails: 'Regulator',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '9th Dec,2023',
                status: 'paid',
            },
            {
                invoiceId: 'ID231',
                transactionDetails: 'Homefort Gas Cylinder(12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                status: 'paid',
            },
        ],
    },
    {
        id: 11,

        customerName: 'Eleos Jackson',
        customerId: 'mn81937',
        phoneNumber: '07099887766',
        address: '7 Onikan Road, Lagos Island',
        dateOnboarded: '8th Apr, 2023',
        virtualWalletBalance: '180,400.00',
        totalGasAmount: '122,000',
        totalGasQuantityPurchased: '350.220 Kg',
        hub: 'Yaba',
        totalTransactionAmount: ' 300,800.00',
        debt: '5,000.00',
        assets: [
            {
                gasCurrentReading: 2.5,
                smartDeviceId: 'hfqa40',
                totalGas: 25,
                cylinderId: 'CI002',
            },
            {
                gasCurrentReading: 6,
                smartDeviceId: 'SD5678',
                totalGas: 25,
                cylinderId: 'CI002',
            },
        ],
        walletHistory: [
            {
                fundId: 'id001',
                amount: '30,000',
                fundMethod: 'Gas Fee',
                status: 'paid',
                date: '22 Feb, 2023',
                time: '3:15pm',
            },
            {
                fundId: 'id002',
                amount: '40,000',
                fundAmount: 'giveaway',
                status: 'debited',
                date: '21 Jan, 2023',
                time: '1:20pm',
            },
        ],

        transactionHistory: [
            {
                invoiceId: 'ID621',
                transactionDetails: 'Regulator',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '9th Dec,2023',
                status: 'paid',
            },
            {
                invoiceId: 'ID077',
                transactionDetails: 'Homefort Gas Cylinder(12Kg)',
                totalGasQuantityDelivered: 950,
                totalGasRemnant: 180,
                gasQuantityBillable: 770,
                sellingPrice: 800,
                gasFee: 616000,
                deliveryFee: 7000,
                totalAmount: 623000,
                regulatorUnits: 1,
                regulatorPrice: 1500,
                hoseUnits: 2,
                hosePrice: 2000,
                date: '21st Feb,2023',
                status: 'paid',
            },
        ],
    },
]
