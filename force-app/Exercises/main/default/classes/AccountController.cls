public with sharing class AccountController {
	@AuraEnabled(cacheable=true)
	public static List<Account> getAccountList() {
		return [SELECT Id, Name, Industry, NumberOfEmployees FROM Account WITH SECURITY_ENFORCED LIMIT 10];
	}

	@AuraEnabled(cacheable=true)
	public static List<Contact> getContacts(Id accountId) {
		return [SELECT Name, Email, Phone FROM Contact WHERE AccountId = :accountId];
	}
}
