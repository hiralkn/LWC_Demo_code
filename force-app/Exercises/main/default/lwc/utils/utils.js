import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import createLightningModal from 'c/createLightningModal';

export default class Utils  {

   
    static showToast = (firingComponent, toastTitle, toastBody, variant)  => {
        const evt = new ShowToastEvent({
            title: toastTitle,
            message: toastBody,
            variant: variant
        });
        firingComponent.dispatchEvent(evt);
    }

    static showModal = (firingComponent, header, content)  => {
        const evt = new CustomEvent('showmodal', {
            detail: {
                header,
                content
            },
            bubbles:true,
            composed:true
        });
        firingComponent.dispatchEvent(evt);
    }

    static showLightningModal(header,content){
        
        createLightningModal.open(header,content);

    }            
    
    static getDisplayValue(data, field) {
        return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
    }
}