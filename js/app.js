'use strict';

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;

}

let global = document.getElementById('salmoon');

let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let locationArray=[];

let table = document.createElement('table');

function Location(locationName,min,max,avg,total,randomHourArray) {
    this.locationName=locationName;
    this.min=min;
    this.max=max;
    this.avg=avg;
    this.total=total;
    this.randomHourArray=randomHourArray;
    locationArray.push(this);

}



function headerRow() {
    let article = document.createElement('article');
    global.appendChild(article);
    article.appendChild(table);

    let headingRow = document.createElement('tr');
    table.appendChild(headingRow);
  
    let th =' ';
    th=document.createElement('th');
    headingRow.appendChild(th);
    for (let i = 0; i < hours.length; i++) {
       th = document.createElement('th');
       headingRow.appendChild(th);
       th.textContent= `${hours[i]}`;
       
    }
    //  let finalTh = document.createElement('th');
    //  headingRow.appendChild(finalTh);
    //  finalTh.textContent=' Daily Location Total '
    th.textContent='Daily Total';
    
}


function footerRow() {
    let lastRow = document.createElement('tr')
    table.appendChild(lastRow);

    let totalData=document.createElement('th');
    lastRow.appendChild(totalData);

    totalData.textContent = 'Total';


    for (let i = 0; i < 13; i++) {
        let totalDLocation = document.createElement('th');
        let totalb=0;
        for (let x = 0; x < locationArray.length; x++) {
         totalb += locationArray[x].randomHourArray[i];
        }
        totalDLocation.textContent = totalb;
        lastRow.appendChild(totalDLocation);
    }

    let totalLastCell = 0 ;
    for (let y = 0; y < locationArray.length; y++) {
        totalLastCell += locationArray[y].total;  
    }
    let totalData2 = document.createElement('th');
    lastRow.appendChild(totalData2);
    totalData2.textContent = totalLastCell;
}


Location.prototype.customerPerHour=function() {
    
    let sum=0;
     
    for (let i = 0; i < hours.length; i++) {
        sum=getRandomNumber(this.min,this.max)*this.avg;
        let calculate = Math.floor(sum);
        this.randomHourArray.push(calculate);
        this.total+=calculate;  
    }
}

Location.prototype.renderA=function () {
    let secondRow = document.createElement('tr');
    table.appendChild(secondRow);
    let dataTable = document.createElement('td');
    secondRow.appendChild(dataTable);
    dataTable.textContent = this.locationName;

    let dataTable2 = ' ' ;
    for (let i = 0; i < hours.length; i++) {
        dataTable2 = document.createElement('td');
        secondRow.appendChild(dataTable2);
        dataTable2.textContent = `${this.randomHourArray[i]}`;

    }

    dataTable2.textContent=this.total;
    
}

let locationForm = document.getElementById('form');

console.log(locationForm);

locationForm.addEventListener('submit',submitter);

function submitter(event) {
event.preventDefault();

let locationName = event.target.locationName.value;
let min = Number(event.target.locationMin.value);
let max = Number(event.target.locationMax.value);
let avg = Number(event.target.locationAvg.value);

if (min > max) {
    alert('please Choose Min less than Max')
 } else {
   
     let newForm = new Location (locationName,min,max,avg,0,[]);
     newForm.customerPerHour();
     newForm.renderA();

     table.textContent= ' ';

     headerRow();

     for (let i = 0; i < locationArray.length; i++) {
        locationArray[i].customerPerHour();
        locationArray[i].renderA();
      }
     

 
      footerRow();
    }

    
}





let Seattle = new Location('Seattle', 23, 65, 6.3, 0, []);

let Tokyo = new Location('Tokyo', 3, 24, 1.2, 0, []);

let Dubai = new Location('Dubai', 11, 38, 3.7, 0, []);

let Paris = new Location('Paris', 20, 38, 2.3, 0, []);

let Lima = new Location('Lima', 2, 16, 4.6, 0, []);


headerRow();

for (let i = 0; i < locationArray.length; i++) {
   locationArray[i].customerPerHour();
   locationArray[i].renderA();
}


footerRow();


// let Seattle = {

//     locationName:'Seattle',
//     minAndmax:0,
//     avg:6.3,
//     total:0,
//     randomHourArray:[],
//     customerPerHour: function () {
//         let sum = 0;
//         for (let i = 0; i < hours.length; i++) {
//           this.minAndmax= getRandomNumber(23,65);
//          sum = this.minAndmax * this.avg ;
//          let calculate = Math.floor(sum);
//          this.randomHourArray.push(calculate);
//          this.total+=calculate;   
//         }
//     },
 
//     getLiAndUl:function () {
        
//         let ulElement =document.createElement('ul');

//         global.appendChild(ulElement);

//         let liElement = null;
//         for (let i = 0; i < hours.length; i++) {
//             liElement= document.createElement('li')
//             ulElement.appendChild(liElement);
//             liElement.textContent=`${hours[i]} ${this.randomHourArray[i]}  Seattle cookies`;
            
