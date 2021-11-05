window.onload = () => {
  const btn = document.getElementById("btnSignUp");
  btn.addEventListener("click", async () => {
    const idVal = document.getElementById("id").value;
    const pwVal = document.getElementById("pw").value;
    const nameVal = document.getElementById("name").value;
    const emailVal = document.getElementById("email").value;

    if (!idVal || !pwVal || !nameVal || !emailVal) return alert("빈 칸을 채우시오!");

    try {
      const axiosStatus = await axios.post("/signup", {
        idVal,
        pwVal,
        nameVal,
        emailVal
      });
  
      const { status } = axiosStatus.data;
  
      if (status == "duplicated") {
        alert("id가 중복")
      } else if (status == "success") {
        alert("회원가입 성공")
        location.reload();
        // location.href = "/login";
      }
  
    } catch (error) {
      const failStatus = error.response.data.status;
      let alertMsg;
      switch (failStatus) {
        case "duplicated":
          alertMsg = "중복 아이디입니다."
      }

      // console.log(error.response.data.status);
    alert(error);
  }

  });
}