import axios from "axios";

// Define the API URL
const apiUrl = 'https://apibankingonesandbox.icicibank.com/api/v1/composite-payment';

// Define the request headers and body
const headers = {
    'apikey': 'a1b2c33d4e5f6g7h8i9jakblc', // Replace with your actual API key
    'x-priority': '1000',
    'Content-Type': 'application/json'
};

const body = {
    mobile: '7000000023',
    'device-id': '190160190160190160190160',
    'seq-no': '5DC866EA6ADC427',
    'account-provider': '74',
    'payee-va': 'testo1@icici',
    'payer-va': 'uattesting0014@icici',
    'profile-id': '2995692',
    amount: '1.00',
    'pre-approved': 'P',
    'use-default-acc': 'D',
    'default-debit': 'N',
    'default-credit': 'N',
    'payee-name': 'MEHUL',
    mcc: '6011',
    'merchant-type': 'ENTITY',
    'txn-type': 'merchantToPersonPay',
    'channel-code': 'MICICI',
    remarks: 'none',
    crpId: 'API3',
    aggrID: 'AGGR0008',
    userID: 'USER2',
    vpa: 'testo1@icici',
    'payee-mcc': '6511'
};

// Make the POST request
axios.post(apiUrl, body, { headers })
    .then(response => {
        console.log('Response:', response.data); // Log the response from the API
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message); // Log error if any
    });
