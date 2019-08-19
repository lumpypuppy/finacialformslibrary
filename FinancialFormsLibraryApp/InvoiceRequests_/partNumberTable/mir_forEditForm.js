<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.1.0/jquery.browser.min.js"></script>
<script type="text/javascript" src="../../SiteAssets/FinancialFormsLibraryApp/InvoiceRequests_/partNumberTable/teamChecker.js"></script>

<script type="text/javascript">
setTimeout(applyScripts, 1000);
function applyScripts(){
    $(document).ready(function() {
        function browserDetector(){
            var sBrowser, sUsrAg = navigator.userAgent;
            // The order matters here, and this may report false positives for unlisted browsers.
            if (sUsrAg.indexOf("Firefox") > -1) {
              sBrowser = "Mozilla Firefox";
              // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
            } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
              sBrowser = "Opera";
              //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
            } else if (sUsrAg.indexOf("Trident") > -1) {
              sBrowser = "Microsoft Internet Explorer";
              // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
            } else if (sUsrAg.indexOf("Edge") > -1) {
              sBrowser = "Microsoft Edge";
              // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
            } else if (sUsrAg.indexOf("Chrome") > -1) {
              sBrowser = "Google Chrome or Chromium";
              // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
            } else if (sUsrAg.indexOf("Safari") > -1) {
              sBrowser = "Apple Safari";
              // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
            } else {
              sBrowser = "unknown";
            }
            
            console.log("You are using: " + sBrowser + "!");
        };
        browserDetector();

        //This code block changes the Save button to say Submit
        var value = document.querySelectorAll('input[value="Save"]')[1].id;
        document.querySelector("#"+value.toString()).value = 'Submit';


        function makeGenerateInvoiceButton(){
            var btn = document.createElement("td");                   
            btn.innerHTML = "Generate Invoice Request";               
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr").appendChild(btn);
        };
        makeGenerateInvoiceButton();

        var stage = document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(44) > td.ms-formbody").innerText;

        function buttonReveal(){
            //Hides or reveals the Generate Invoice Button depending on the contract status and the stage of the request
            setTimeout(function(){ 
                var contractState = document.querySelector('[title="Contract Status"]').value;
                if(contractState == 'Active' && stage == 'Complete'){
                    document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6)").style.display = 'block';
                    console.log('visible button');
                } else if (contractState == 'Inactive' || stage != 'Complete'){
                    document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6)").style.display = 'none';
                }
                }, 200);
        };
        buttonReveal();

        if(stage == 'Accounting'){
            SP.SOD.executeOrDelayUntilScriptLoaded(taxTeammates(), "teamChecker.js");
            document.querySelector('input[value="Submit"]').setAttribute("disabled", true);
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(36)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(37)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(38)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(39)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(40)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(41)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(42)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(43)").style.visibility = 'collapse';

            $('body').change(
                function(){
                    var jeRevAcct = document.querySelector('[title="JE Revenue Acct"]').value;
                    var reAcct = document.querySelector('[title="Receivable Acct"]').value;
                    var businessRuleChoice = document.querySelector('[title="Business Rule"]').value;
                    // console.log("je rev: " + jeRevAcct);
                    // console.log("re acct: " + reAcct);
                    // console.log("biz: " + businessRuleChoice);
                    if(jeRevAcct && reAcct && businessRuleChoice){
                        document.querySelector('input[value="Submit"]').removeAttribute("disabled");
                    }else {
                        document.querySelector('input[value="Submit"]').setAttribute("disabled", true);
                    }
                });
        }

        if(stage == 'Ready for Invoice Creation'){
            SP.SOD.executeOrDelayUntilScriptLoaded(invoiceRequestTeammates(), "teamChecker.js");
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(43)").style.visibility = 'collapse';
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(41)").style.visibility = 'collapse';
        }

        if(stage == 'Billing QC'){
            SP.SOD.executeOrDelayUntilScriptLoaded(invoiceRequestTeammates(), "teamChecker.js");
            billingQcChecker();
            console.log('Stage Complete');
        }

        if(stage == 'Complete'){
            SP.SOD.executeOrDelayUntilScriptLoaded(invoiceRequestTeammates(), "teamChecker.js");
            document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(45)").style.visibility = 'visible';
            document.querySelector('input[value="Submit"]').style.visibility = 'hidden';
            console.log('Stage Complete');
        }

        function billingQcChecker(){
            var lastModified = document.querySelector("#onetidinfoblock2 > span > nobr > span > a").innerHTML;
            var personLoggedIn = document.querySelector("#O365_MainLink_Me > div > div > span").innerHTML;
            console.log("The person who last modified: " + lastModified);
            console.log("The person logged in: " + personLoggedIn);
            if(personLoggedIn == lastModified){
                alert('As the Billing member who submitted this request into Oracle you are not permitted to also QC this request. Please refer to a fellow teammate to QC this item.');
                document.querySelector("[title='Business Rule']").setAttribute('disabled', true);
                document.querySelector("[title='JE Revenue Acct']").setAttribute('disabled', true);
                document.querySelector("[title='Receivable Acct']").setAttribute('disabled', true);
                document.querySelector("[title='Comments']").setAttribute('disabled', true);
                document.querySelector("[title='People Picker']").style.pointerEvents = 'none';
                document.querySelector("[title='People Picker']").setAttribute('disabled', true);
                document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
            }
        };
        makeTableOfProductDetails();
        function makeTableOfProductDetails(){
            console.log('step1');
            //This function reads the data from a hidden text box and formats it from JSON to an HTML table below the 'Product Details' header in blue.
                var newRow = document.createElement('tr');
                document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(31)").appendChild(newRow);

                var innerTextOfDataTable = document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30) > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field > div > p").innerText;
                console.log(innerTextOfDataTable);
                var table = document.createElement('table');
                document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30)").appendChild(table);
                var myObject = JSON.parse(innerTextOfDataTable);
                var lastPlaceOfArray = myObject.length -1;
                var total = myObject[myObject.length -1].total;
                newRow.innerHTML = '<tr><td id="totalAmount"><p>'+ total + '</p></td></tr>';
                var tableLocation = document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30) > td.ms-formbody");
                table.innerHTML = '<table id="partsTable" class="tg" style="undefined;table-layout: fixed; width: 995px"><colgroup><col style="width: 100px"><col style="width: 100px"><col style="width: 201px"><col style="width: 201px"><col style="width: 101px"><col style="width: 101px"><col style="width: 101px"><col style="width: 101px"></colgroup><tr><th class="tg-n2m0">Part Number</th><th class="tg-n2m0">Description</th><th class="tg-n2m0">Quantity</th><th class="tg-n2m0">Price</th><th class="tg-n2m0">Amount</th><th class="tg-n2m0">GL Dist</th></tr><tr></tr>';

                function makeRows(partNumber, index){
                    table.innerHTML += '<tr class="cellId"><td class="cellId">' + myObject[index].partNumber + '</td>' + '<td class="cellId">' + myObject[index].description + '</td>' + '<td class="cellId">' + myObject[index].quantity + '</td>' + '<td class="cellId">' + "$" + myObject[index].price + '</td>' + '<td class="cellId">' + "$" + myObject[index].amount.toFixed(2) + '</td>' + '<td class="cellId">' + myObject[index].gldist + '</td>' + '</tr>';
                };

                myObject.forEach(makeRows);
                
        };

        
        
    
        //End function
        $('[title="Contract Status"]').click(
            function(){
            //This function hides or reveals the generate invoice request button depending on what the user chooses from the contract status dropdown field.
            var contractStatus = document.querySelector('[title="Contract Status"]').value;
            
            if(contractStatus == 'Active'){
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6)").style.display = 'block';
            }
            
            if(contractStatus == 'Inactive'){
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6)").style.display = 'none';
            }
            });

        $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(39) > td.ms-formbody > span > table > tbody > tr > td:nth-child(2) > a > img').click(
            function(){
              setTimeout(function(){ 
              var targetCalendar = document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3)");
              targetCalendar.scrollIntoView();
              }, 500);
            });
        $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(40) > td.ms-formbody > span > table > tbody > tr > td:nth-child(2) > a > img').click(
            function(){
              setTimeout(function(){ 
              var targetCalendar = document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3)");
              targetCalendar.scrollIntoView();
              }, 500);
            });

        $('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6)').click(
            function(){
                console.log('step into');
                var innerTextOfDataTable = document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30) > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field > div > p").innerText;
                var myObject = JSON.parse(innerTextOfDataTable);
                var tran = document.querySelector('input[value="ctl00"]').checked;

                var prem = document.querySelector('input[value="ctl01"]').checked;
                if(tran){
                    localStorage.setItem('invoiceTypeTrans', true);
                }else{
                    localStorage.setItem('invoiceTypePremium', true);
                }
                localStorage.setItem('contract-number', document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1) > td.ms-formbody").innerText);
                localStorage.setItem('customer-number', document.querySelector('input[title="Customer Number Required Field"]').value);
                localStorage.setItem('customer-name', document.querySelector('input[title="Customer Name"]').value);
                localStorage.setItem('billToContactName', document.querySelector('input[title="Bill To Contact Name"]').value);
                localStorage.setItem('billToAddress', document.querySelector('input[title="Bill To Address"]').value);
                localStorage.setItem('billToStreet1', document.querySelector('input[title="Bill To Street 1"]').value);
                localStorage.setItem('billToStreet2', document.querySelector('input[title="Bill To Street 2"]').value);
                localStorage.setItem('billToCity', document.querySelector('input[title="Bill To City"]').value);
                localStorage.setItem('billToState', document.querySelector('input[title="Bill To State"]').value);
                localStorage.setItem('billToZip', document.querySelector('input[title="Bill To Zip"]').value);
                localStorage.setItem('affiliation', document.querySelector('input[title="Affiliation Type"]').value)
                localStorage.setItem('jsonPayLoad', JSON.stringify(myObject));
                
                var recurrenceInterval = document.querySelector('[title="Billing Frequency"]').value;
                var nextBillingDate = document.querySelector('input[title="Next Bill Date"]').value;
                nextBillingDate = new Date(nextBillingDate);

                if(recurrenceInterval == 'One Time'){
                document.querySelector('input[value="Submit"]').click();
                
                setTimeout(function(){ 
                    window.open('../../Lists/InvoiceRequest/NewInvoiceRequestForm.aspx', '_self');
                    }, 100);
                };

                if(recurrenceInterval == 'Recurring Monthly'){
                nextBillingDate.setDate(nextBillingDate.getDate() + 31);
                var month = nextBillingDate.getMonth()+1;
                var day = nextBillingDate.getDate();
                var year = nextBillingDate.getFullYear();
                var newBillingDate = month + '\/' + day + '\/' + year;
                console.log(newBillingDate);
                document.querySelector('input[title="Next Bill Date"]').value = newBillingDate;
                document.querySelector('input[value="Submit"]').click();
                
                setTimeout(function(){ 
                    window.open('../../Lists/InvoiceRequest/NewInvoiceRequestForm.aspx', '_self');
                    }, 200);
                };

                if(recurrenceInterval == 'Recurring Quarterly'){
                    nextBillingDate.setDate(nextBillingDate.getDate() + 91);
                    var month = nextBillingDate.getMonth()+1;
                    var day = nextBillingDate.getDate();
                    var year = nextBillingDate.getFullYear();
                    var newBillingDate = month + '\/' + day + '\/' + year;
                    console.log(newBillingDate);
                    document.querySelector('input[title="Next Bill Date"]').value = newBillingDate;
                    document.querySelector('input[value="Submit"]').click();
                    setTimeout(function(){ 
                        window.open('../../Lists/InvoiceRequest/NewInvoiceRequestForm.aspx', '_self');
                        }, 200);
                    };

                if(recurrenceInterval == 'Recurring Annually'){
                nextBillingDate.setDate(nextBillingDate.getDate() + 365);
                var month = nextBillingDate.getMonth()+1;
                var day = nextBillingDate.getDate();
                var year = nextBillingDate.getFullYear();
                var newBillingDate = month + '\/' + day + '\/' + year;
                console.log(newBillingDate);
                document.querySelector('input[title="Next Bill Date"]').value = newBillingDate;
                document.querySelector('input[value="Submit"]').click();
                setTimeout(function(){ 
                    window.open('../../Lists/InvoiceRequest/NewInvoiceRequestForm.aspx', '_self');
                    }, 200);
                };

                if(recurrenceInterval == 'Recurring Semi-Annually'){
                    nextBillingDate.setDate(nextBillingDate.getDate() + 182);
                    var month = nextBillingDate.getMonth()+1;
                    var day = nextBillingDate.getDate();
                    var year = nextBillingDate.getFullYear();
                    var newBillingDate = month + '\/' + day + '\/' + year;
                    console.log(newBillingDate);
                    document.querySelector('input[title="Next Bill Date"]').value = newBillingDate;
                    document.querySelector('input[value="Submit"]').click();
                    setTimeout(function(){ 
                        window.open('../../Lists/InvoiceRequest/NewInvoiceRequestForm.aspx', '_self');
                        }, 200);
                };

                if(recurrenceInterval == 'Recurring Tri-Annually'){
                    nextBillingDate.setDate(nextBillingDate.getDate() + 121);
                    var month = nextBillingDate.getMonth()+1;
                    var day = nextBillingDate.getDate();
                    var year = nextBillingDate.getFullYear();
                    var newBillingDate = month + '\/' + day + '\/' + year;
                    console.log(newBillingDate);
                    document.querySelector('input[title="Next Bill Date"]').value = newBillingDate;
                    document.querySelector('input[value="Submit"]').click();
                    setTimeout(function(){ 
                        window.open('../../Lists/InvoiceRequest/NewInvoiceRequestForm.aspx', '_self');
                        }, 200);
                };

            });

            if(stage == 'Complete'){
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6)").style.display = 'block'
            }
            
            var frequency = document.querySelector('[title="Billing Frequency"]').value;
            if(frequency == 'One Time' || frequency == 'Recurring Invoice'){
                document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(40)").style.visibility = 'collapse';
            } 
    }); 
};
  </script>

