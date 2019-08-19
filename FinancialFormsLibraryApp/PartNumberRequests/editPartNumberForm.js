<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="//code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.1.0/jquery.browser.min.js"></script>
<script type="text/javascript" src="../../SiteAssets/FinancialFormsLibraryApp/PartNumberRequests/teamChecker.js"></script>


<script type="text/javascript">
setTimeout(applyScripts, 1000);
function applyScripts(){
    console.log('Delayed');
    $(document).ready(function() {
        var selectedValue = document.querySelector('#statusId > td.ms-formbody').innerHTML;

        function CheckCurrentUserMembership() {
            $.getJSON(_spPageContextInfo.webServerRelativeUrl + "/_api/web/currentuser")
            .done(function(data){ 
                personLogged =  data.Title;
                console.log('the person logged in is: ' + personLogged);
            })
            .fail(function() { console.log("Failed")});
             
            };

            CheckCurrentUserMembership();
        
     //This code block checks to see if the person modifying the list item is a member of the billing admin group and if not prevents them from changing the executive team member.
        var billingAdminGroup = [];
        var isAdmin;
        var personLogged;
        function initializeVariables(results){	
        var str = JSON.stringify(results);

        function includes(billingAdminGroup, personLogged) {
            var returnValue = false;
            var pos = billingAdminGroup.indexOf(personLogged);
            
            if (pos >= 0) {
                returnValue = true;
                //alert(personLogged + " is in the Admin Group");
            }else{
                //alert(personLogged + " is NOT in the Admin Group");
            }
            return returnValue;
        }
        
        for(var i=0; i<results.length; i++){
            var result = results[i];
            billingAdminGroup.push(result.Title);
            }
            console.log(billingAdminGroup);

            isAdmin = includes(billingAdminGroup, personLogged);
            
            if(!isAdmin){
                document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.pointerEvents = "none";
                $("div[title|='People Picker']").attr("disabled", true);
                $("div[title|='People Picker']").css("pointerEvents", "none");
                document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2)').style.visibility = 'hidden';
                document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2)').style.visibility = 'hidden';
                document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2)').style.visibility = 'hidden';
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField').disabled = true;
                console.log('Current logged in is NOT Admin');
            }
        } 
        
        function f1(){
        //This is the REST call to grab the billing admin members
        var endPointUrl = "../../_api/web/sitegroups/getbyname(\'Billing%20Admin%20Group\')/users"
         $.ajax({
      
                         url: endPointUrl,
                         method: "GET",
                         headers: { "Accept":  "application/json; odata=verbose","Content-Type":"application/json; odata=verbose" },
                         success: function  (data) {					   
                  
                 var results = data.d.results                     						
                  if(results.length > 0){						
                    initializeVariables(results);						
                  }						
                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                }); 
        }
        f1()


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

        function executiveMember(){
        var userAccountName= $().SPServices.SPGetCurrentUser();
        //Set current logged in user and manager name in people picker
        LoadPeoplePickerDetails();
        //Show the form fields on document.ready()
        $("#onetIDListForm").show();
    
            
        //Function to set people picker values for Executive Team Member 
        function LoadPeoplePickerDetails()
        {
        var url=_spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties"
        getReqData(url,function(data){    
        try 
        {
                var Manager = data.d.ExtendedManagers.results;
                Manager = Manager.splice(1, 1);
                $("#tdManager [id$='upLevelDiv']").html(Manager);
                $("#tdManager [id$='checkNames']").click();    
                //alert(Manager);        
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
              //End of Func
     } 
        //Adds $ placeholder in the price box
    
        document.querySelector("[title='Member Price']").setAttribute("placeholder", "$");
        document.querySelector("[title='Non-Member Price']").setAttribute("placeholder", "$");
        document.querySelector("[title='Non-Affiliate Member Price']").setAttribute("placeholder", "$");
        document.querySelector("[title='New Member Price']").setAttribute("placeholder", "$");
        document.querySelector("[title='New Non-Member Price']").setAttribute("placeholder", "$");
        document.querySelector("[title='New Non-Affiliate Member Price']").setAttribute("placeholder", "$");

        //This code block changes the Save button to say Submit
        var value = document.querySelectorAll('input[value="Save"]')[1].id;
        document.querySelector("#"+value.toString()).value = 'Submit';
        
        console.log(selectedValue);

        function userEdit() {
        //This function captures the person logged in, compares it to who created it and if it is the same and of a certain status makes the page un-editable.
            var personLogged = document.querySelector('#O365_MainLink_Me > div > div > span').innerHTML;
            var createdBy = document.querySelector('#onetidinfoblock1 > span > nobr > span > a').title.trim();
            var approvingManager = document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").innerText.trim().replace(';', '');
            var alternateManager = document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").innerText.trim().replace(';', '');
            console.log('userEdit function: person logged in = ' + personLogged);
            console.log('userEdit function: person created is = ' + createdBy);
            console.log('userEdit function: Manager is = ' + approvingManager);
            console.log('userEdit function: Alternate Manager is = ' + alternateManager);
            
            if((personLogged == createdBy) && !((selectedValue == 'Saved'))){
                    $('#WebPartWPQ2').css('pointer-events','none');
                    console.log('should not be able to edit');
                    document.querySelector('#Ribbon\\2e ListForm\\2e Edit\\2e Actions-LargeLarge-0').style.display = 'none';
                }
        } 
        
        

        

        $('[title="Tax Category Assignment"]').change(
            //This function requires the Tax Assignee to select a tax category or else they cannot click Submit
            function(){ 
                var choice = $('[title="Tax Category Assignment"]').val();
                if(selectedValue == 'Pending Tax Category Assignment'){
                if(choice == 0){
                    document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                } else {
                    document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                    console.log("remove disabled bcause of "+choice);
                }
                }
        })
        
       $('input[value="Submit"]').mousedown(function() {
        document.querySelector("#part1 > table > tbody > tr.submittedRow > td.ms-formbody > span").children[0].checked = true;
        //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff361_ctl00_ctl00_BooleanField').checked = true;
        setTimeout(function(){ console.log("Thank you"); }, 1000);
      });

      //This section hides price boxes depending on what the user selected on initial page load

      if($('input[value="ctl00"]').prop("checked")){
            $('#newPartNumberChoice').css('visibility','hidden');
            $('#inactivatedChoice').css('visibility','visible');
            $('#includeItemDescription').css('display','none');
        }

     if($('input[value="ctl01"]').prop("checked")){
        $('#inactivatedChoice').css('visibility','visible');
        $('#newPartNumberChoice').css('visibility','visible');
        }  
        
     if($('input[value="ctl02"]').prop("checked")){
        $('#inactivatedChoice').css('visibility','hidden');
        $('#newPartNumberChoice').css('visibility','hidden');
        }  

        if($('input[value="ctl03"]').prop("checked")){
            $('#inactivatedChoice').css('visibility','visible');
            $('#newPartNumberChoice').css('visibility','visible');
            }
     //code block creates a string for billing of each product code for each state

     $('#productCodesHeader').click(
        function(){
            /* alert(document.querySelector('[title="Category"]').options[document.querySelector('[title="Category"]').options.selectedIndex].innerText.slice(0, 2)); */
            var category = document.querySelector('[title="Category"]').selectedOptions[0].innerText.slice(0, 2);
            var productCode = document.querySelector('[title="Product Code"]').value;
            var media = document.querySelector('[title="Media"]').selectedOptions[0].innerText.slice(0, 2);
            var type = document.querySelector('[title="Types"]').selectedOptions[0].innerText.slice(0, 4);
            var futureMisc = document.querySelector('[title="Future-Misc"]').selectedOptions[0].innerText.slice(0, 2);
            var statesChosen = document.querySelector('[title="Location (States) selected values"]').children;
            var text='';
            var commentFieldText = '';
            var i;
            for (i = 0; i < statesChosen.length; i++) {
                var position = document.querySelector('[title="Location (States) selected values"]').children[i].innerText.slice(0, 2);
                text += category + "-" + productCode + "-" + position + "-" + media + "-" + type + "-" + futureMisc + "    ";
                commentFieldText += category + "-" + productCode + "-" + position + "-" + media + "-" + type + "-" + futureMisc + "<br>";
            };
            document.querySelector('#productCodes').innerText = text;
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field > p').innerHTML = commentFieldText;
        })
    
        //END CODE BLOCK

       //This section hides price boxes depending on what the user selected
        $('input[value="ctl00"]').change(
            function(){
                $('#newPartNumberChoice').css('visibility','hidden');
                $('#inactivatedChoice').css('visibility','visible');
                $('#includeItemDescription').css('display','none');
            })
        $('input[value="ctl01"]').change(
            function(){
                $('#inactivatedChoice').css('visibility','visible');
                $('#newPartNumberChoice').css('visibility','visible');
            })
        $('input[value="ctl02"]').change(
            function(){
                
                $('#inactivatedChoice').css('visibility','hidden');
                $('#newPartNumberChoice').css('visibility','hidden');
            })
        $('input[value="ctl03"]').change(
            function(){
                $('#inactivatedChoice').css('visibility','hidden');
                $('#newPartNumberChoice').css('visibility','hidden');
            })
               
               // This prevents scroll page jump when clicking on calendar
               $('#calendarRow > td:nth-child(6) > span > table > tbody > tr > td:nth-child(2) > a > img').click(
                function(){
                    setTimeout(function(){ 
                    var targetCalendar = document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formlabel');
                    targetCalendar.scrollIntoView();
                    }, 500);
                })

        //This section of code conditionally formats the edit form to highlight boxes depending on the status level and may hide others
       
        if(selectedValue == 'Saved'){

            document.querySelector('input[value="Submit"]').onmousedown = function(){
                document.querySelector("#part1 > table > tbody > tr.submittedRow > td.ms-formbody > span").children[0].checked = true;
                setTimeout(function(event){ 
                        event.preventDefault();
                        }, 500);
            };

            userEdit();
            $("select[title='Manager Approval Status']").css("visibility", 'hidden');
            document.querySelector("#commentsRowforApprover").style.visibility = 'hidden';
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(3)").style.visibility = 'hidden';
            document.querySelector('#Ribbon\\2e ListForm\\2e Edit\\2e Actions-LargeLarge-0').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(30)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(31)').style.display = 'none'; 
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(32)').style.display = 'none'; 
            
        }


        if(selectedValue == 'Pending Mgr. Approval'){
            //Run a function to evaluate if rejected was selected and then make comments required and disabling submit
            $('[title="Manager Approval Status"]').change(
                function(){ 
                    document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    var managerApprovalChoice = document.querySelector('[title="Manager Approval Status"]').value;
                    //alert(value); 
                    var textInABox = document.querySelector('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field').textContent;
                    //alert(textInABox.length);
                    if(managerApprovalChoice == 'Rejected' && textInABox.length <= 1){
                        alert('Please enter a reason for the rejection in the comments box below.');
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    }else if (managerApprovalChoice == 'Approved') {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                    } else if (managerApprovalChoice == 'Rejected' && textInABox.length > 3) {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                    } else {
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    }
                })

                //This function makes submit un-disabled when text is put into the input box for Comments
                $('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field').keypress(
                    function(){
                    //document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    var managerApprovalChoice = document.querySelector('[title="Manager Approval Status"]').value;
                    //alert(value); 
                    var textInABox = document.querySelector('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field').textContent;
                    //alert(textInABox.length);
                    console.log(managerApprovalChoice);
                    console.log("text content" + textInABox.length);
                    if(managerApprovalChoice == 'Rejected' && textInABox.length <= 1){
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                        console.log(managerApprovalChoice);
                        console.log("text content" + textInABox.length);
                    }else if (managerApprovalChoice == 'Approved') {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                        console.log(managerApprovalChoice);
                        console.log("text content approved" + textInABox.length);
                    } else if (managerApprovalChoice == 'Rejected' && textInABox.length > 3) {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                        console.log(managerApprovalChoice);
                        console.log("text content" + textInABox.length);
                    } else {
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                        console.log(managerApprovalChoice);
                        console.log("text content last" + textInABox.length);
                    }
            });

            userEdit();
            //SP.SOD.executeFunc("teamChecker.js", "CheckCurrentUserMembership", managersOnlyApproval());
            SP.SOD.executeOrDelayUntilScriptLoaded(managersOnlyApproval(), "teamChecker.js");

            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td.ms-formlabel').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td.ms-formbody').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(4)').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(4)').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(4)').style.width = '150px';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(3)').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(3)').style.background = '#ffdb2d';
            document.querySelector('input[value="Save"]').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27)').style.visibility = 'hidden';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(30)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(31)').style.display = 'none'; 
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(32)').style.display = 'none';
        }

        if(selectedValue == 'Pending Tax Category Assignment'){
            SP.SOD.executeOrDelayUntilScriptLoaded(taxTeammates(), "teamChecker.js");
            userEdit();
            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27)').style.visibility = 'hidden';
            document.querySelector('[title="Manager Approval Status"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Manager Approval Status"]').style.MozAppearance = 'caret';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff271_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('[title="Tax Category Assignment"]').style.borderColor = '#ffffff';
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").style.borderColor = '#ffffff';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff261_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('[title="Tax Category Assignment"]').style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td:nth-child(3)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td:nth-child(4)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29)').style.display = 'none';
            document.querySelector('input[value="Save"]').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25)').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26) > td.ms-formbody').style.background = '#ffdb2d';
        }

        if(selectedValue == 'Pending Executive Team Member Approval'){
            SP.SOD.executeOrDelayUntilScriptLoaded(executiveTeammates(), "teamChecker.js");
            userEdit();
            
            $('[title="Executive Team Member Approval"]').change(
                function(){
                    setTimeout(function(){ 
                        var value = document.querySelector('[title="Executive Team Member Approval"]').value;
                        var textInABox = document.querySelector('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field > p').innerText;
                        if(value == 'Rejected' && textInABox.length <= 1){
                            alert('Please enter a reason for the rejection in the comments box below.');
                            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                        } else if (value == 'Rejected' && textInABox.length > 3) {
                            document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                        } else if (value == 'Approved') {
                            document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                        } else {
                            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                        }
                        }, 500);
                });

                $('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field').keypress(
                    function(){
                    document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    var managerApprovalChoice = document.querySelector('[title="Executive Team Member Approval"]').value;
                    //alert(value); 
                    var textInABox = document.querySelector('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field').textContent;
                    //alert(textInABox.length);
                    if(managerApprovalChoice == 'Rejected' && textInABox.length <= 1){
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    }else if (managerApprovalChoice == 'Approved') {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                    } else if (managerApprovalChoice == 'Rejected' && textInABox.length > 3) {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                    } else {
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    }
               });

            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Manager Approval Status"]').style.MozAppearance = 'caret';
            //document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('[title="Tax Category Assignment"]').style.borderColor = '#ffffff';
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td.ms-formlabel').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td.ms-formbody').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td:nth-child(4)').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td:nth-child(4)').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td:nth-child(4)').style.width = '150px';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td:nth-child(3)').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27) > td:nth-child(3)').style.background = '#ffdb2d';
            document.querySelector('input[value="Save"]').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29)').style.display = 'none'; 
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(30)').style.display = 'none'; 
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(31)').style.display = 'none'; 
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(32)').style.display = 'none'; 

        }

        if(selectedValue == 'Pending CFO Approval'){
             $('[title="CFO Approval"]').change(
                function(){
                    setTimeout(function(){ 
                        var value = document.querySelector('[title="CFO Approval"]').value;
                        var textInABox = document.querySelector('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field > p').innerText;
                        if(value == 'Rejected' && textInABox.length <= 1){
                            alert('Please enter a reason for the rejection in the comments box below.');
                            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                        } else if (value == 'Rejected' && textInABox.length > 3) {
                            document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                        } else if (value == 'Approved') {
                            document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                        } else {
                            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                        }
                        }, 500);
                });

                $('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field').keypress(
                    function(){
                    document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    var managerApprovalChoice = document.querySelector('[title="CFO Approval"]').value;
                    //alert(value); 
                    var textInABox = document.querySelector('#commentsRowforApprover > td.ms-formbody > span > div > div.ms-rtestate-write.ms-rteflags-0.ms-rtestate-field').textContent;
                    //alert(textInABox.length);
                    if(managerApprovalChoice == 'Rejected' && textInABox.length <= 1){
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    }else if (managerApprovalChoice == 'Approved') {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                    } else if (managerApprovalChoice == 'Rejected' && textInABox.length > 3) {
                        document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                    } else {
                        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    }
               });


            document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
            SP.SOD.executeOrDelayUntilScriptLoaded(cfoTeammates(), "teamChecker.js");
            userEdit();
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.top = '-5px';
            document.querySelector('[title="Executive Team Member Approval"]').style.position = 'relative';
            document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('[title="Manager Approval Status"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Manager Approval Status"]').style.MozAppearance = 'caret';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff281_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('#tdManager > span > span > table').style.display = 'none';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff261_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff271_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('[title="Tax Category Assignment"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Tax Category Assignment"]').setAttribute('disabled', true);
            document.querySelector('[title="Executive Team Member Approval"]').setAttribute('disabled', true);
            document.querySelector('[title="Manager Approval Status"]').setAttribute('disabled', true);
            document.querySelector('input[value="Save"]').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28) > td.ms-formlabel').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28) > td.ms-formbody').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28) > td.ms-formbody').style.width = '150px';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29) > td.ms-formlabel').style.display='none'; 
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29) > td.ms-formbody').style.display='none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(32)').style.display = 'none';
            }

        if(selectedValue == 'Pending Billing Entry'){
            SP.SOD.executeOrDelayUntilScriptLoaded(billingTeammates(), "teamChecker.js");
            userEdit ();
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector("#Ribbon\\.ListForm\\.Edit\\.Actions-LargeLarge-0-0 > a:nth-child(4)").style.borderRadius = '10px';
            document.querySelector("#Ribbon\\.ListForm\\.Edit\\.Actions-LargeLarge-0-0 > a:nth-child(4)").style.background = 'gold';
            document.querySelector("#Ribbon\\.ListForm\\.Edit\\.Actions-LargeLarge-0-0 > a:nth-child(4)").style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
            document.querySelector('#productCodesHeader').style.display = 'block';
            document.querySelector('input[value="Save"]').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29)').style.display = 'none';
            document.querySelector('input[value="Submit"]').setAttribute('value', 'Submit for QC');
            document.querySelector("#Ribbon\\.ListForm\\.Edit\\.Actions-LargeLarge-0").style.visibility = 'visible';
            document.querySelector("#part1 > table > tbody > tr:nth-child(7) > td > table > tbody > tr > td:nth-child(5) > table > tbody > tr > td").style.visibility = 'hidden';
            document.querySelector('[title="Tax Category Assignment"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Manager Approval Status"]').style.MozAppearance = 'caret';

            document.querySelector('#tdManager > span > span > table').style.display = 'none';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.top = '-5px';
            document.querySelector('[title="Executive Team Member Approval"]').style.position = 'relative';
            document.querySelector('[title="CFO Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="CFO Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="CFO Approval"]').style.MozAppearance = 'caret';
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(6) > td > table > tbody > tr > td:nth-child(4) > table > tbody > tr > td').style.display = 'none';
            document.querySelector('input[value="Save"]').style.display = 'none';            
        }
            
        if(selectedValue == 'Pending QC Approval'){
            SP.SOD.executeOrDelayUntilScriptLoaded(billingTeammates(), "teamChecker.js");
            userEdit ();
            billingQcChecker();

            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';

            document.querySelector('#productCodesHeader').style.display = 'block';
            document.querySelector('input[value="Save"]').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29) > td.ms-formlabel').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29) > td.ms-formbody').style.background = '#ffdb2d';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29) > td.ms-formbody').style.width = '150px';

            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff261_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff271_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('[title="Tax Category Assignment"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Manager Approval Status"]').style.MozAppearance = 'caret';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff281_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('#tdManager > span > span > table').style.display = 'none';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.top = '-5px';
            document.querySelector('[title="Executive Team Member Approval"]').style.position = 'relative';
            document.querySelector('[title="CFO Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="CFO Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="CFO Approval"]').style.MozAppearance = 'caret';
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(6) > td > table > tbody > tr > td:nth-child(4) > table > tbody > tr > td').style.display = 'none';
            document.querySelector('input[value="Save"]').style.display = 'none';
        }

        if(selectedValue == 'Completed'){
            SP.SOD.executeOrDelayUntilScriptLoaded(billingTeammates(), "teamChecker.js");
            userEdit ();
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
  
            document.querySelector('#productCodesHeader').style.display = 'block';
            document.querySelector('input[value="Save"]').style.display = 'none';
            document.querySelector('input[value="Submit"]').style.display = 'none';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff261_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff271_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('[title="Tax Category Assignment"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Manager Approval Status"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Manager Approval Status"]').style.MozAppearance = 'caret';
            // document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff281_ctl00_ctl00_UserField_OuterTable > tbody > tr:nth-child(1) > td:nth-child(2)').style.display = 'none';
            document.querySelector('#tdManager > span > span > table').style.display = 'none';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Executive Team Member Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.MozAppearance = 'caret';
            document.querySelector('[title="Executive Team Member Approval"]').style.top = '-5px';
            document.querySelector('[title="Executive Team Member Approval"]').style.position = 'relative';
            document.querySelector('[title="CFO Approval"]').style.borderColor = '#ffffff';
            document.querySelector('[title="CFO Approval"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="CFO Approval"]').style.MozAppearance = 'caret';
            document.querySelector('[title="Billing QC Status"]').style.borderColor = '#ffffff';
            document.querySelector('[title="Billing QC Status"]').style.webkitAppearance = 'caret';
            document.querySelector('[title="Billing QC Status"]').style.MozAppearance = 'caret';
            document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").style.borderColor = '#ffffff';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.borderColor = '#ffffff';
            $('input[type="text"]').prop("disabled", true);
            $('select').prop("disabled", true);
            document.querySelector('#part1 > table > tbody > tr:nth-child(6) > td > table > tbody > tr > td:nth-child(4) > table > tbody > tr > td').style.display = 'none';
            document.querySelector('input[value="Save"]').style.display = 'none';
            
        }

        if(selectedValue == 'Canceled'){
            $('input[type="text"]').prop("disabled", true);
            $('select').prop("disabled", true);
            $('.ms-inputBox').prop("disabled", true);
            $("input[type=button]").prop("disabled", true);
            SP.SOD.executeOrDelayUntilScriptLoaded(adminTeammates(), "teamChecker.js");
            userEdit ();
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(28)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(29)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(30)').style.display = 'none';
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(31)').style.display = 'none'; 
            document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(32)').style.display = 'none'; 
            
        }

        function billingQcChecker(){
            var lastModified = document.querySelector("#onetidinfoblock2 > span > nobr > span > a").innerHTML;
            var personLoggedIn = document.querySelector("#O365_MainLink_Me > div > div > span").innerHTML;
            console.log(lastModified);
            console.log(personLoggedIn);
            if(personLoggedIn == lastModified){
                alert('As the Billing member who submitted this request into Oracle you are not permitted to also QC this request. Please refer to a fellow teammate to QC this item.');
                document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                document.querySelector('[title="Billing QC Status"]').setAttribute('disabled', true);
            }
        };
        
    });
};
</script>