//         }


//         let liElement2 =document.createElement('li');
//         ulElement.appendChild(liElement2);
//         liElement2.textContent=`This total is ${this.total}`;
    
//     },

// }
// Seattle.customerPerHour();
// Seattle.getLiAndUl();



// let Tokyo = {
//     locationName:'Tokyo',
//     minAndmax:0,
//     avg:1.2,
//     total:0,
//     randomHourArray:[],
//     customerPerHour: function() {
//         let sum = 0;
//         for (let i = 0; i <hours.length; i++) {
//            this.minAndmax = getRandomNumber(3,24);
//            sum = this.minAndmax * this.avg;
//            let calculate = Math.floor(sum);
//            this.randomHourArray.push(calculate);
//            this.total+=calculate;
//         }
//     },
//     getLiAndUl :function() {
//         let ulElement = document.createElement('ul');
//         global.appendChild(ulElement);
//         let liElement = null;
//         for (let i = 0; i< hours.length; i++) {
//           liElement =document.createElement('li');
//           ulElement.appendChild(liElement);
//           liElement.textContent= `${hours[i]}  ${this.randomHourArray[i]} Tokyo cookies`;


           
//         }
//         let liElement2 = document.createElement('li');
//         ulElement.appendChild(liElement2);
//         liElement2.textContent= `The Total is ${this.total}`;
//     }
// }
// Tokyo.customerPerHour();
// Tokyo.getLiAndUl();


// let Dubai = {

//     locationName:'Seattle',
//     minAndmax:0,
//     avg:3.7,
//     total:0,
//     randomHourArray:[],
//     customerPerHour: function () {
//         let sum = 0;
//         for (let i = 0; i < hours.length; i++) {
//           this.minAndmax= getRandomNumber(11,38);
//          sum = this.minAndmax * this.avg ;
//          let calculate = Math.floor(sum);
//          this.randomHourArray.push(calculate);
//          this.total+=calculate;   
//         }
//     },
 
//     getLiAndUl:function () {
        
//         let ulElement =document.createElement('ul');

//         global.appendChild(ulElement);

//         let liElement = null;
//         for (let i = 0; i < hours.length; i++) {
//             liElement= document.createElement('li')
//             ulElement.appendChild(liElement);
//             liElement.textContent=`${hours[i]} ${this.randomHourArray[i]} Dubai cookies`;
            
//         }


//         let liElement2 =document.createElement('li');
//         ulElement.appendChild(liElement2);
//         liElement2.textContent=`This total is ${this.total}`;
    
//     },

// }
// Dubai.customerPerHour();
// Dubai.getLiAndUl();


// let Paris = {

//     locationName:'Seattle',
//     minAndmax:0,
//     avg:2.3,
//     total:0,
//     randomHourArray:[],
//     customerPerHour: function () {
//         let sum = 0;
//         for (let i = 0; i < hours.length; i++) {
//           this.minAndmax= getRandomNumber(20,38);
//          sum = this.minAndmax * this.avg ;
//          let calculate = Math.floor(sum);
//          this.randomHourArray.push(calculate);
//          this.total+=calculate;   
//         }
//     },
 
//     getLiAndUl:function () {
        
//         let ulElement =document.createElement('ul');

//         global.appendChild(ulElement);

//         let liElement = null;
//         for (let i = 0; i < hours.length; i++) {
//             liElement= document.createElement('li')
//             ulElement.appendChild(liElement);
//             liElement.textContent=`${hours[i]} ${this.randomHourArray[i]} Paris cookies`;
            
//         }


//         let liElement2 =document.createElement('li');
//         ulElement.appendChild(liElement2);
//         liElement2.textContent=`This total is ${this.total}`;
    
//     },

// }
// Paris.customerPerHour();
// Paris.getLiAndUl();


// let Lima = {

//     locationName:'Seattle',
//     minAndmax:0,
//     avg:4.6,
//     total:0,
//     randomHourArray:[],
//     customerPerHour: function () {
//         let sum = 0;
//         for (let i = 0; i < hours.length; i++) {
//           this.minAndmax= getRandomNumber(2,16);
//          sum = this.minAndmax * this.avg ;
//          let calculate = Math.floor(sum);
//          this.randomHourArray.push(calculate);
//          this.total+=calculate;   
//         }
//     },
 
//     getLiAndUl:function () {
        
//         let ulElement =document.createElement('ul');

//         global.appendChild(ulElement);

//         let liElement = null;
//         for (let i = 0; i < hours.length; i++) {
//             liElement= document.createElement('li')
//             ulElement.appendChild(liElement);
//             liElement.textContent=`${hours[i]} ${this.randomHourArray[i]}  Lima cookies`;
            
//         }


//         let liElement2 =document.createElement('li');
//         ulElement.appendChild(liElement2);
//         liElement2.textContent=`This total is ${this.total}`;
    
//     },

// }
// Lima.customerPerHour();
// Lima.getLiAndUl();


