import { LightningElement,api,track } from 'lwc';

export default class CheckoutProducts extends LightningElement {
    @api selected; // all selected products for purchase
    @api priceTotal;

    //reset
    makePurchase(event)
    {
        this.selected=[];
        this.priceTotal=0;
    }
}