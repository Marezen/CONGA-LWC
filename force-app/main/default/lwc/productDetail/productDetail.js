import { LightningElement,api,wire } from 'lwc';
import getProduct from '@salesforce/apex/ProductController.getProduct';

export default class ProductDetail extends LightningElement {
    product;
    error;

    @api
    buyProductId

    @api
    setDetailAboutProduct(detailId)
    {
        //this.detailShowId = detailId;
        getProduct({productID: detailId }).then(data=>{
            this.product = data;
            this.error=undefined;
        }).catch(error=>{
            this.error = error;
            this.product = undefined;
        });
    }
    //send event to c-checkout-products component and add to table.
    buySelectedItem()
    {
        //
    }
}