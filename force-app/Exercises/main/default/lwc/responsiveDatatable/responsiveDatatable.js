import { LightningElement, api,track } from 'lwc';

const PAGE_SIZE = 5;

export default class ResponsiveDatatable extends LightningElement {
	
	@api columnConfig; //array of objecs like [ { fieldName: 'Email', label:'E-mail' }, { fieldName:'Phone', label: 'Phone Number', type: 'phone'}]
	@api pkField;
	rows;
	_selectedRow;
	currentPage = 1;
     totalRecords = 0;
  @track pages = [];
  @track displayedData = [];

  connectedCallback() {
    
    this.fetchData();
  }

  
	@api
	get rowData() {
		return this.rows;
	}
	set rowData(value) {
		if (typeof value !== 'undefined') {
			this.rows = this.reformatRows(value);
		} 
	}

	@api setSelectedRecord(recordId) {
		let mySelector = `tr[data-pk='${recordId}']`;
		let selectedRow = this.template.querySelector(mySelector);
		if (selectedRow) {
			this.highlightSelectedRow(selectedRow);
		}
	}
	
	reformatRows = function(rowData) {
		let colItems = this.columnConfig;
		let reformattedRows = [];

		for (let i = 0; i < rowData.length; i++) {
			let rowDataItems = [];
			for (let j = 0; j < colItems.length; j++) {
				let colClass = '';
				if (colItems[j].hiddenOnMobile) {
					colClass = 'hiddenOnMobile';
				}
				rowDataItems.push({
					value: rowData[i][colItems[j].fieldName],
					label: colItems[j].label,
					type: colItems[j].type,
					class: colClass,
					columnId: 'col' + j + '-' + rowData[i][this.pkField],
					isPhone: (colItems[j].type==='phone'),
					isEmail: (colItems[j].type==='email'),
					isOther: (colItems[j].type!=='phone' && colItems[j].type!=='email')
				});
			}
			reformattedRows.push({
				data: rowDataItems,
				pk: rowData[i][this.pkField]
			});
		}
		return reformattedRows;
	}

	onRowClick(event) {
		let target = event.currentTarget;
		const evt = new CustomEvent( 'rowclick' , {
			detail: {
				pk: target.getAttribute('data-pk')
			}
		});
		this.dispatchEvent(evt);
		this.highlightSelectedRow(target);
	}
	
	onRowDblClick(event) {
		let target = event.currentTarget;
		const evt = new CustomEvent( 'rowdblclick' , {
			detail: {
				pk: target.getAttribute('data-pk')
			}
		});
		this.dispatchEvent(evt);
	}

	highlightSelectedRow(target) {
		if (this._selectedRow) {
			this._selectedRow.classList.remove("slds-is-selected");
		}
		target.classList.add("slds-is-selected");
		this._selectedRow = target;
	}

	fetchData() {
		this.totalRecords = this.rows.length;
	
		// Calculate total number of pages
		const totalPages = Math.ceil(this.totalRecords / PAGE_SIZE);
		this.pages = [];
		for (let i = 1; i <= totalPages; i++) {
		  this.pages.push({ number: i, key: i });
	  }
	  const startIndex = (this.currentPage - 1) * PAGE_SIZE;
		const endIndex = startIndex + PAGE_SIZE;
		this.displayedData = this.rows.slice(startIndex, endIndex);
	  }

	previousPage() {
		if (this.currentPage > 1) {
		  this.currentPage--;
		  this.fetchData();
		}
	  }
	
	  nextPage() {
		if (this.currentPage < this.pages.length) {
		  this.currentPage++;
		  this.fetchData();
		}
	  }
	
	  gotoPage(event) {
		const pageNumber = event.target.innerText;
		this.currentPage = parseInt(pageNumber);
		this.fetchData();
	  }

	
	
}