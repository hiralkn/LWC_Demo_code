import { LightningElement,wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

export default class RecentDeliveriesGraphql extends LightningElement {
errors;
deliveries;

@wire(graphql, {
    query: gql`
        query getRecentDeliveries {
            uiapi { 
                query {
                    Course_Delivery__c (first: 5, orderBy: { Start_Date__c: { order: DESC } })
                    {
                        edges {
                            node {
                                Id 
                                Location__c { value }
                                Start_Date__c { value }
                                Region__c { value }
                                Course__r {
                                    Name { value }
                                }
                                Instructor__r {
                                    Name { value }
                                }
                            }
                        }
                    }
                }
            }
        }
    `
})
getDeliveries({ data, errors }) {
    if (data) {
        this.deliveries = data.uiapi.query.Course_Delivery__c.edges.map(
            (edge) => edge.node
        );
        this.errors = undefined;
        debugger;    
    }
    if (errors) {
        this.deliveries = undefined;
        this.errors = errors;
    }
}
}