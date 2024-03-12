var counter = 0;
var isInit = false;
var fr = false;
var sr = false;
var regex = /^[0-9,-]+$/;
function typingListener() {
  let text = document.getElementById("myInput").value;
  if (counter > text.length && isInit && counter < 3) {
    isInit = false;
  }
  if (text[0] == 0) {
    if (text.length == 4 && fr && !isInit) {
      fr = false;
      document.getElementById("myInput").value = text.slice(0, -1);
    } else if (text.length == 4 && fr == false && !isInit) {
      fr = true;
      document.getElementById("myInput").value =
        text.slice(0, 3) + "-" + text.slice(3, 4);
    } else if (text.length == 8 && sr == false && !isInit) {
      sr = true;
      document.getElementById("myInput").value =
        text.slice(0, 7) + "-" + text.slice(7, 8);
    } else if (text.length == 8 && sr && !isInit) {
      sr = false;
      document.getElementById("myInput").value = text.slice(0, -1);
    }
    if (text.length == 13 && !isInit) {
      document.getElementById("myInput").value =
        text.slice(0, 3) + text.slice(4, 7) + text.slice(8, 13);
      isInit = true;
    }
  } else {
    if (text.length == 3 && fr && !isInit) {
      fr = false;
      document.getElementById("myInput").value = text.slice(0, -1);
    } else if (text.length == 3 && fr == false && !isInit) {
      fr = true;
      document.getElementById("myInput").value =
        text.slice(0, 2) + "-" + text.slice(2, 3);
    } else if (text.length == 7 && sr == false && !isInit) {
      sr = true;
      document.getElementById("myInput").value =
        text.slice(0, 6) + "-" + text.slice(6, 7);
    } else if (text.length == 7 && sr && !isInit) {
      sr = false;
      document.getElementById("myInput").value = text.slice(0, -1);
    }
    if (text.length == 12 && !isInit) {
      document.getElementById("myInput").value =
        text.slice(0, 2) + text.slice(3, 6) + text.slice(7, 12);
      isInit = true;
    }
  }
  text = document.getElementById("myInput").value;
  if (!regex.test(text)&&text.length>0) {
    alert("Please enter only numeric characters.");
    document.getElementById("myInput").value = "";
    document.getElementById("demo").style.display = "none";
    document.getElementById("counter").style.display = "none";
    return ;
  }
  counter = text.length;
  if (document.getElementById("myInput").value == "") {
    document.getElementById("demo").style.display = "none";
    document.getElementById("counter").style.display = "none";
  } else {
    
    document.getElementById("demo").style.display = "block";
    document.getElementById("counter").style.display = "none";
    document.getElementById("demo").innerHTML = "You wrote : " + text;
    // document.getElementById("counter").innerHTML = "Count : " + text.length;
  }
}
function typeListenerAPI() {
  let text = document.getElementById("myInput2").value;
  if (!regex.test(text)&&text.length>0) {
    alert("Please enter only numeric characters.");
    document.getElementById("myInput2").value = "";
    return ;
  }
  const apiUrl = "/get";
  const requestBody = String(text);
  const headers = {
    "Content-Type": "text/plain",
  };
  const fetchOptions = {
    method: "POST",
    headers: headers,
    body: requestBody,
    crossorigin: true,
    mode: "no-cors",
  };
  console.log(requestBody);
  fetch(apiUrl, fetchOptions)
    .then((response) => {
      if (response.ok) {
        document.getElementById("response").innerHTML =
          `status : ` + response.status;
        return response.text();
      } else {
        document.getElementById("response").innerHTML =
          `status : ` + response.status;
        throw new Error(`API request failed with status: ${response.status}`);
      }
    })
    .then((textData) => {
      console.log(textData);
      document.getElementById("myInput2").value = textData;
    })
    .catch((error) => {
      document.getElementById("response").innerHTML =
        `status : ` + error.status;
      console.error("Error:", error);
    });

  if (document.getElementById("myInput2").value == "") {
    document.getElementById("response").style.display = "none";
  }
}
