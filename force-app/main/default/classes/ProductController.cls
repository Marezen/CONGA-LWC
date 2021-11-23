global with sharing class ProductController {

    @AuraEnabled(cacheable=true)
    global static List<Product2> getAllProducts()
    {
        try {
            return [SELECT Id,Name,Description,Image__c,Price__c FROM Product2 WITH SECURITY_ENFORCED];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        } 
    }

    @AuraEnabled
    public static Product2 getProduct(Id productID){
        try {
            return [SELECT Id,Name,Description,Image__c,Price__c,Size__c,Rating__c, Dimension__c,Color__c FROM product2 WHERE Id =:productID];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
