Feature: Forgot Password

  # Scenario 1: Mengirim permintaan reset password dengan username yang valid
  Scenario: Reset password dengan username yang valid
    Given Pengguna berada di halaman forgot password
    When Pengguna mengisi username "Admin"
    And Pengguna mengklik tombol reset password
    Then Pengguna melihat pesan sukses "Reset Password link sent successfully"

  # Scenario 2: Mengirim permintaan reset password tanpa mengisi username
  Scenario: Reset password tanpa mengisi username
    Given Pengguna berada di halaman forgot password
    When Pengguna mengklik tombol reset password tanpa mengisi username
    Then Pengguna melihat pesan error pada field username "Required"
