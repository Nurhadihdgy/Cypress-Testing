Feature: Login to OrangeHRM

  Scenario: Login dengan kredensial yang valid
    Given Pengguna berada di halaman login
    When Pengguna mengisi username "Admin" dan password "admin123"
    And Pengguna mengklik tombol login
    Then Pengguna akan masuk ke halaman dashboard

  Scenario: Login gagal dengan username yang salah
    Given Pengguna berada di halaman login
    When Pengguna mengisi username "useradmin" dan password "admin123"
    And Pengguna mengklik tombol login
    Then Pengguna melihat pesan error "Invalid credentials"

  Scenario: Login gagal dengan password yang salah
    Given Pengguna berada di halaman login
    When Pengguna mengisi username "Admin" dan password "wrongpassword"
    And Pengguna mengklik tombol login
    Then Pengguna melihat pesan error "Invalid credentials"

  Scenario: Login gagal dengan username dan password yang salah
    Given Pengguna berada di halaman login
    When Pengguna mengisi username "useradmin" dan password "wrongpassword"
    And Pengguna mengklik tombol login
    Then Pengguna melihat pesan error "Invalid credentials"

  Scenario: Login gagal dengan username dan password kosong
    Given Pengguna berada di halaman login
    When Pengguna mengklik tombol login tanpa mengisi username dan password
    Then Pengguna melihat pesan "Required" di kolom username dan password

  Scenario: Pengguna berhasil logout dari aplikasi
    Given Pengguna sudah login dengan username "Admin" dan password "admin123"
    When Pengguna mengklik tombol logout
    Then Pengguna akan kembali ke halaman login


