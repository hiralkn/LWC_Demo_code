import { LightningElement } from 'lwc';
import myModal from 'c/createLightningModal';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';
import LightningAlert from 'lightning/alert';

export default class UseLightningModal extends LightningElement {
    result;    
    async handleClick() {
        this.result = await myModal.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'large',
            description: 'Accessible description of modal\'s purpose',
            content: 'No data to show..Visit again',
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        console.log(result);
    }


async handleConfirmClick() {
    this.result = await LightningConfirm.open({
        message: 'Are you sure you want to delete?',
        variant: 'header',
        label: 'Confirm Delete',
        // setting theme would have no effect
    });
    //Confirm has been closed
    //result is true if OK was clicked
    //and false if cancel was clicked
    console.log(result);
}

async handleAlertClick() {
    this.result= await LightningAlert.open({
        message: 'this is the alert message',
        theme: 'error', // a red theme intended for error states
        label: 'Error!', // this is the header text
    });
    //Alert has been closed
}

handlePromptClick() {
    LightningPrompt.open({
        message: 'Please enter your name',
        //theme defaults to "default"
        label: 'Please Respond', // this is the header text
        defaultValue: 'initial input value', //this is optional
    }).then((result) => {
        //Prompt has been closed
        //result is input text if OK clicked
        //and null if cancel was clicked
        this.result=result;
    });
}
}