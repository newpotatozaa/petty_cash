<template>
    <div>
        <h1>Number Input with Maska</h1>
        <input v-maska:[maskOptions] v-model="formattedValue" />
        <p>Formatted Value: {{ formattedValue }}</p>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import { vMaska } from 'maska';
// import  numeral  from 'numeral';
export default {
    directives: { maska: vMaska },
    setup() {
        const formattedValue = ref('');

        // Define the mask options
        const maskOptions = ref({
            mask: '0.99',
            preProcess: val => val.replace(/[$,]/g, ''),
            postProcess: val => {
                if (!val) return ''

                const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)
                if (val.includes('.')) {
                    return (Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        // minimumFractionDigits: 2,
                        // maximumFractionDigits: 2,
                    }).format(val)
                        .slice(0, sub ? -sub : undefined)).replace('$', '')
                } else {
                    return (Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        // minimumFractionDigits: 2,
                        // maximumFractionDigits: 2,
                    }).format(val)
                        .slice(0, sub ? -sub : undefined)).replace('$', '')
                }

            },
            tokens: {
                0: {
                    pattern: /\d/,
                    multiple: true,
                },
                9: {
                    pattern: /\d/,
                    optional: true,
                },
            }
            // preProcess: val => val.replace(/[$,]/g, ''),
            // postProcess: val => {
            //     if (!val) return ''
            //     console.log(val)
            //     console.log(val.includes('.'))
            //     console.log("length-indexOf: " +( val.length - val.indexOf('.')).toString())
            //     var sub = 2 - (val.includes('.') ? val.length - val.indexOf('.') : 0)
            //     console.log('sub:'+sub)
            //     if(val.includes('.')) {
            //         return Intl.NumberFormat('en-US').format(val)
            //     } else {
            //         // return Intl.NumberFormat('en-US', {
            //         //     style: 'currency',
            //         //     currency: 'USD'
            //         //     }).format(val)
            //         // return numeral(val).format('0,0.00');
            //         return Intl.NumberFormat('en-US').format(val)
            //     }


            // }

            //         preProcess: val => val.replace(/[$,]/g, ''),
            //         postProcess: val => {
            //             console.log(val)
            //             if (!val) return ''
            //             const sub = val.includes('.') ? 3 - (val.length - val.indexOf('.')) : 2;
            // return new Intl.NumberFormat('en-US').format(parseFloat(val)).slice(0, sub ? -sub : undefined);
            //         const parsedValue = parseFloat(val);
            // return parsedValue.toFixed(2); // Display up to 2 decimal places
            // console.log(val.includes('.'))
            // // console.log(val.length)
            // // console.log(val.indexOf('.'))
            // console.log("length-indexOf: " +( val.length - val.indexOf('.')).toString())

            // var sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)
            // // sub=0
            // console.log('sub:'+sub)
            // console.log('--------------------')
            // return Intl.NumberFormat('en-US').format(val)
            //  return Intl.NumberFormat('en-US').format(val).slice(0, sub ? (-sub) : undefined )
            // return Intl.NumberFormat('en-US', {
            //     style: 'currency',
            //     currency: 'USD'
            // }).format(val)
            //     .slice(0, sub ? -sub : undefined)
            // }

        });

        return {
            formattedValue,
            maskOptions,
        };
    },
};
</script>
  