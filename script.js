document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logout');
    const sidebarLinks = document.querySelectorAll('.sidebar nav ul li a');
    const contentViews = document.querySelectorAll('.main-content .content-view');
    const sendToAIButton = document.getElementById('sendToAI');
    const userInput = document.getElementById('userInput');
    const chatArea = document.getElementById('chat-area');
    const suggestionsList = document.getElementById('suggestions-list');
    const createNewCampaignBtn = document.getElementById('createNewCampaignBtn');
    const campaignListView = document.querySelector('#campaigns-view .campaign-list');

    // Simulated Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you'd validate credentials here
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        });
    }

    // Simulated Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html'; // Redirect to login page
        });
    }

    // Sidebar Navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (link.id === 'logout') return; // Handled separately

            const targetViewId = link.getAttribute('data-target');

            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target view and hide others
            contentViews.forEach(view => {
                if (view.id === targetViewId) {
                    view.classList.add('active-view');
                } else {
                    view.classList.remove('active-view');
                }
            });
        });
    });

    // Chart.js - Simulated Data
    function renderCharts() {
        if (document.getElementById('campaignPerformanceChart')) {
            new Chart(document.getElementById('campaignPerformanceChart'), {
                type: 'line',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                    datasets: [{
                        label: 'Impresiones',
                        data: [1200, 1900, 3000, 5000, 2300, 3200],
                        borderColor: '#3498db',
                        tension: 0.1
                    }, {
                        label: 'Conversiones',
                        data: [100, 150, 280, 450, 200, 300],
                        borderColor: '#2ecc71',
                        tension: 0.1
                    }]
                }
            });
        }

        if (document.getElementById('platformViewsChart')) {
            new Chart(document.getElementById('platformViewsChart'), {
                type: 'doughnut',
                data: {
                    labels: ['Facebook', 'Instagram', 'Google Ads', 'LinkedIn', 'Twitter'],
                    datasets: [{
                        label: 'Vistas por Plataforma',
                        data: [300000, 450000, 200000, 150000, 150000],
                        backgroundColor: ['#3b5998', '#e4405f', '#fbbc05', '#0077b5', '#1da1f2']
                    }]
                }
            });
        }
    }

    // AI Chat Simulation
    if (sendToAIButton) {
        sendToAIButton.addEventListener('click', () => {
            const messageText = userInput.value.trim();
            if (messageText) {
                appendMessage(messageText, 'user-message');
                userInput.value = '';
                simulateAIResponse(messageText);
            }
        });
    }
    
    if (userInput) {
         userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendToAIButton.click();
            }
        });
    }

    function appendMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(type);
        messageDiv.textContent = text;
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight; // Scroll to bottom
    }

    function simulateAIResponse(userMessage) {
        setTimeout(() => {
            let aiReply = "Entendido. Procesando tu solicitud sobre: '" + userMessage + "'.";
            appendMessage(aiReply, 'ai-message');

            // Simulate generating suggestions
            suggestionsList.innerHTML = ''; // Clear previous suggestions
            const prompts = [
                `Copy para anuncio de Facebook: "Descubre cómo ${userMessage} puede transformar tu negocio. ¡Oferta especial por tiempo limitado!"`,
                `Tweet: " revolucionando el mercado con ${userMessage}. #innovacion #${userMessage.split(' ')[0] || 'marketing'} #AI"`,
                `Idea para post de blog: "5 Maneras en que ${userMessage} está cambiando las reglas del juego."`,
                `Script corto para video: "Intro: ¿Cansado de [problema común]? Presentamos ${userMessage}, la solución IA que..."`
            ];

            prompts.forEach(prompt => {
                const listItem = document.createElement('li');
                listItem.textContent = prompt;
                suggestionsList.appendChild(listItem);
            });

        }, 1000 + Math.random() * 1000);
    }

    // Campaign Management Simulation
    let campaigns = [
        { id: 1, name: 'Lanzamiento Producto X', status: 'active', budget: 5000, channel: 'Google Ads & Facebook' },
        { id: 2, name: 'Promoción Verano 2024', status: 'paused', budget: 3000, channel: 'Instagram Stories' },
        { id: 3, name: 'Webinar IA en Marketing', status: 'completed', budget: 1500, channel: 'LinkedIn & Email' },
    ];

    function renderCampaigns() {
        if (!campaignListView) return;
        campaignListView.innerHTML = ''; // Clear existing list

        if (campaigns.length === 0) {
            campaignListView.innerHTML = '<p>No hay campañas creadas aún.</p>';
            return;
        }

        campaigns.forEach(campaign => {
            const campaignItem = document.createElement('div');
            campaignItem.classList.add('campaign-item');
            campaignItem.innerHTML = `
                <h4>${campaign.name}</h4>
                <p><strong>Estado:</strong> <span class="status ${campaign.status}">${campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</span></p>
                <p><strong>Presupuesto:</strong> $${campaign.budget}</p>
                <p><strong>Canales:</strong> ${campaign.channel}</p>
            `;
            campaignListView.appendChild(campaignItem);
        });
    }

    if (createNewCampaignBtn) {
        createNewCampaignBtn.addEventListener('click', () => {
            // Simulate opening a modal or navigating to a campaign creation form
            // For this demo, we'll switch to the IA tools view and focus the input
            const iaToolsLink = document.querySelector('a[data-target="ia-tools-view"]');
            if (iaToolsLink) {
                iaToolsLink.click();
                setTimeout(() => {
                    if (userInput) userInput.focus();
                    if (chatArea) {
                         appendMessage('Ok, vamos a crear una nueva campaña. Dime, ¿cuál es el objetivo principal o el producto/servicio a promocionar?', 'ai-message');
                    }
                }, 100); // Small delay for view transition
            }
            // Optionally, add a new campaign to the list for demonstration
            const newCampaignName = prompt("Nombre de la nueva campaña (simulado):");
            if (newCampaignName) {
                const newCampaign = {
                    id: campaigns.length + 1,
                    name: newCampaignName,
                    status: 'active',
                    budget: Math.floor(Math.random() * 5000) + 1000,
                    channel: 'Multi-channel (simulado)'
                };
                campaigns.push(newCampaign);
                renderCampaigns(); // Re-render campaigns if the view is active or when navigating back
                 const campaignsLink = document.querySelector('a[data-target="campaigns-view"]');
                 if(campaignsLink) campaignsLink.click(); // Go back to campaigns view
            }
        });
    }

    // Initial setup
    if (window.location.pathname.endsWith('dashboard.html')) {
        renderCharts();
        renderCampaigns();
        // Ensure the dashboard view is active on load
        document.getElementById('dashboard-view').classList.add('active-view');
        document.querySelector('.sidebar nav ul li a[data-target="dashboard-view"]').classList.add('active');
    }
}); 