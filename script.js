document.addEventListener('DOMContentLoaded', function() {
  // Dark/Light Mode Toggle
  const toggleModeBtn = document.getElementById('toggleMode');
  const modeIcon = toggleModeBtn.querySelector('i');
  
  // Check for saved user preference or use system preference
  const savedMode = localStorage.getItem('mode');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    modeIcon.classList.replace('fa-moon', 'fa-sun');
    toggleModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }
  
  toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      modeIcon.classList.replace('fa-moon', 'fa-sun');
      toggleModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
      localStorage.setItem('mode', 'dark');
    } else {
      modeIcon.classList.replace('fa-sun', 'fa-moon');
      toggleModeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
      localStorage.setItem('mode', 'light');
    }
  });
  
  // PDF Download Button
  document.getElementById('downloadBtn').addEventListener('click', () => {
    // In a real implementation, this would link to your PDF
    alert("PDF download functionality will be implemented soon!");
  });
  
  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Enhanced Form Submission with Formspree
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const status = document.createElement('div');
      status.id = 'formStatus';
      status.className = 'form-status';
      contactForm.appendChild(status);
      
      // Change button to loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          status.innerHTML = 'Thank you! Your message has been sent.';
          status.style.color = '#38a169'; // Green
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        status.innerHTML = 'Oops! Something went wrong. Please try again or email me directly.';
        status.style.color = '#e53e3e'; // Red
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        // Hide status message after 5 seconds
        setTimeout(() => {
          status.innerHTML = '';
        }, 5000);
      }
    });
  }
});