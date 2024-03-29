import { LightningElement,api} from 'lwc';

const columns = [
    { label: 'Opportunity name', fieldName: 'OpportunityName', type: 'text' },
    {
        label: 'Confidence',
        fieldName: 'Confidence',
        type: 'percent',
        cellAttributes: {
            iconName: { fieldName: 'TrendIcon' },
            iconPosition: 'right',
        },
    },
    {
        label: 'Amount',
        fieldName: 'Amount',
        type: 'currency',
        typeAttributes: { currencyCode: 'EUR', step: '0.001' },
    },
    { label: 'Contact Email', fieldName: 'Contact', type: 'email' ,editable : 'true'},
    { label: 'Contact Phone', fieldName: 'Phone', type: 'phone',iconName: 'utility:call',
    hideLabel: true, editable: false, displayReadOnlyIcon: true,},
];

const data = [
    {
        Id: 'a',
        OpportunityName: 'Cloudhub',
        Confidence: 0.2,
        Amount: 25000,
        Contact: 'jrogers@cloudhub.com',
        Phone: '2352235235',
        TrendIcon: 'utility:down',
    },
    {
        Id: 'b',
        OpportunityName: 'Quip',
        Confidence: 0.78,
        Amount: 740000,
        Contact: 'quipy@quip.com',
        Phone: '2352235235',
        TrendIcon: 'utility:up',
    },
];

export default class DatatableExample extends LightningElement {
    data = data;
    columns = columns;
    loadMoreStatus;
    @api totalNumberOfRows;

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++) {
            alert('You selected: ' + selectedRows[i].OpportunityName);
        }
    }

    handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;
    }

    handleButtonClick(){
        const dt = this.template.querySelector('lightning-datatable');
        dt.openInlineEdit();
    }
}