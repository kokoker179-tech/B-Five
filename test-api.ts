(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        newPassword: 'newpassword123',
        adminSecret: 'kerolos1122'
      })
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (e) {
    console.error(e);
  }
})();