<style>
#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div {
 -moz-user-select: none;
 -khtml-user-select: none;
 -webkit-user-select: none;
 -ms-user-select: none;
 user-select: none;
 pointer-events: none;
}

#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2) {
    visibility: hidden;
}

#s4-titlerow, .s4-titlerowhidetitle {
    display: block !important;
}

#idAttachmentsRow{
    display: inline !important;
}

#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td:nth-child(3){
    float: left;
}

#part1 > table > tbody > tr:nth-child(1){
    height: 1px;
}

#ms-input{
    width: 300px;
}

input[value="Cancel"] {
    display: none;
}

#statusId {
    color: #2196f3;
    font-size: 16px;
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

#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff261_ctl00_ctl00_UserField_containerCell, #ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff271_ctl00_ctl00_UserField_containerCell, #ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff281_ctl00_ctl00_UserField_containerCell, #ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff291_ctl00_ctl00_UserField_containerCell, #ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField_containerCell {
    display: block;
    width: 350px;
}

#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26) > td:nth-child(3), #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26) > td:nth-child(4){
    background: #ffdb2d;
        font-weight: bold;
        width: 150px;
        padding: 10px;
    }
    
    #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26) > td:nth-child(3){
    background: #ffdb2d;
        font-weight: bold;
        padding: 10px;
    }

    #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(26) > td:nth-child(3) > h3 > nobr{
        font-weight: bold;
    }
    #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td:nth-child(3) > b{
        position: relative;
        left: -600px;
        top: 30px;
    }
   
    #part1 > table > tbody > tr.submittedRow{
        visibility: hidden;
    }

    input[type=password], input[type=text], input[type=file], select, .sp-peoplepicker-topLevel, .sp-peoplepicker-topLevelDisabled, .sp-peoplepicker-autoFillContainer, .ms-inputBox {
        border: 1px solid #ababab;
        background-color: #fff;
        background-color: rgba( 255,255,255,0.85 );
        color: #444;
        width: 250px;
        margin-right: 5px;
        min-height: 29px;
    }

    #statusId > td.ms-formlabel {
        width: 50px;
    }

