## Description of Files and Directories

**Extension-3:** datatableExample , datatableInfiniteScrolling
**Extension-4:** Added pagination in responsiveDatatable
**Extension-5:** Grid Gallery Synchronization
When any student tile is clicked store its id in selectedStudentId property in student browser. And pass this as an attribute to responsive datatable. In responsive datatable use renderedCallback to call setSelectedRecord
With received property from student browser. 

**responsiveDatatable.js:**
@api columnConfig;
    @api pkField;
    rows;
    _selectedRow;
    @api selectedPkVal;
    renderedOnce=false;
       
    renderedCallback() {
        console.log('I am from renderedcallback',this.selectedPkVal);
        if (this.renderedOnce) {
        return;
        }
        this.renderedOnce = true;
        this.setSelectedRecord(this.selectedPkVal);
        }
       
    @api
    get rowData() {
………

**studentBrowser.js **

export default class StudentBrowser extends NavigationMixin(LightningElement) {
   
    students = [];
    checkVal='Hello';
    selectedStudentId;
….
handleStudentSelected(event){
        const studentId = event.detail.studentId;  
        this.selectedStudentId=studentId;  
        this.updateSelectedStudent(studentId);
        console.log('I am handling from studentBrowser',studentId)
    }
 
**studentBrowser.html**

<lightning-tab label="Grid">
            <div class="slds-scrollable scrollerSize" >
                <c-responsive-datatable pk-field="Id"  column-config={cols}
                    row-data={students.data}
                    onrowclick={handleRowClick}
                    onrowdblclick={handleRowDblClick} selected-pk-val={selectedStudentId}></c-responsive-datatable>
            </div>
        </lightning-tab>

**Extension-9 - Dynamic Interaction** -- Uses following components and controller. Need some configuration from App builder. refer https://www.forcetrails.com/2021/08/publish-lwc-events-to-lightning-app-builder.html   for information regarding configuration steps. Put myDatatable(source) and contactListDI (target) on app page. select one account from myDatatable , it will show related contacts in contactListDI component.

(i) myDatatable--source component which fires event for dynamic interaction. 
(ii) AccountController -- Apex controller to retrieve both accounts and contacts data. 
(iii) contactListDI--target component for dynamic interaction. 
(iv) myCustomTypeDatatable -- example of creating custom datatypes and using in lightning datatable. myDatatable.js uses custom types from  myCustomTypeDatatable  in column configuration.

**Extension-15 - Graphql** -- recentDeliveriesGraphql component , put on the home page and check the output
**Extension-16 - Refreshview API** -- demoRefreshEvent component. When we put this component on the Account record page and create a  new contact record , RefreshEvent is dispatched  by this component and the standard view automatically gets refreshed. custom components don't get refreshed automatically ,we need to provide refreshhandler.






