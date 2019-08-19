<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="../../SiteAssets/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.1.0/jquery.browser.min.js"></script>


<script type="text/javascript">
    
    $(document).ready(function() {
    //Change Save button to say Save Draft
    var value = document.querySelectorAll('input[value="Save"]')[0].id;
    document.querySelector("#"+value).value = 'Save Draft';
    
     //Cascading Dropdown for Prod Group
     function createDropDown(results){
        var prodGrp = '';
        for(var i=0; i<results.length; i++){
            var str = JSON.stringify(results[i].Title);
            str = str.replace(/"/g, '');
            var identity = JSON.stringify(results[i].Id);
            prodGrp += "<option value=" + identity + ">" + str + "</option>"
            }
        
            document.querySelector("[title='Product Group']").innerHTML = prodGrp;
        } 
        
        function getSectionResults(){
        //this convaluted way of grabbing the innertext is because internet explorer doesn't like the more direct way. Invoice Placement  Section
        var element = document.querySelector("[title='Invoice Placement  Section']");
        var captured = element.options[element.options.selectedIndex].text;   
        var selectedInvoiceSection = captured;
        
        //This is the REST call to grab the ProductGroup list data
        var endPointUrl = "../../_api/Web/Lists/GetByTitle('ProductGroup')/items?$select=Id,Title,Section&$filter=Section eq '" + selectedInvoiceSection + "'"
         $.ajax({
      
                         url: endPointUrl,
                         method: "GET",
                         headers: { "Accept":  "application/json; odata=verbose","Content-Type":"application/json; odata=verbose" },
                         success: function  (data) {					   
                  
                 var results = data.d.results                     						
                  if(results.length > 0){						
                    createDropDown(results);						
                  }	else{
                    document.querySelector("[title='Product Group']").innerHTML = '<option value="5">No Group</option>';
                  }					
                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                }); 
        }

        $("[title='Invoice Placement  Section']").change(
            function(){
                getSectionResults();
            })
    //
            

    var userAccountName= $().SPServices.SPGetCurrentUser();
    //Set current logged in user and manager name in people picker
    LoadPeoplePickerDetails();
    //Show the form fields on document.ready()
    $("#onetIDListForm").show();

        
  //Function to set people picker values
  function LoadPeoplePickerDetails()
  {
    var delia = _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ListData.svc/UserInformationList?$filter=startswith(FirstName,'Delia')";
    console.log(delia);
   var url=_spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties"
   getReqData(url,function(data){    
   try 
   {
           var Manager = data.d.ExtendedManagers.results;
           $("#tdManager [id$='upLevelDiv']").html(Manager[Manager.length-1]);
           var executive = $("#tdManager [id$='upLevelDiv']").html(Manager[Manager.length-1]);
           $("#tdManager [id$='checkNames']").click();   
           console.log(Manager);
            //This is the code block you uncomment when it is time to have executive approver data for the form submitter inserted into the Executive people picker
            // var executive = $("#tdManager [id$='upLevelDiv']").html(Manager[1])[0].textContent;
            // console.log(executive);
            // document.querySelector("#ctl00_ctl33_g_bfb3ab51_180f_491b_bde7_7510e7face86_ff331_ctl00_ctl00_UserField_upLevelDiv").innerHTML = executive;
   }
   catch(err){
     
    }               
       },
       function(data){
         //alert("some error occured in getting current User info");
       });
  }
  
  function getReqData(reqUrl,success, failure) {
   $.ajax({
    url: reqUrl, 
    method: "GET",
    headers: { "Accept": "application/json; odata=verbose" },
    success: function (data) {
     success(data);
    },
    error: function (data) {
     failure(data);
    }
   });
  }

     //Now function end that put manager in field
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', formValidation);
        
    });
    function formValidation(){

         document.querySelector("[title='Member Price']").setAttribute("placeholder", "$");
         document.querySelector("[title='Non-Member Price']").setAttribute("placeholder", "$");
         document.querySelector("[title='Non-Affiliate Member Price']").setAttribute("placeholder", "$");
         document.querySelector("[title='New Member Price']").setAttribute("placeholder", "$");
         document.querySelector("[title='New Non-Member Price']").setAttribute("placeholder", "$");
         document.querySelector("[title='New Non-Affiliate Member Price']").setAttribute("placeholder", "$");
         document.querySelector("[title='Part Number']").setAttribute("placeholder", "xx-xxxx-xx-xx-xxxx-xx");
         //end of currency conversion code block
         
        //document.querySelector('#ctl00_ctl33_g_bfb3ab51_180f_491b_bde7_7510e7face86_savebutton1_ctl00_diidIOSaveItem').value='Submit';
        var value = document.querySelectorAll('input[value="Save"]')[0].id;
        console.log(value);
        document.querySelector("#"+value).value = 'Submit';
         
        //this code block lets the user know certain price fields are required if a radio button is clicked
        function makeNewRequired(arg){
            var tr = document.getElementById('inactivatedChoice').children[arg],
            th = document.createElement('th');
            th.innerHTML = "Required";
            tr.appendChild(th);
        }

        function makeReviseRequired(arg){
            var tr = document.getElementById('newPartNumberChoice').children[arg],
            th = document.createElement('th');
            th.innerHTML = "Required";
            tr.appendChild(th);
        }
         
        $("[title='New Part Number']").change(
            function(){
                console.log('innertube');
                $('#newPartNumberChoice').css('visibility','hidden');
                $('#inactivatedChoice').css('visibility','visible');
                $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8)').css('visibility','visible');
                var valueofCheck = document.querySelector("[title='Yes']").childNodes[0].checked;
                console.log("This value "+valueofCheck);
                document.querySelector("[title='Yes']").childNodes[0].checked = "";                
                if(!(document.querySelector('#item2 > th'))){
                    makeNewRequired(1);
                    makeNewRequired(3);
                    makeNewRequired(5);
                }
            })
        $("[title='Price Revision']").change(
            function(){
                $('#inactivatedChoice').css('visibility','visible');
                $('#newPartNumberChoice').css('visibility','visible');
                $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8)').css('visibility','visible');
                document.querySelector("[title='Yes']").childNodes[0].checked = '';
                if(!(document.querySelector('#item2 > th'))){
                    makeNewRequired(1);
                    makeNewRequired(3);
                    makeNewRequired(5);
                }
                
            })

        $("[title='Inactivation']").change(
            function(){
                $('#inactivatedChoice').css('visibility','hidden');
                $('#newPartNumberChoice').css('visibility','hidden');
                $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8)').css('visibility','visible');
                document.querySelector("[title='No']").childNodes[0].checked = 'true';
            })
        $("[title='Misc. (Name Change)']").change(
            function(){
                $('#inactivatedChoice').css('visibility','hidden');
                $('#newPartNumberChoice').css('visibility','hidden');
                $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8)').css('visibility','visible');
                document.querySelector("[title='Yes']").childNodes[0].checked = '';
            })

            //Form validation.

            function formChecker(argument) {
                var newPartNumberChecked = document.querySelector("[title='New Part Number']").childNodes[0].checked;
                var priceRevisionChecked = document.querySelector("[title='Price Revision']").childNodes[0].checked;
                var inactivationChecked = document.querySelector("[title='Inactivation']").childNodes[0].checked;
                var miscChecked = document.querySelector("[title='Misc. (Name Change)']").childNodes[0].checked;

                var returnToRequestType = document.querySelector('#part1 > table > tbody > tr:nth-child(3) > td > b');
                var returnToItemDescription = document.querySelector('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.ms-formlabel > b');
                var invoiceIncluded = document.querySelector("[title='No']").childNodes[0].checked;
                var invoiceIncludedYes = document.querySelector("[title='Yes']").childNodes[0].checked;
                var titleVal = document.querySelector("[title='Item Description Required Field']");
                var states = document.querySelector("[title='Location (States) selected values']").options.length;
                var prod = document.querySelector("[title='PROD Required Field']").value;
                var prodLocation = document.querySelector('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td.ms-formlabel > h3 > nobr');
                var validForm = true;

                if(!newPartNumberChecked && !priceRevisionChecked && !inactivationChecked && !miscChecked){    
                    document.querySelector('#validationReqType').style.display = "inline";
                    
                    validForm = false;
                } else {
                    document.querySelector('#validationReqType').style.display = "none";
                }

                if (!$(titleVal).val().length){
                    document.querySelector("#paragraphForItemDescription").style.display = "inline";
                    document.querySelector('#validationItemDescription').style.display = "inline";
                    
                    validForm = false;
                } else {
                    document.querySelector('#validationItemDescription').style.display = "none";
                }
                      
                if(states < 1){
                    document.querySelector('#validationStates').style.display = "inline";
                      
                    validForm = false;
                    } else {
                        document.querySelector('#validationStates').style.display = "none";
                    }
                
                if(!invoiceIncluded && !invoiceIncludedYes){    
                    document.querySelector('#validationProdInfo').style.display = "inline";
                    
                    validForm = false;
                    } else {
                        document.querySelector('#validationProdInfo').style.display = "none";
                    }
                
                if(prod.length == 0){
                    document.querySelector('#validationCalendarProd').style.display = "inline";
                      
                    validForm = false;   
                }

                if(!validForm){
                    alert('Everything in red must be filled out before you can "Save" or "Submit" the form.');
                } else if(validForm){
                    argument();
                }
            };

            

            function submitForm() {
                document.querySelector("#goToApprover").childNodes[0].childNodes[1].checked = true;
                var hiddenSaveButton = document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3) > table > tbody > tr > td > input");
                hiddenSaveButton.click();
            };
            function saveForm() {
                console.log('Your form will be saved in "Draft" form till you come back and "Submit" it. Thank you.')
            };

            //Form validation on Submit
            $('#submitButton').click(
                function(){
                    formChecker(submitForm);
                });

            //Form validation on Save
            $('input[value="Save Draft"]').mouseover(
                function(){
                    formChecker(saveForm);  
                });

                    // This prevents scroll page jump when clicking on calendar
                    var qaCalendarIcon = "#calendarRow > td:nth-child(4) > span > table > tbody > tr > td:nth-child(2) > a > img";
                    var prodCalendarIcon = "#calendarRow > td:nth-child(6) > span > table > tbody > tr > td:nth-child(2) > a > img";
                    var devCalendarIcon = "#calendarRow > td:nth-child(2) > span > table > tbody > tr > td:nth-child(2) > a > img";

                    $(qaCalendarIcon).click(
                        function(){
                            setTimeout(function(){ 
                            var targetCalendar = document.querySelector('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td.ms-formlabel > h3 > nobr');
                                targetCalendar.scrollIntoView();
                                }, 200);
                        })

                    $(prodCalendarIcon).click(
                        function(){
                            setTimeout(function(){ 
                            var targetCalendar = document.querySelector('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td.ms-formlabel > h3 > nobr');
                            targetCalendar.scrollIntoView();
                            }, 200);
                        })
                    
                    $(devCalendarIcon).click(
                        function(){
                            setTimeout(function(){ 
                            var targetCalendar = document.querySelector('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td.ms-formlabel > h3 > nobr');
                                    targetCalendar.scrollIntoView();
                                    }, 200);
                            })

                    // This function checks the submitted box so that it satisfies the workflow criteria.
                    var hiddenSaveButtonSelector = "#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3) > table > tbody > tr > td > input";

                    $(hiddenSaveButtonSelector).mousedown(function() {
                        document.querySelector('#ctl00_ctl33_g_bfb3ab51_180f_491b_bde7_7510e7face86_ff361_ctl00_ctl00_BooleanField').checked = true;
                        setTimeout(function(){ console.log("Thank you"); }, 1000);
                      });

                      
                      $(hiddenSaveButtonSelector).submit(
                        function(event){
                            event.preventDefault();
                            });

            //This code block checks to see that required nfields that have been satisified have the required field removed
            $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.ms-formbody > span > table > tbody').change(
                function(){
                    var newPartNumberChecked = document.querySelector("[title='New Part Number']").childNodes[0].checked;
                    var priceRevisionChecked = document.querySelector("[title='Price Revision']").childNodes[0].checked;
                    var inactivationChecked = document.querySelector("[title='Inactivation']").childNodes[0].checked;
                    var miscChecked = document.querySelector("[title='Misc. (Name Change)']").childNodes[0].checked;
    
    
                    if(!newPartNumberChecked && !priceRevisionChecked && !inactivationChecked && !miscChecked){    
                                document.querySelector('#validationReqType').style.display = "inline";
                                console.log(newPartNumberChecked + "  " + priceRevisionChecked + "  " + inactivationChecked + "  " + miscChecked)
                                alert("Please select a request type."); 
                                
                                
                            } else {
                                document.querySelector('#validationReqType').style.display = "none";
                            }
                })


            $("[title='Item Description Required Field']").change(
            function(){
                var titleVal = document.querySelector("[title='Item Description Required Field']");
                if (!$(titleVal).val().length){
                    document.querySelector('#paragraphForItemDescription').style.display = "inline";  
                    document.querySelector('#validationItemDescription').style.display = "inline";
                    alert("Please provide an item description."); 
                    
                    
                } else {
                    document.querySelector('#validationItemDescription').style.display = "none";
                }
            })

            $('#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)').click(
                function(){
                    var states = document.querySelector("[title='Location (States) selected values']").options.length;
                    if(states < 1){
                        document.querySelector('#validationStates').style.display = "inline";
                        alert("Please select a State or location."); 
                          
                        } else {
                            document.querySelector('#validationStates').style.display = "none";
                        }
                })
            
            var noInvoiceChecked = "#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td.ms-formbody > span > table > tbody > tr:nth-child(1) > td > span > input[type=radio]";

            $(noInvoiceChecked).change(
                function(){
                    var invoiceIncluded = document.querySelector("[title='No']").childNodes[0].checked;
                    var invoiceIncludedYes = document.querySelector("[title='Yes']").childNodes[0].checked;
                    if(!invoiceIncluded && !invoiceIncludedYes){    
                        document.querySelector('#validationProdInfo').style.display = "inline";
                        alert("Please answer if product information be included on invoice."); 
                        
                        } else {
                            document.querySelector('#validationProdInfo').style.display = "none";
                        }  
                })

            var yesInvoiceChecked = "#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td.ms-formbody > span > table > tbody > tr:nth-child(2) > td > span > input[type=radio]";

            $(yesInvoiceChecked).change(
                function(){
                    var invoiceIncluded = document.querySelector("[title='No']").childNodes[0].checked;
                    var invoiceIncludedYes = document.querySelector("[title='Yes']").childNodes[0].checked;
                    if(!invoiceIncluded && !invoiceIncludedYes){    
                        document.querySelector('#validationProdInfo').style.display = "inline";
                        alert("Please answer if product information be included on invoice."); 
                        
                        } else {
                            document.querySelector('#validationProdInfo').style.display = "none";
                        }  
                })

            $("[title='PROD Required Field']").change(
                function(){
                    var prod = document.querySelector("[title='PROD Required Field']").value;
                    if(prod.length == 0){
                        document.querySelector('#validationCalendarProd').style.display = "inline";
                        alert("Please select a date for PROD."); 
                        commentsSection.scrollIntoView();    
                        }else {
                        document.querySelector('#validationCalendarProd').style.display = "none";
                            var calendarValidationWarning = "#calendarRow > td:nth-child(6) > span > span";
                            document.querySelector(calendarValidationWarning).style.display = "none";
                        }  
                })

            $("[title='PROD Required Field']").blur(
                function(){
                    
                    var prod = document.querySelector("[title='PROD Required Field']").value;
                    if(prod.length == 0){
                        document.querySelector('#validationCalendarProd').style.display = "inline";
                        commentsSection.scrollIntoView();    
                        }else {
                            var calendarValidationWarning = "#calendarRow > td:nth-child(6) > span > span";
                            document.querySelector(calendarValidationWarning).style.display = "none";
                        }  
                })
                       
    }
