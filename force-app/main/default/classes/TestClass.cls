@isTest
public with sharing class TestClass {

    static void setupData()
    {
        List<product2> products = new List<Product2>();
        for (Integer i =0; i < 50 ; i++) {
            products.add(new Product2(Name='Test' + i));
        }
        insert products;
    }

    @isTest
    static void getAllProductsTest()
    {
        setupData();
        List<Product2> allProducts = ProductController.getAllProducts();
        System.assertEquals(50, allProducts.size());
    }
    /*@isTest
    static void getAllProductsCatchExceptionTest()
    {
        string test='asdadad';
        try {
            List<Product2> allProducts = ProductController.getAllProducts();
            test=String.valueOf(allProducts.size());
        } catch (Exception e) {
            test='error';
        }
        System.assertEquals('error', test);
    }*/

    @isTest
    static void getProductTest()
    {
        setupData();
        Id rightId = [Select Id FROM Product2 limit 1].Id;
        Product2 rightProduct = ProductController.getProduct(rightId);
        System.assertEquals('Test0', rightProduct.Name);

    }
    @isTest
    static void getProductCatchExceptionTest()
    {
        setupData();
        Id wrongId = '01t7Q000000EnZIQ55';
        string error ='';
        try {
            Product2 rightProduct = ProductController.getProduct(wrongId);
        } catch (Exception e) {
            error='error';
        }
        System.assertEquals('error', error);
        
    }
}
