window.onload = () => {
  const btn = document.getElementById("btnUpdate");
  btn.addEventListener("click", async () => {
    const idVal = document.getElementById("id").value;
    const pwVal = document.getElementById("pw").value;
    const nameVal = document.getElementById("name").value;
    const emailVal = document.getElementById("email").value;

    if (!idVal || !pwVal || !nameVal || !emailVal) return alert("빈 칸을 채우시오!");

    try {
      const axiosStatus = await axios.put("/update", {
        idVal,
        pwVal,
        nameVal,
        emailVal
      });
  
      const { status } = axiosStatus.data;

      if (status == "success") {
        alert("회원정보 수정 성공");
        location.href = "/";
      } else if (status == "fail") {
        location.reload();
      }

    } catch (error) {
      alert('해당 유저 없음');
  }

  });
}