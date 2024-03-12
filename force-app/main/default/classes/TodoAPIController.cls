public with sharing class TodoAPIController {
    // This method is cacheable and can be used with @wire in LWC
    @AuraEnabled(cacheable=true)
    public static String getProdUrl() {
        // Query the Custom Metadata Type for the URL
        Todo_API__mdt apiConfig = [
            SELECT prod_url__c 
            FROM Todo_API__mdt 
            LIMIT 1
        ];

        return apiConfig != null ? apiConfig.prod_url__c : null;
    }
}