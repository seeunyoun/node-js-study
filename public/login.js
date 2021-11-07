window.onload = () => {
  const btn = document.getElementById("btnLogIn");
  btn.addEventListener("click", async () => {
    const idVal = document.getElementById("id").value;
    const pwVal = document.getElementById("pw").value;

    if (!idVal || !pwVal) return alert("빈 칸을 채우시오!");

    try {
      const axiosStatus = await axios.post("/login", {
        idVal,
        pwVal,
      });
  
      const { status } = axiosStatus.data;

      if (status == "success") {
        alert("로그인 성공");
        location.href = "/update";
      } else if (status == "fail") {
        location.reload();
      }

    } catch (error) {
      const failStatus = error.response.data.status;
      let alertMsg;
      switch (failStatus) {
        case "fail":
          alertMsg = "id나 pw가 틀렸음."
      }

      // console.log(error.response.data.status);
    alert(alertMsg);
  }

  });
}