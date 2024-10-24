describe('OrangeHRM Login Test Suite', () => {
  
  it('TC-001: Pengguna Dapat Login Ke Aplikasi', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
    // Input Username dan Password valid
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    
    // Klik tombol login
    cy.get('button[type="submit"]').click()

    // Assertion: Verifikasi bahwa halaman dashboard berhasil dimuat
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-userdropdown-name').should('contain', 'manda user')
  })

  it('TC-002: Pengguna Gagal Login Ke Aplikasi Dengan Username Salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
    // Input Username tidak valid dan Password
    cy.get('input[placeholder="Username"]').type('useradmin')
    cy.get('input[placeholder="Password"]').type('admin123')
    
    // Klik tombol login
    cy.get('button[type="submit"]').click()

    // Assertion: Verifikasi error message muncul
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  it('TC-003: Pengguna Gagal Login Dengan Password Salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
    // Input Username valid dan Password tidak valid
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('wrongpassword')
    
    // Klik tombol login
    cy.get('button[type="submit"]').click()

    // Assertion: Verifikasi error message muncul
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  it('TC-004: Pengguna Gagal Login Dengan Username dan Password Yang Salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
    // Input Username valid dan Password tidak valid
    cy.get('input[placeholder="Username"]').type('useradmin')
    cy.get('input[placeholder="Password"]').type('wrongpassword')
    
    // Klik tombol login
    cy.get('button[type="submit"]').click()

    // Assertion: Verifikasi error message muncul
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  it('TC-005: Pengguna Gagal Login Dengan Username dan Password Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
    // Biarkan kolom username dan password kosong
    cy.get('button[type="submit"]').click()
  
    // Assertion: Verifikasi bahwa tanda merah dan pesan "required" muncul pada kolom username dan password
    cy.get('input[placeholder="Username"]').should('have.css', 'border-color', 'rgb(235, 9, 16)')  // Warna merah pada field username
    cy.get('input[placeholder="Password"]').should('have.css', 'border-color', 'rgb(235, 9, 16)')  // Warna merah pada field password
    
    // Verifikasi pesan "Required" muncul di bawah input username dan password
    cy.get('.oxd-input-group > .oxd-text').eq(0).should('contain', 'Required')  // Pesan di bawah input username
    cy.get('.oxd-input-group > .oxd-text').eq(1).should('contain', 'Required')  // Pesan di bawah input password
  })
  

  it('TC-006: Pengguna Berhasil Logout Dari Aplikasi', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
    // Login terlebih dahulu
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
  
    // Tunggu halaman dashboard selesai dimuat
    cy.wait(2000) // Tunggu 2 detik 
  
    // Klik dropdown user
    cy.get('.oxd-userdropdown-name').click()
    
    // Pilih opsi Logout
    cy.get('a.oxd-userdropdown-link').contains('Logout').click()
  
    // Assertion: Verifikasi kembali ke halaman login
    cy.url().should('include', '/auth/login')
  })
  
})

