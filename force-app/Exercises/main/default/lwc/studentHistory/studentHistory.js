import { LightningElement, api } from 'lwc';

export default class StudentAttendance extends LightningElement {
	@api history;

	get hasHistory() {
		return this.history && this.history.length > 0;
	}

}