#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2), #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2), #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2), #tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2){
        position: relative;
        float: none !important;
        right: 70px;
        padding-left: 5px;
        float: right;
        padding-top: 8px;
    }

    #Ribbon\2e ListForm\2e Edit\2e Commit, #Ribbon\2e ListForm\2e Edit\2e Clipboard, #Ribbon\2e ListForm\2e Edit\2e SpellCheck, #Ribbon\2e ListForm\2e Edit\2e Actions\2e DeleteItem-Large{
        display: none;
     }

    select, label, option {
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

    input[title="DEV"], 
    input[title="QA"], 
    input[title="PROD Required Field"] {
        width: 100px !important;
    }

    input[title="Member Price"],
    input[title="Non-Member Price"],
    input[title="Non-Affiliate Member Price"],
    input[title="New Member Price"],
    input[title="New Non-Member Price"],
    input[title="New Non-Affiliate Member Price"] {
        width: 100px;
    }
    
    #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(3) > h3, #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(3) > h3 {
        padding-right: 50px;
    }

    
    #hiddenRow{
        display: contents;
    }
    #commentsRowforApprover{
        display: grid;
    }

    input[title="Item Description Required Field"], input[title="Part Number"] {
        width: 430px;
    }

    #part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td:nth-child(5) > b > a {
        position: absolute;
        left: 950px;
        top: 320px;
        text-decoration: underline;
    }

    #productCodes{
        position: absolute;
        left: 0px;
        top: 138%;
        min-width: 176px;
        min-height: 175px;
    }

    #productCodesHeader{
        position: absolute;
        left: 950px;
        top: 135%;
        -webkit-appearance: push-button;
        -moz-appearance: button;
        appearance: button;
        padding: 3px;
        margin: 2px;
        min-width: 176px;
        text-align: center;
    }

    .ms-entity-resolved {
        text-decoration: none;
        display: inline-block;
    }

    #productCodesHeader{
        display: none;
    }

    #Ribbon\.ListForm\.Edit\.Actions-LargeLarge-0 {
        visibility: hidden;
    }

</style>
