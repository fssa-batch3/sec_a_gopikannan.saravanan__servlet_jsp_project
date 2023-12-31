<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PIN(People In Need) My donations</title>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/assets/css/directbanktransfer.css" />
    <link rel="stylesheet" href="<%=request.getContextPath() %>/assets/css/universal.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <script type="text/javascript">
      function togglemenu() {
        document.getElementById("sidebar").classList.toggle("active");
      }
    </script>
  </head>
  <body onload="getAccountsDetails()">
  <jsp:include page="/components/loader.jsp"></jsp:include>
    <!--  header starts-->
   <jsp:include page="/components/header1.jsp"></jsp:include>
    <!-- header ends -->


    <div class="paymentpage">Payment Page</div>
    <div class="container">
      <form class="bank-acc-details" method="post" action= "/pinapp/TransactionServlet">
     
        <div class="bank-acc-details-head">Direct Bank Transfer To Fundraiser</div>
	<input type="hidden" name="fundraiseid" id="fundraiseid" value="<%= request.getParameter("fundraiseid")%>">
	<input type="hidden" name="money" id="money" value="<%= request.getParameter("money")%>">
        <div class="input-div">
          <label> Account Holder Name</label><br />
          <input
         
            id="bankname"
            type="text"
            style="
              border-top: none;
              border-right: none;
              border-left: none;
              border-bottom: 2px solid #3f3a81;
              outline: none;
              color: black;
              font-size: 16px;
              font-weight: 500;
            "
          />
        </div>
        <div class="input-div">
          <label> Account Number</label><br />
          <input
         
            id="accno"
            type="text"
            style="
              border-top: none;
              border-right: none;
              border-left: none;
              border-bottom: 2px solid #3f3a81;
              outline: none;
              color: black;
              font-size: 16px;
              font-weight: 500;
            "
          />
        </div>
        <div class="input-div">
          <label> Account IFSC Code</label><br />
          <input
            id="ifsc"
            type="text"
            style="
              border-top: none;
              border-right: none;
              border-left: none;
              border-bottom: 2px solid #3f3a81;
              outline: none;
              color: black;
              font-size: 16px;
              font-weight: 500;
            "
          />
        </div>
        <div class="input-div">
          <label> Mobile NO</label><br />
          <input
            id="phno"
            type="tel"
            maxlength="10"
            style="
              border-top: none;
              border-right: none;
              border-left: none;
              border-bottom: 2px solid #3f3a81;
              outline: none;
              color: black;
              font-size: 16px;
              font-weight: 500;
            "
          />
        </div>

        <button id="Donate" >Donate</button>
      </form>
      
    <!--   <div class="receiver-details-acc">
        <div class="receiver-details-acc-head">Fundraiser's Bank Details</div>
        <div id="fundraiserbankname" class="receiver-acc"></div>

        <div id="fundraiseraccNo" class="receiver-acc">
          <label>Virtual A/C No :</label> 6999413500612645
        </div>
        <div id="fundraiseraccname" class="receiver-acc">
          <label>Virtual A/C Name :</label> Veera
        </div>
        <div id="fundraiserifc" class="receiver-acc">
          <label>IFSC :</label> YESB0CMSNOC
        </div>
        <div id="fundraiserPhno" class="receiver-acc">
          <label>Mobile-No:</label> 9990976534
        </div>
      </div> -->
    </div>
    <!-- Footer  -->
    <jsp:include page="/components/footer.jsp"></jsp:include>
    <!-- footer end -->
    
    <%
    String responseData = (String) request.getAttribute("responseData");
   
 %>
 
 



 <script src="<%=request.getContextPath() %>/assets/js/directbanktransfer.js"></script>  
 <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  </body>
</html>
