import React from 'react'
import Marquee from 'react-fast-marquee'

function Marquees() {
    return (
        <div className='bg-lime-300 py-2'>
            <Marquee>
                <div class="flex gap-10">
                    <h1 class="font-bold uppercase">FOR PRE ORDER NOW</h1>
                    <h1 class="font-bold uppercase">ADIDAS SAMBA GREEN 💚</h1>
                    <h1 class="font-bold uppercase">PHP 6800 ( BELOW MARKET PRICE ❌ )</h1>
                    <h1 class="font-bold uppercase">PHP 1000 DOWNPAYMENT TO PROCEED</h1>
                </div>
            </Marquee>
        </div>
    )
}

export default Marquees