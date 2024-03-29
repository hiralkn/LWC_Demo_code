import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import {RefreshEvent} from 'lightning/refresh';

export default class DemoRefreshEvent extends LightningElement {
    nameField=NAME_FIELD;
    phoneField=PHONE_FIELD;
    emailField=EMAIL_FIELD;
    accountField=ACCOUNT_FIELD;

    handleSuccess(event){
        console.log('Contact created. Id is-',event.detail.id);
        this.dispatchEvent(new RefreshEvent());
    }
}