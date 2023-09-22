let json = [];






const Pid = window.location.search;
const idParams = new URLSearchParams(Pid);
const getIDdetails = idParams.get("product_id");
console.log(getIDdetails);
let create_card = JSON.parse(localStorage.getItem("carddetails"));






let mail;
let fundraiseDetails;
function getAllAccounts() {
            const url = "/pinapp/GetAllFundraise";
            axios.get(url)
                .then(function (response) {
                    const fundraiseArr = response.data.fundraise;
                    /* To set the mail globally*/
                    mail = response.data.loggedInEmail;
                    /*Find the details of the card by find method*/	
					fundraiseDetails = fundraiseArr.find(function (e) {
  					let id = e.fundraiseid;

  					if (getIDdetails == id) {
   					 return true;
 					 }
					});

                    displayFundraise(fundraiseDetails);
                    paymentpage(mail,fundraiseDetails);
                })
                .catch(function (error) {
                    console.log(error);
                });
              
                
        }
        console.log(mail);
     
function displayFundraise(fundraiseDetails) {
	


   let amount_raised = parseInt(fundraiseDetails.amountReceived);
   let expected_amount = parseInt(fundraiseDetails.expectedAmount);
   let percentage = Math.floor((amount_raised / expected_amount) * 100);

let content;
content = document.createElement("div");
content.setAttribute("class", "content");

let heading;
heading = document.createElement("h4");
heading.innerText = fundraiseDetails.title;
content.append(heading);

let image;
image = document.createElement("img");
image.setAttribute("class", "image");
image.setAttribute("src", fundraiseDetails.coverPic);
image.setAttribute("alt", "fundraiserPic");
content.append(image);

let progress;
progress = document.createElement("div");
progress.setAttribute("class", "progress-sec");
content.append(progress);

let progress_div;
progress_div = document.createElement("div");
progress_div.setAttribute("class", "progressdiv");
progress.append(progress_div);

let para;
para = document.createElement("p");
para.setAttribute("id", "percent");
progress_div.append(para);

let b_tag;
b_tag = percentage + "%";
para.append(b_tag);

let progress_tag;
progress_tag = document.createElement("progress");
progress_tag.setAttribute("id", "file");
progress_tag.setAttribute("value", percentage);
progress_tag.setAttribute("max", "100");
progress_div.append(progress_tag);

let span_like;
span_like = document.createElement("span");
span_like.setAttribute("class", "like");
progress_div.append(span_like);

let span_anchor;
span_anchor = document.createElement("a");
span_anchor.setAttribute("href", "#");
span_like.append(span_anchor);

let share_img;
share_img = document.createElement("img");
share_img.setAttribute("class", "share");
share_img.setAttribute("src", "../assets/images/share (1).png");
share_img.setAttribute("alt", "share");
share_img.setAttribute("width", "30px");
span_anchor.append(share_img);

let amount;
amount = document.createElement("div");
amount.setAttribute("class", "amount");
progress.append(amount);

let amount_txt;
amount_txt = document.createElement("span");
amount_txt.setAttribute("id", "txt-amt");
amount_txt.innerHTML = "Raised:" + "&nbsp";
amount.append(amount_txt);

let amount_count;
amount_count = document.createElement("span");
amount_count.setAttribute("id", "class");
amount_count.innerHTML = ` Rs.<b>${fundraiseDetails.amountReceived}</b> out of <b>${fundraiseDetails.expectedAmount}</b>`;

amount.append(amount_count);

let storybtn;
storybtn = document.createElement("div");
storybtn.setAttribute("class", "story-btn");
storybtn.innerText = "Story";
content.append(storybtn);


const fullstory = fundraiseDetails["story"] ;
const splitIndex = Math.floor(fullstory.length / 4);
const summary = fullstory.substring(0,splitIndex);
const detailedStory = fullstory.substring(splitIndex);



let story;
story = document.createElement("div");
story.setAttribute("class", "story");
story.innerHTML = summary + "&nbsp" + "&nbsp";
content.append(story);

let story_more;
story_more = document.createElement("span");
story_more.setAttribute("id", "more");
story_more.innerText = detailedStory;
story.append(story_more);



let viewmore;
viewmore = document.createElement("div");
viewmore.setAttribute("class", "viewmore");
content.append(viewmore);

let img_document;
img_document = document.createElement("img");
img_document.setAttribute("id", "document");
img_document.setAttribute("style", "display:none;");
img_document.setAttribute("src", fundraiseDetails.document);
story.append(img_document);
let imgArrow;
imgArrow = document.createElement("img");
imgArrow.setAttribute(
  "src",
  "../assets/images/arrow-down-sign-to-navigate.png"
);
imgArrow.setAttribute("alt", "arrow");
imgArrow.setAttribute("class", "arrow");
viewmore.append(imgArrow);

let viewmoreBtn;
viewmoreBtn = document.createElement("div");
viewmoreBtn.setAttribute("style", "z-index: 5;");
viewmore.append(viewmoreBtn);

let btnview;
btnview = document.createElement("button");
btnview.setAttribute("id", "mybtn");
btnview.setAttribute("onclick", "myFunction()");
btnview.innerText = "View More";
viewmoreBtn.append(btnview);

let user1;
user1 = document.createElement("div");
user1.setAttribute("class", "user");
content.append(user1);

let nameLabel;
nameLabel = document.createElement("span");
nameLabel.setAttribute("class", "name-label");
nameLabel.innerHTML = `Created by `;
user1.append(nameLabel);

let userName;
userName = document.createElement("span");
userName.setAttribute("class", "username");
userName.innerHTML = ` <b>${fundraiseDetails.user.username}</b>`;
user1.append(userName);



// UPI box

let upibox;
upibox = document.createElement("div");
upibox.setAttribute("class", "upi-box");

let upihead;
upihead = document.createElement("div");
upihead.setAttribute("class", "upi-head");
upibox.append(upihead);

let spanFirsthead;
spanFirsthead = document.createElement("span");
spanFirsthead.setAttribute("id", "first-head");
spanFirsthead.innerText = "Donate";
upihead.append(spanFirsthead);

let spanSecondhead;
spanSecondhead = document.createElement("span");
spanSecondhead.setAttribute("id", "sec-head");
spanSecondhead.innerHTML = "Support";
upihead.append(spanSecondhead);

let donateBtn;
donateBtn = document.createElement("div");
donateBtn.setAttribute("class", "donate-btn-sec");
upibox.append(donateBtn);

let donatebutton;
donatebutton = document.createElement("button");
donatebutton.setAttribute("class", "donate-btn");
donatebutton.setAttribute("onclick", "paymentpage()");
donatebutton.innerText = "DONATE NOW";
donateBtn.append(donatebutton);

let carddetail;
carddetail = document.createElement("div");
carddetail.setAttribute("class", "card-detail");
carddetail.innerText = "Donate using Card,netbanking";
upibox.append(carddetail);

let qrimg;
qrimg = document.createElement("div");
qrimg.setAttribute("class", "qr-img");
upibox.append(qrimg);

let imageqr;
imageqr = document.createElement("img");
imageqr.setAttribute("src", fundraiseDetails["upiUrl"]);
imageqr.setAttribute("alt", "Qr");
imageqr.setAttribute("id", "qr");
qrimg.append(imageqr);

let upitxt;
upitxt = document.createElement("div");
upitxt.setAttribute("class", "upi-down-txt");
upitxt.innerText = "Or donate using UPI";
upibox.append(upitxt);

let imgqr;
imgqr = document.createElement("div");
imgqr.setAttribute("class", "img-qr");
upibox.append(imgqr);

let upiimg;
upiimg = document.createElement("img");
upiimg.setAttribute("class", "qr-img");
upiimg.setAttribute("src", "../assets/images/upi-icon.png");
upiimg.setAttribute("alt", "upiimg");
upiimg.setAttribute("width", "60");
upiimg.setAttribute("height", "60");
imgqr.append(upiimg);

let gpay;
gpay = document.createElement("img");
gpay.setAttribute("src", "../assets/images/google-pay-Logo-PNG_awihaa.png");
gpay.setAttribute("alt", "gpay");
gpay.setAttribute("width", "30");
gpay.setAttribute("height", "40");
gpay.setAttribute("class", "gpay");
gpay.setAttribute("style", "padding-bottom: -15px");
imgqr.append(gpay);

document.querySelector(".content-supporter-container").append(content, upibox);

function formatTimeAgo(timestamp) {
  const now = moment();
  const commentTime = moment(timestamp);
  const timeDiff = moment.duration(now.diff(commentTime));

  if (timeDiff.asMonths() >= 1) {
    return timeDiff.months() === 1
      ? "a month ago"
      : timeDiff.months() + " months ago";
  } else if (timeDiff.asDays() >= 1) {
    return timeDiff.days() === 1 ? "yesterday" : timeDiff.days() + " days ago";
  } else if (timeDiff.asHours() >= 1) {
    return timeDiff.hours() === 1
      ? "an hour ago"
      : timeDiff.hours() + " hours ago";
  } else if (timeDiff.asMinutes() >= 1) {
    return timeDiff.minutes() === 1
      ? "a minute ago"
      : timeDiff.minutes() + " minutes ago";
  } else {
    return timeDiff.asSeconds() <= 10
      ? "just now"
      : timeDiff.seconds() + " seconds ago";
  }
}

// url params user id
const getuserID = idParams.get("userid");

// check and userid and userid in the url
let userdetails = JSON.parse(window.localStorage.getItem("userDetails"));
let userid = JSON.parse(window.localStorage.getItem("userCheckdetails"));

if (userid == null) {
  let commentArr = JSON.parse(window.localStorage.getItem("commentmain"));
  let commentNewarr = [];

  for (let i = 0; i < commentArr.length; i++) {
    if (getIDdetails == commentArr[i]["fundraiseId"]) {
      commentNewarr.push(commentArr[i]);
    }
  }

  window.localStorage.setItem("comment", JSON.stringify(commentNewarr));

  let comment = JSON.parse(window.localStorage.getItem("comment"));

  for (let i = 0; i < comment.length; i++) {
    const formattedTimeAgo = formatTimeAgo(comment[i]["time"]);
    console.log("time", comment[i]["time"]);
    if (comment[i]["user_ID"] != null) {
      let commentMsg = document.createElement("div");
      commentMsg.setAttribute("class", "chat-message");

      let imgtxtspan;
      imgtxtspan = document.createElement("span");
      imgtxtspan.setAttribute("id", "imgtxtspan");
      commentMsg.append(imgtxtspan);

      let userImg;
      userImg = document.createElement("img");
      userImg.setAttribute("src", comment[i]["userpic"]);
      userImg.setAttribute("alt", "profile");
      userImg.setAttribute("width", "32");
      userImg.setAttribute("height", "32");
      userImg.setAttribute("style", "border-radius: 50%");
      imgtxtspan.append(userImg);

      let imgtxt;
      imgtxt = document.createElement("h5");
      imgtxt.setAttribute("id", "imgtxt");
      imgtxt.innerText = comment[i]["userName"];
      imgtxtspan.append(imgtxt);

      let msgcontent;
      msgcontent = document.createElement("div");
      msgcontent.setAttribute("class", "chat-message-content");
      commentMsg.append(msgcontent);

      let msg;
      msg = document.createElement("p");
      msg.setAttribute("style", "color: black");
      msg.innerText = comment[i]["msg"];
      msgcontent.append(msg);
      let spanTime;
      spanTime = document.createElement("div");
      spanTime.setAttribute("class", "chat-time");
      spanTime.innerHTML = `${formattedTimeAgo}  ${comment[i]["txt"]}`;
      msgcontent.append(spanTime);
      let hr;
      hr = document.createElement("hr");
      document.querySelector(".chat-history").append(commentMsg, hr);
    }
  }
  function send() {
    alert("You don't have an account to send a comment");
    window.location.href = "../../webpage/login-signup/login.html";
  }
} else {
  let user_id = userdetails.find(function (user) {
    let id_user = user["userid"];
    console.log(id_user);
    if (userid["userid"] == id_user) {
      return true;
    }
  });

  let commentArr = [];

  // function to send comment and to set in the local storage
  function send() {
    const msginput = document.getElementById("msg").value;
    const coverpic = user_id["user_pic"];
    const currentTime = moment();

    const Userid = user_id["userid"];

    const username = user_id["user_name"];

    const fundraiseid = fundraiseDetails["product_id"];

    const commentid = Date.now();

    if (msginput == "" || msginput == null) {
      alert("You can't send empty comment");
      return;
    } else {
      let commentObj = {
        userpic: coverpic,
        userName: username,
        user_ID: Userid,
        fundraiseId: fundraiseid,
        commentId: commentid,
        time: currentTime,
        msg: msginput,
        txt: "",
      };
      console.log(commentObj);
      commentArr.push(commentObj);
      window.localStorage.setItem("commentmain", JSON.stringify(commentArr));
    }
    location.reload();
  }

  // not to get value replace in the comment main array in the local storage
  if (localStorage.getItem("commentmain") !== null) {
    commentArr = JSON.parse(window.localStorage.getItem("commentmain"));
  }
  console.log(commentArr);

  let commentNewarr = [];

  // to show the appropriate fundraise card comment
  // loop to assignit to a new object then push it into the new array and store it in a localstorage
  for (let i = 0; i < commentArr.length; i++) {
    if (getIDdetails == commentArr[i]["fundraiseId"]) {
      commentNewarr.push(commentArr[i]);
    }
  }

  window.localStorage.setItem("comment", JSON.stringify(commentNewarr));

  let comment = JSON.parse(window.localStorage.getItem("comment"));

  // to read the comment by the donater

  for (let i = 0; i < comment.length; i++) {
    const formattedTimeAgo = formatTimeAgo(comment[i]["time"]);
    if (comment[i]["user_ID"] == user_id["userid"]) {
      let commentMsg = document.createElement("div");
      commentMsg.setAttribute("class", "chat-message");

      let imgtxtspan;
      imgtxtspan = document.createElement("span");
      imgtxtspan.setAttribute("id", "imgtxtspan");
      commentMsg.append(imgtxtspan);

      let userImg;
      userImg = document.createElement("img");
      userImg.setAttribute("src", comment[i]["userpic"]);
      userImg.setAttribute("alt", "profile");
      userImg.setAttribute("width", "32");
      userImg.setAttribute("height", "32");
      userImg.setAttribute("style", "border-radius: 50%");
      imgtxtspan.append(userImg);

      let imgtxt;
      imgtxt = document.createElement("h5");
      imgtxt.setAttribute("id", "imgtxt");
      imgtxt.innerText = comment[i]["userName"];
      imgtxtspan.append(imgtxt);

      let msgcontent;
      msgcontent = document.createElement("div");
      msgcontent.setAttribute("class", "chat-message-content");
      commentMsg.append(msgcontent);

      let msg;
      msg = document.createElement("p");
      msg.setAttribute("style", "color: black");
      msg.innerHTML = `${comment[i]["msg"]} `;
      msg.setAttribute("id", "msg_content");
      msgcontent.append(msg);

      let spanTime;
      spanTime = document.createElement("div");
      spanTime.setAttribute("class", "chat-time");
      spanTime.innerHTML = `${formattedTimeAgo}  ${comment[i]["txt"]}`;
      msgcontent.append(spanTime);

      let editDeldiv;
      editDeldiv = document.createElement("div");
      editDeldiv.setAttribute("class", "editdeldiv");
      commentMsg.append(editDeldiv);

      let edit;
      edit = document.createElement("img");
      edit.setAttribute("src", "../../Assets/images/draw.png");
      edit.setAttribute("width", "20");
      edit.setAttribute("height", "20");
      edit.setAttribute("onclick", "edit(this.id)");
      edit.setAttribute("id", comment[i]["commentId"]);
      edit.setAttribute("class", "edit");
      edit.setAttribute("style", "cursor:pointer");
      editDeldiv.append(edit);

      let del;
      del = document.createElement("img");
      del.setAttribute("src", "../../Assets/images/delete.png");
      del.setAttribute("width", "20");
      del.setAttribute("height", "20");
      del.setAttribute("id", comment[i]["commentId"]);
      del.setAttribute("onclick", "deleted(this.id),del()");
      del.setAttribute("style", "cursor:pointer");
      editDeldiv.append(del);

      let hr;
      hr = document.createElement("hr");

      document.querySelector(".chat-history").append(commentMsg, hr);
    } else {
      let commentMsg = document.createElement("div");
      commentMsg.setAttribute("class", "chat-message");

      let imgtxtspan;
      imgtxtspan = document.createElement("span");
      imgtxtspan.setAttribute("id", "imgtxtspan");
      commentMsg.append(imgtxtspan);

      let userImg;
      userImg = document.createElement("img");
      userImg.setAttribute("src", comment[i]["userpic"]);
      userImg.setAttribute("alt", "profile");
      userImg.setAttribute("width", "32");
      userImg.setAttribute("height", "32");
      userImg.setAttribute("style", "border-radius: 50%");
      imgtxtspan.append(userImg);

      let imgtxt;
      imgtxt = document.createElement("h5");
      imgtxt.setAttribute("id", "imgtxt");
      imgtxt.innerText = comment[i]["userName"];
      imgtxtspan.append(imgtxt);

      let msgcontent;
      msgcontent = document.createElement("div");
      msgcontent.setAttribute("class", "chat-message-content");
      commentMsg.append(msgcontent);

      let msg;
      msg = document.createElement("p");
      msg.setAttribute("style", "color: black");
      msg.innerText = comment[i]["msg"];
      msgcontent.append(msg);
      let spanTime;
      spanTime = document.createElement("div");
      spanTime.setAttribute("class", "chat-time");
      spanTime.innerHTML = `${formattedTimeAgo}  ${comment[i]["txt"]}`;
      msgcontent.append(spanTime);
      let hr;
      hr = document.createElement("hr");
      document.querySelector(".chat-history").append(commentMsg, hr);
    }
  }
}
let form;
form = document.createElement("form");

let form2;
form2 = document.createElement("form");

form.prepend(form2);

let fieldset2;
fieldset2 = document.createElement("fieldset");
fieldset2.setAttribute("id", "editfieldset");
form2.append(fieldset2);

let editinput;
editinput = document.createElement("input");
editinput.setAttribute("type", "text");
editinput.setAttribute("autocomplete", "off");
editinput.setAttribute("id", "editinput");
editinput.setAttribute("placeholder", "edit Your message");
fieldset2.append(editinput);

let sendIcon2;
sendIcon2 = document.createElement("img");
sendIcon2.setAttribute("src", "../../Assets/images/send-message.png");
sendIcon2.setAttribute("alt", "send");
sendIcon2.setAttribute("class", "send");
sendIcon2.setAttribute("onclick", "sendedit()");
sendIcon2.setAttribute("width", "20");
sendIcon2.setAttribute("height", "20");
sendIcon2.setAttribute("style", "padding-top: 5px");
fieldset2.append(sendIcon2);

let fieldset;
fieldset = document.createElement("fieldset");
form.append(fieldset);

let inputMsg;
inputMsg = document.createElement("input");
inputMsg.setAttribute("type", "text");
inputMsg.setAttribute("autocomplete", "off");
inputMsg.setAttribute("id", "msg");
inputMsg.setAttribute("placeholder", "Send your message");
fieldset.append(inputMsg);

let sendIcon;
sendIcon = document.createElement("img");
sendIcon.setAttribute("src", "../../Assets/images/send-message.png");
sendIcon.setAttribute("alt", "send");
sendIcon.setAttribute("class", "send");
sendIcon.setAttribute("onclick", "send()");

sendIcon.setAttribute("width", "20");
sendIcon.setAttribute("height", "20");
sendIcon.setAttribute("style", "padding-top: 5px");
fieldset.append(sendIcon);

document.querySelector(".chat-history").append(form);

// to edit the comment
function edit(id) {
  window.localStorage.setItem("commentId", JSON.stringify(id));
  document.getElementById("editfieldset").classList.toggle("active");
  let userallComments = JSON.parse(window.localStorage.getItem("commentmain"));
  let userCommentId = JSON.parse(window.localStorage.getItem("commentId"));
  if (userCommentId != null) {
    let Com = userallComments.find(function (comment) {
      let Comment = parseInt(comment["commentId"]);
      console.log(Comment);

      if (userCommentId == Comment) {
        return true;
      }
    });
    console.log(Com);

    let msg;
    msg = document.getElementById("editinput").value = Com["msg"];
  }
}

function deleted(commentid) {
  let commentId = commentid;
  window.localStorage.setItem("delId", JSON.stringify(commentId));
}

function sendedit() {
  let userallComments = JSON.parse(window.localStorage.getItem("commentmain"));
  let userCommentId = JSON.parse(window.localStorage.getItem("commentId"));
  console.log(userCommentId);
  let Com = userallComments.find(function (comment) {
    let Comment = parseInt(comment["commentId"]);
    console.log(Comment);

    if (userCommentId == Comment) {
      return true;
    }
  });
  let msg = document.getElementById("editinput").value;

  let time = moment();
  let txt = "(edited)";

  let neweditObj = {
    msg,
    time,
    txt,
  };
  console.log(neweditObj);
  let merge;
  merge = Object.assign(Com, neweditObj);
  let usereditmsg;
  usereditmsg = userallComments.indexOf(Com);
  userallComments[usereditmsg] = merge;
  window.localStorage.setItem("commentmain", JSON.stringify(userallComments));
  window.localStorage.removeItem("commentId");
  location.reload();
}

// to delete the comment

function del(commentid) {
  let userallComments = JSON.parse(window.localStorage.getItem("commentmain"));
  let userCommentId = JSON.parse(window.localStorage.getItem("delId"));
  console.log(userCommentId);
  let Com = userallComments.find(function (comment) {
    let Comment = parseInt(comment["commentId"]);
    console.log(Comment);

    if (userCommentId == Comment) {
      return true;
    }
  });
  console.log(Com);

  let commentINdex = userallComments.indexOf(Com);

  let alertComfirm = confirm("Are you sure you want to delete this comment");

  if (alertComfirm) {
    window.localStorage.setItem("commentId", JSON.stringify(commentid));
    userallComments.splice(commentINdex, 1);
    window.localStorage.setItem("commentmain", JSON.stringify(userallComments));
    location.reload();
  } else {
    return;
  }
}
}


/*To redirect to donation page but with only if login*/
function paymentpage() {
	
  if (mail == null) {
    window.location.href = "../login-signup/login.jsp";
  } else {
    window.location.href = "../donate/payment1stpage.jsp?product_id=" +
      fundraiseDetails["fundraiseid"];
      
  }
}


console.log(fundraiseDetails);
// function to view story and document more and less
 function myFunction() {
    	  
    	  let viewButton= document.getElementById("mybtn");
    	  let content = document.getElementById("more");
    	  
    	  
    	  if(viewButton.textContent==="View More"){
        document.getElementById("more").style.display = "inline";
        document.getElementById("document").style.display = "inline";
        viewButton.textContent = "View Less";
    	  }
    	  else{
    		  
    		  document.getElementById("more").style.display = "none";
    	        document.getElementById("document").style.display = "none";
    	        viewButton.textContent = "View More";
    	  }
        
      }
      
      
      