// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
        contactForm.reset();
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu a');
    
    menuItems.forEach(item => {
      const itemPath = item.getAttribute('href');
      if (currentLocation.includes(itemPath) && itemPath !== 'index.html') {
        item.classList.add('active');
      } else if (currentLocation.endsWith('/') && itemPath === 'index.html') {
        item.classList.add('active');
      }
    });
  });