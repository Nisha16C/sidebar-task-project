document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebarContainer');
    const mainNav = document.getElementById('mainNav');
    const secondaryNav = document.getElementById('secondaryNav');
    const mainContent = document.getElementById('mainContent');
    const menuToggle = document.getElementById('menuToggle');
    const collapseToggle = document.getElementById('collapseToggle');
    const collapseHandle = document.getElementById('collapseHandle');
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeIcon = themeSwitcher.querySelector('i');
    const navItems = document.querySelectorAll('.nav-item[data-panel]');
    const panels = document.querySelectorAll('.panel');
    const navHeaders = document.querySelectorAll('.nav-header[data-toggle]');
    
    let isCollapsed = false;
    
    // Toggle sidebar collapse
    function toggleCollapse() {
        isCollapsed = !isCollapsed;
        sidebarContainer.classList.toggle('collapsed', isCollapsed);
        
        // Change icon direction
        const collapseIcon = collapseToggle.querySelector('i');
        const handleIcon = collapseHandle.querySelector('i');
        if (isCollapsed) {
            collapseIcon.classList.remove('fa-chevron-left');
            collapseIcon.classList.add('fa-chevron-right');
            
            handleIcon.classList.remove('fa-chevron-right');
            handleIcon.classList.add('fa-chevron-left');
        } else {
            collapseIcon.classList.remove('fa-chevron-right');
            collapseIcon.classList.add('fa-chevron-left');
            
            handleIcon.classList.remove('fa-chevron-left');
            handleIcon.classList.add('fa-chevron-right');
        }
    }
    
    // Toggle dropdown menus
    function toggleDropdown(header) {
        header.classList.toggle('active');
    }
    
    // Switch panels in secondary nav
    function switchPanel(panelName) {
        // Hide all panels
        panels.forEach(panel => {
            panel.style.display = 'none';
        });
        
        // Show selected panel
        document.getElementById(`${panelName}-panel`).style.display = 'block';
        
        // Update secondary nav title
        document.querySelector('.secondary-nav-title').textContent = panelName.charAt(0).toUpperCase() + panelName.slice(1);
    }
    
    // Toggle theme
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        
        // Update theme icon
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Add animation to cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('fade-in');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('fade-in');
        });
    }
    
    // Event listeners
    collapseToggle.addEventListener('click', toggleCollapse);
    collapseHandle.addEventListener('click', toggleCollapse);
    menuToggle.addEventListener('click', toggleCollapse);
    themeSwitcher.addEventListener('click', toggleTheme);
    
    // Add click events to nav items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Switch to the corresponding panel
            const panelName = this.getAttribute('data-panel');
            switchPanel(panelName);
            
            // Update page title
            document.querySelector('h1').textContent = panelName.charAt(0).toUpperCase() + panelName.slice(1);
        });
    });
    
    // Add click events to dropdown headers
    navHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleDropdown(this);
        });
    });
    
    // Handle responsive behavior on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Mobile view
            menuToggle.style.display = 'block';
            collapseToggle.style.display = 'none';
            
            if (!secondaryNav.classList.contains('expanded')) {
                sidebarContainer.classList.add('collapsed');
            }
        } else {
            // Desktop view
            menuToggle.style.display = 'none';
            collapseToggle.style.display = 'block';
            sidebarContainer.classList.remove('collapsed');
            secondaryNav.classList.remove('expanded');
        }
    });
    
    // Initialize for mobile view if needed
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        collapseToggle.style.display = 'none';
        sidebarContainer.classList.add('collapsed');
    }
});