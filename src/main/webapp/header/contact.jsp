<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PIN(People In Need) Contact</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/assets/css/contact.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="stylesheet" href="<%= request.getContextPath() %>/assets/css/header.css" />
     <link rel="stylesheet" href="<%= request.getContextPath() %>/assets/css/footer.css" />
    <link rel="stylesheet" href="<%= request.getContextPath() %>/assets/css/universal.css" />
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
  <body>
    <!--  header starts-->
      <jsp:include page="/components/header1.jsp"></jsp:include>
    <!-- header ends -->

    <!-- banner section -->
    <div class="hero-sec">
      <img
        class="banner"
        src="<%= request.getContextPath() %>/assets/images/Contact us (2).png"
        alt="banner"
        width="100%"
      />
    </div>
    <!-- banner section ends-->
    <!-- address-map-section-starts -->
    <div class="container">
      <div class="contain">
        <div class="address">
          <img class="pin" src="<%= request.getContextPath() %>/assets/images/pin (2).png" alt="Pin" />
          <h1 style="padding: 5px">India</h1>
        </div>
        <div class="add">
          <p class="main-txt">
            <span id="address-head"> Address:</span><br />
            11&12 Duraiswamy !st Street, <br />Venkatraman Nagar,<br />Korattur,<br />Chennai-600080.
          </p>
        </div>
        <div class="email">
          <span id="mail-head">Email:</span>
          <p class="main-txt">organizationpin@gmail.com</p>
          <div class="phno">
            <span id="phno-head">Phone Number:</span>
            <p class="main-txt">637449159</p>
          </div>
        </div>
      </div>
      <div class="map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.811481806666!2d80.18358701520485!3d13.111126090764415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263886bd79353%3A0x3c7c97f59fd74311!2sDuraiswamy%20St%2C%20Venkatraman%20Nagar%2C%20Korattur%2C%20Chennai%2C%20Tamil%20Nadu%20600080!5e0!3m2!1sen!2sin!4v1670961438866!5m2!1sen!2sin"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <!-- address-map-section-end -->

    <div class="input">
      <form class="form">
        <h3>Give your feedback !!!</h3>
        <div class="details">
          <input
            id="name"
            type="text"
            name="fullname"
            placeholder="Name"
            pattern="^(?=.{2,50}$)[A-Za-z]+(?:\s[A-Za-z]+){0,3}$"
            title="Name must be only in alphabets and First name last name both can be added optional"
          />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email-Address"
          />
        </div>
        <textarea
          name="msg"
          id="msg"
          rows="4"
          placeholder="Message"
          pattern="^(?=.{0,300}$)[A-Za-z0-9!@#$%^&*()_+-={}[\]|\\;:'>,.?/]+[A-Za-z0-9]+(?:\s[A-Za-z0-9\s!@#$%^&*()_+-={}[\]|\\;:'>,.?/]+[A-Za-z0-9]+){0,50}$"
        ></textarea>
        <button type="submit" class="send">Send</button>
      </form>
    </div>

    <!-- Footer  -->
    <div class="footer"></div>

    <!-- footer end -->
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    <script>
      const username = document.getElementById("name");
      const mail = document.getElementById("email");
      const msg = document.getElementById("msg");
      const submit = document.getElementsByClassName("form")[0];

      submit.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("clicked");
        let bodyArr = [];
        let body = `
                    <b> Dear, </b>${username.value}
                    <br>
                    <b>Email:</b>${mail.value}
                    <br>
                    Thank you for reaching out to us at PIN. 
                    <br>
                    We appreciate your feedback and would be more than happy to assist you in any way we can.
                    <br>
                    <br>
                    We strive to provide our customers with the highest level of service, so please don't hesitate to contact us if you have any further queries.
                    <br>
                    <br>
                    Thank you again for getting in touch with us.
                    <br>
                    <br>
                    Best regards,
                    <br>
                    Gopikannan
                    <br>
                    PIN(People IN Need)
                    <br>`;
        if (localStorage.getItem("contactMails") !== null) {
          bodyArr = JSON.parse(localStorage.getItem("contactMails"));
        }

        let bodyObj = {
          username: username.value,
          mail: mail.value,
          msg: msg.value,
        };

        bodyArr.push(bodyObj);
        localStorage.setItem("contactMails", JSON.stringify(bodyArr));

        Email.send({
          SecureToken: "61e174bd-200e-43e6-8147-c712781653e8",
          To: mail.value.trim(),
          From: "organizationpin@gmail.com",
          Subject:
            "Dear " +
            username.value +
            " Thank you for your feedback your feedback has been recorded ",
          Body: body,
        }).then((message) => alert("Feedback sent successfully"));
      });
    </script>
     <script src="<%= request.getContextPath() %>/assets/js/footer.js"></script>
  </body>
</html>