</script>






<style>
#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div {
 -moz-user-select: none;
 -khtml-user-select: none;
 -webkit-user-select: none;
 -ms-user-select: none;
 user-select: none;
 pointer-events: none;
}

#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2) {
    visibility: hidden;
}

#s4-titlerow, .s4-titlerowhidetitle {
    display: block !important;
}

#idAttachmentsRow{
    display: inline !important;
}

#validationItemDescription{
    margin-left: "200px";
    }
#part1 > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(3) > table > tbody > tr > td > input{
    visibility: hidden;
}
tr {
    display: block;
}

#calendarRow {
    align: left;
    display: -ms-inline-grid;
    max-width: 200px;
}

#tableCells{

    width: 350px;
}


#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1n+13) > td {
    min-width: 250px;
}

#inactivatedChoice, #newPartNumberChoice {
display: table;

}
#item1, #item2, #item3, #item4, #item5, #item6, #item7, #item8, #item9, #item10, #item11, #item12 {
    display: table-cell;
    width: 150px;
}

#item5 > h3 > nobr{
    padding-right:29px;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.ms-formlabel > h3 > nobr, #part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.ms-formbody {
    visibility: hidden;
}

#calendarRow > td:nth-child(6) > span > span {
    color: red;
    font-weight: bold;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1n+27){
display: none;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(26){
    visibility: visible;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(5) > td:nth-child(3) > b > a{
    position: relative;
    left: 100px;
    top: 10px;
    text-decoration: underline;
}

input[type=password], input[type=text], input[type=file], select, textarea, .sp-peoplepicker-topLevel, .sp-peoplepicker-topLevelDisabled, .sp-peoplepicker-autoFillContainer, .ms-inputBox {
    border: 1px solid #ababab;
    background-color: #fff;
    background-color: rgba( 255,255,255,0.85 );
    color: #444;
    width: 250px;
    margin-right: 5px;
    min-height: 29px;
}

#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2), #part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(26) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2) {
    position: relative;
    float: none !important;
    right: 70px;
    padding-top: 8px;
}

#Ribbon\2e ListForm\2e Edit\2e Commit, #Ribbon\2e ListForm\2e Edit\2e Clipboard, #Ribbon\2e ListForm\2e Edit\2e SpellCheck, #Ribbon\2e ListForm\2e Edit\2e Actions\2e DeleteItem-Large{
   display: none;
}

select, label, textarea, option {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        vertical-align: middle;
        min-width: 258px;
    }

input[type=password], input[type=text], input[type=file], textarea, .ms-inputBox {
    padding: 0px 3px;
}

#item1, #item7 {
        padding-right: 45px;
    }

#calendarRow > td:nth-child(2) > span > table > tbody > tr > td:nth-child(1) > input, 
#calendarRow > td:nth-child(4) > span > table > tbody > tr > td:nth-child(1) > input, 
#calendarRow > td:nth-child(6) > span > table > tbody > tr > td:nth-child(1) > input {
    width: 100px;
}

input[title="Member Price"], 
input[title="Non-Member Price"],
input[title="Non-Affiliate Member Price"],
input[title="New Member Price"],
input[title="New Non-Member Price"],
input[title="New Non-Affiliate Member Price"] {
    width: 100px;
}

input[title="Item Description Required Field"],
input[title="Part Number"] {
    width: 430px;
}


th{
    font-weight: normal;
    color: red;
}

input[value="Submit"] {
    visibility: hidden;
}
#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3) > table > tbody > tr > td {
    display: table-column-group;
}
</style>
