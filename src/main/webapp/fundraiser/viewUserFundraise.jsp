<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Your Fundraise Campaigns</title>
<link rel="stylesheet" href="./assets/css/universal.css">
</head>
<style>
.fundraise-card {
	border: 1px solid #ccc;
	padding: 10px;
	margin: 10px;
	max-width: 300px;
	height: auto;
	 background-color: white;
}

.fundraise-card h2 {
	margin: 0;
}

#coverpic {
	max-width: 100%;
	max-height: 200px;
	display: block;
	margin: auto;
}
h1,h3{
 text-align: center;
 margin-top:10px;}

#fundraiseContainer {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
}

#success{
color:green;
font-size:18px;
}

</style>
</head>
<body>
<jsp:include page="/components/loader.jsp"></jsp:include>
<jsp:include page="/components/header1.jsp"></jsp:include>
	<h1>User Fundraise Campaigns</h1>
	
		<%
				String successMessage = request.getParameter("successMessage");
				if (successMessage != null) {
					out.println("<p id='success'>" + successMessage + "</p>");
				}
				%>

	<div class="fundraise-cards" id="fundraiseContainer">
		<c:forEach var="fundraise" items="${requestScope.FUNDRAISE}">
			<div class="fundraise-card">
				<h2>${fundraise.title}</h2>
				<p>Cause: ${fundraise.cause}</p>
				<p>Expected Amount : ${fundraise.expectedAmount}
				<img id="coverpic" src="<c:url value='${fundraise.coverPic}'/>"
					alt="Fundraise Cover"> <a
					href="UpdateFundraiseServlet?fundraiseId=${fundraise.fundraiseid}">Edit</a>
				<a href="#" onclick="confirmDelete('${fundraise.fundraiseid}');">Delete</a>
			</div>
		</c:forEach>
	</div>

	<script>
		function confirmDelete(fundraiseId) {
			if (confirm('Are you sure you want to delete this fundraise?')) {
				window.location.href = 'DeleteFundraiseServlet?fundraiseId='
						+ fundraiseId;
			}
		}
	</script>
</html>