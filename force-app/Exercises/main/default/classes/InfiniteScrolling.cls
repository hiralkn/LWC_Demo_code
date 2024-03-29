public with sharing class InfiniteScrolling {
    @AuraEnabled
    public static List<Account> getAccountData() {
        return [SELECT Id, Name, Type, Phone, CreatedDate FROM Account LIMIT 50000];
    }
}