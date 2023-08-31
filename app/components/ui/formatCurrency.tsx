

import React from 'react'


function formatCurrency(val: number) {
       return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(val)
    
    
}

export default formatCurrency