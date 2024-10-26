Feature: Login

  Background:
    Given Pengguna berada di halaman login

  # Scenario 1: Login dengan kredensial yang valid
  Scenario: Login sukses
    When Pengguna mengisi username "Admin" dan password "admin123"
    And Pengguna mengklik tombol login
    Then Pengguna akan masuk ke halaman dashboard

  # Scenario 2-4: Login gagal dengan kombinasi username/password yang salah
  Scenario Outline: Login gagal dengan username atau password yang salah
    When Pengguna mengisi username "<username>" dan password "<password>"
    And Pengguna mengklik tombol login
    Then Pengguna melihat pesan error "<errorMessage>"

    Examples:
      | username       | password    | errorMessage                   |
      | Admin          | wrongPass   | Invalid credentials            |
      | wrongUser      | admin123    | Invalid credentials            |
      | wrongUser      | wrongPass   | Invalid credentials            |

  # Scenario 5: Login gagal dengan username dan password kosong
  Scenario: Login gagal tanpa mengisi username dan password
    When Pengguna mengklik tombol login tanpa mengisi username dan password
    Then Pengguna melihat pesan "Required" di kolom username dan password
