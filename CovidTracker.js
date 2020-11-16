import { LightningElement,  wire, track, api } from 'lwc';

import getCovidData from '@salesforce/apex/CovidData.getCovidData';

const Columns = [
    { label: 'State', fieldName: 'state', type: 'text' },
    { label: 'District', fieldName: 'district', type: 'text'},
    { label: 'Confirmed', fieldName: 'confirmed', type: 'text' },
    { label: 'Active', fieldName: 'active', type: 'text' },
    { label: 'Recovered', fieldName: 'recovered', type: 'text' },
    { label: 'Deceased', fieldName: 'deceased', type: 'text' },
];


export default class CovidTracker extends LightningElement {

    @track covidData = [];
    @track isLoading = false;
    covidColumns = Columns;
    
    connectedCallback() {
        this.isLoading = true;
        this.loadCovidData();
    }
    
    loadCovidData(){
        getCovidData()
        .then((result)=>{
        var i;
        var j;
        var District = [];
        var AllDistricts = [];
        for (i = 0; i < result.length; i++) {
            for (j = 0; j < result[i].districtWrapperList.length; j++) {
                District = {
                    state:  result[i].stateName,
                    district: result[i].districtWrapperList[j].districtName,
                    confirmed:  result[i].districtWrapperList[j].confirmed,
                    active: result[i].districtWrapperList[j].active,
                    recovered:  result[i].districtWrapperList[j].recovered,
                    deceased:  result[i].districtWrapperList[j].deceased,
                    notes :  result[i].districtWrapperList[j].notes
                };
                AllDistricts.push(District);
            }

        }
        this.covidData = AllDistricts;
        this.isLoading = false;
        })
        .catch((error)=>{
            console.log('Thoko Error' + error);
        })
    }
   

}