<style>
#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6){
    z-index: 1000;
    padding: 15px 13px;
    border: darkgray;
    border-style: solid;
    border-width: 1px;
    background-color: #2196f3;
    color: white;
    left: 411px;
    position: fixed;
    top: 104px;
    cursor: pointer;
    display: none;
}

#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(6):hover{
    z-index: 1000;
    padding: 15px 13px;
    border: darkgray;
    border-style: solid;
    border-width: 1px;
    background-color: #2196f3;
    color: white;
    left: 411px;
    position: fixed;
    top: 104px;
    display: none;
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}



#Ribbon\.ListForm\.Edit > button {
    margin-top: 15px;
    width: 50px;
    border-radius: 10px;
    background: deepskyblue;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(10), #part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(11), #part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(18), #part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(19) {
    visibility: collapse;
}

#s4-titlerow, .s4-titlerowhidetitle {
    display: block !important;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.ms-formlabel > h3 > nobr, #part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.ms-formlabel > h3 > nobr {
    white-space: initial !important;
}

#sectionTitle {
    padding-top: 35px;
}

#MSOZoneCell_WebPartWPQ4, part1 > table > tbody > tr:nth-child(1) {
    visibility: collapse;
}

#part1 > table > tbody > tr:nth-child(1) > td {
    visibility: collapse !important;
}

#productDetailsLocation {
    position: relative;
    left: -207px;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30) > table > tbody:nth-child(1n+3) > tr > td.cellId {
    border-color: #afb1b3;
    border-style: solid;
    border-width: 1px;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30) > td.ms-formbody, #part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30) > td.ms-formlabel > h3 {
display: table-column;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(30) > table {
    left: -309px;
    position: relative;
    width:  737px;
}

#totalAmount {
    font-weight: 500;
    padding-left: 238px;
}

</style>