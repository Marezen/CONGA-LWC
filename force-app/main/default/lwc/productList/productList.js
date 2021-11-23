import { LightningElement  ,api,wire,track} from 'lwc';
import getAllProducts from '@salesforce/apex/ProductController.getAllProducts';

export default class ProductList extends LightningElement {

    selectedRows; 

    @api detailsId; // id of product to show details
    @track toPurchase=[]; // selected products for purchase
    price=0;
    compareModalShow; // modal to show comparement result.
 
    @track data;    //all products
    @track columns = [
        {label: 'Name' , fieldName: 'Name', type:'text'},
        {label: 'Description' , fieldName : 'Description' , type:'text'},
        {label: 'Image', fieldName:'Image__c', type:'image'},
        {label: 'Price', fieldName:'Price__c', type:'currency'},
        {type: "button", typeAttributes: {
            label: 'Details',
            name: 'Details',
            title: 'Details',
            disabled: false,
            value: 'details',
            iconPosition: 'right',
            iconName: 'utility:description',
        }} 
    ];

    @wire(getAllProducts) productRecords({error,data}){
        if(data)
            this.data = data;
        else if(error)
                this.data = undefined;
    }

    ///table events
    handleRowSelection(event)
    {
        this.selectedRows = event.detail.selectedRows;
    }

    viewDetails(event)
    {
        this.detailsId = event.detail.row.Id;
        this.template.querySelector("c-product-detail").setDetailAboutProduct(this.detailsId);
    }
    ///!table events


    //buttons:
    checkoutSelectedProducts(event)
    {
        this.price=0;
        this.toPurchase = this.selectedRows;
        this.toPurchase.forEach(element => {
            this.price += element.Price__c;
        });
    }

    compareSelectedProductsPrices(event)
    {
        if(this.selectedRows > 3)
            this.compareModalShow=false;
        else
            this.compareModalShow=true;

        //pa next...

    }
    ///!buttons

    closeModal()
    {
        this.compareModalShow=false;
    }
}