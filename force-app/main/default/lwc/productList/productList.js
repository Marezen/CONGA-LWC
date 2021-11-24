import { LightningElement  ,api,wire,track} from 'lwc';
import getAllProducts from '@salesforce/apex/ProductController.getAllProducts';

export default class ProductList extends LightningElement {

    selectedRows; 
    errorMessage='';
    compareErrorOccured=false;

    @api detailsId; // id of product to show details
    @track toPurchase=[]; // selected products for purchase
    price=0;
    compareModalShow=false; // modal to show comparement result.
 
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

    connectedCallback()
    {
        this.selectedRows=[];
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
        if(this.selectedRows.length == 0)
        {
            alert("0 products selected.");
            this.toPurchase = this.selectedRows;
        }
        else{
            this.toPurchase = this.selectedRows;
            this.toPurchase.forEach(element => {
                if(element.Price__c != undefined)
                {
                    this.price += element.Price__c;
                }
            });
        }
    }

    compareSelectedProductsPrices(event)
    {
        this.compareModalShow=true;
        if(this.selectedRows.length > 3)
        {
            this.compareErrorOccured=true;
            this.errorMessage = "Error occured.  Cannot compare more than 3 selected products.";
        }
        else if(this.selectedRows.length <= 1)
        {
            this.compareErrorOccured=true;
            this.errorMessage = "Select atleast 2 products to compare their prices.";
        }
        
        this.selectedRows.sort((a,b)=> b.Price__c - a.Price__c);
    }
    ///!buttons

    closeModal()
    {
        this.compareErrorOccured=false;
        this.compareModalShow=false;
    }

}