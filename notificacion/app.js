class NotificationSystem {
    constructor() {
        console.log("🔍 INICIANDO DEBUG...");
        
        // Verificar cada elemento uno por uno
        this.btn = document.getElementById('notificationBtn');
        console.log("1. Botón:", this.btn);
        
        this.dropdown = document.getElementById('notificationDropdown');
        console.log("2. Dropdown:", this.dropdown);
        
        this.badge = document.querySelector('.notification-badge');
        console.log("3. Badge:", this.badge);
        
        this.markAllReadBtn = document.querySelector('.mark-all-read');
        console.log("4. Botón 'Marcar todas':", this.markAllReadBtn);
        
        this.unreadItems = document.querySelectorAll('.notification-item.unread');
        console.log("5. Items no leídos:", this.unreadItems);

        this.notifications = [
            {
                id: 1,
                type: 'message',
                title: 'Nuevo mensaje',
                content: 'Juan te envió un mensaje en el proyecto Alpha',
                time: 'Hace 5 min',
                unread: true
            },
            {
                id: 2, 
                type: 'task',
                title: 'Tarea completada',
                content: 'María completó la revisión de diseño',
                time: 'Hace 1 hora',
                unread: true
            },
            {
                id: 3,
                type: 'follower',
                title: 'Nuevo seguidor',
                content: 'Carlos empezó a seguir tu trabajo',
                time: 'Hace 2 horas',
                unread: true
            }
        ];
        
        this.nextId = 4; // Para los IDs de nuevas notificaciones
        
        this.init();
    }
    
init() {
        console.log("🎯 INICIANDO EVENT LISTENERS...");
        
        // Verificar cada elemento antes de agregar event listeners
        if (!this.btn) {
            console.error("❌ ERROR: Botón no encontrado");
            return;
        }
        
        if (!this.markAllReadBtn) {
            console.error("❌ ERROR: Botón 'Marcar todas' no encontrado");
            return;
        }
        
        if (!this.dropdown) {
            console.error("❌ ERROR: Dropdown no encontrado");
            return;
        }

        // 1. Click en el botón debe togglear el dropdown
        this.btn.addEventListener('click', (e) => {
            console.log("🎯 Click en botón detectado");
            e.stopPropagation();
            this.toggleDropdown();
        });

        // 2. Click en "marcar todas como leídas"
        this.markAllReadBtn.addEventListener('click', () => {
            console.log("🔄 Click en 'Marcar todas'");
            this.markAllAsRead();
        });

        // 3. Click fuera del dropdown lo cierra
        document.addEventListener('click', () => {
            this.closeDropdown();
        });

        // Evita que el dropdown se cierre cuando haces click dentro de él
        this.dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        console.log("✅ Todos los event listeners agregados correctamente");

        this.setupIndividualClicks();

          // Renderizar notificaciones desde los datos
        this.renderNotifications();
    
        // NUEVO: Simular notificaciones cada 10-20 segundos
        setInterval(() => {
        this.simulateNewNotification();
        }, Math.random() * 10000 + 10000); // Entre 10 y 20 segundos
    
        console.log("🚀 Sistema de notificaciones en tiempo real ACTIVADO");
    }

setupIndividualClicks() {
    const allNotificationItems = document.querySelectorAll('.notification-item');
    
    allNotificationItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('unread')) {
                // Marcar esta notificación individual como leída
                item.classList.remove('unread');
                this.updateBadge();
                
                // Feedback visual
                item.style.backgroundColor = '#e8f5e8';
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 300);
            }
        });
    });
}
    
toggleDropdown() {
        console.log("🔄 Toggleando dropdown...");
        this.dropdown.classList.toggle('show');
        console.log("Dropdown tiene clase 'show':", this.dropdown.classList.contains('show'));
}
    
closeDropdown() {
        this.dropdown.classList.remove('show');
}
    
    // Así funciona la magia:
markAllAsRead() {
    console.log("📝 Marcando todas como leídas...");
    
    // Actualizar los datos
    this.notifications.forEach(notification => {
        notification.unread = false;
    });
    
    // Re-renderizar
    this.renderNotifications();
    
    // Cerrar el dropdown
    this.closeDropdown();
}

updateBadge() {
    const remainingUnread = document.querySelectorAll('.notification-item.unread').length;
    console.log(`🔢 Notificaciones no leídas restantes: ${remainingUnread}`);
    
    // Agregar animación de "pulse" cuando cambia
    this.badge.style.animation = 'none';
    setTimeout(() => {
        this.badge.style.animation = 'pulse 0.5s ease';
    }, 10);
    
    if (remainingUnread === 0) {
        this.badge.style.display = 'none';
    } else {
        this.badge.textContent = remainingUnread;
        this.badge.style.display = 'flex';
    }
}

// AGREGA ESTE MÉTODO a tu clase:
renderNotifications() {
    const notificationList = document.querySelector('.notification-list');
    
    // Limpiar la lista actual
    notificationList.innerHTML = '';
    
    // Crear cada item basado en los datos
    this.notifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = `notification-item ${notification.unread ? 'unread' : ''}`;
        item.setAttribute('data-id', notification.id);
        
        item.innerHTML = `
            <div class="notification-content">
                <strong>${notification.title}</strong>
                <p>${notification.content}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
        `;
        
        notificationList.appendChild(item);
    });
    
    // Actualizar los event listeners individuales
    this.setupIndividualClicks();
    this.updateBadge();
}

// AGREGA ESTE MÉTODO:
simulateNewNotification() {
    // Tipos posibles de notificaciones
    const notificationTypes = [
        {
            type: 'message',
            title: 'Nuevo mensaje',
            templates: [
                'tienes un nuevo mensaje en el canal #general',
                'te mencionó en el proyecto Beta',
                'respondió tu comentario en el diseño'
            ]
        },
        {
            type: 'task', 
            title: 'Tarea actualizada',
            templates: [
                'se completó la tarea "Revisar UI"',
                'hay una nueva tarea asignada para ti',
                'se venció la tarea "Entregar mockups"'
            ]
        },
        {
            type: 'system',
            title: 'Actualización del sistema',
            templates: [
                'nueva versión disponible',
                'mantenimiento programado para esta noche',
                'nuevas features agregadas'
            ]
        }
    ];
    
    // Elegir un tipo aleatorio
    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const randomTemplate = randomType.templates[Math.floor(Math.random() * randomType.templates.length)];
    
    // Crear nueva notificación
    const newNotification = {
        id: this.nextId++,
        type: randomType.type,
        title: randomType.title,
        content: randomTemplate,
        time: 'Ahora mismo',
        unread: true
    };
    
    // Agregar al principio del array (las más nuevas primero)
    this.notifications.unshift(newNotification);
    
    // Re-renderizar
    this.renderNotifications();
    
    // Efecto especial: hacer vibrar el badge
    this.animateNewNotification();
    
    console.log(`🔔 Nueva notificación: ${newNotification.title} - ${newNotification.content}`);
}

animateNewNotification() {
    // Efecto de vibración en el badge
    this.badge.style.animation = 'shake 0.5s ease';
    
    // Sonido de notificación (opcional)
    this.playNotificationSound();
    
    // Resetear la animación después de que termine
    setTimeout(() => {
        this.badge.style.animation = '';
    }, 500);
}

playNotificationSound() {
    // Crear un sonido simple (opcional)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 100);
    } catch (e) {
        console.log("Sonido no disponible");
    }
}

}

// Inicializar el sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 DOM Cargado - Inicializando NotificationSystem");
    new NotificationSystem();
});
