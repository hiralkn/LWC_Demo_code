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






