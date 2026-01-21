// Data de início do relacionamento
const dataInicio = new Date('2023-12-27T14:00:00');

// Elementos do DOM
const elementos = {
    anos: document.getElementById('anos'),
    meses: document.getElementById('meses'),
    dias: document.getElementById('dias'),
    horas: document.getElementById('horas'),
    minutos: document.getElementById('minutos'),
    segundos: document.getElementById('segundos'),
    dataAtual: document.getElementById('data-atual'),
    musica: document.getElementById('musica'),
    playBtn: document.getElementById('playBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    stopBtn: document.getElementById('stopBtn'),
    volumeSlider: document.getElementById('volumeSlider'),
    volumeIcon: document.getElementById('volumeIcon'),
    audioStatus: document.getElementById('audioStatus'),
    menuToggle: document.getElementById('menuToggle'),
    mobileNav: document.getElementById('mobileNav'),
    overlay: document.getElementById('overlay'),
    fotoModal: document.getElementById('fotoModal'),
    modalImg: document.getElementById('modalImg'),
    caption: document.getElementById('caption')
};

// Estado do player
const playerState = {
    isPlaying: false,
    volume: 0.5,
    autoplayAttempted: false
};

// Atualizar contador
function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio;
    
    // Calcular tempo
    const segundosTotal = Math.floor(diferenca / 1000);
    const minutosTotal = Math.floor(segundosTotal / 60);
    const horasTotal = Math.floor(minutosTotal / 60);
    const diasTotal = Math.floor(horasTotal / 24);
    
    // Anos considerando 365.25 dias por ano
    const anos = Math.floor(diasTotal / 365.25);
    
    // Meses restantes
    const diasRestantesAno = diasTotal - (anos * 365.25);
    const meses = Math.floor(diasRestantesAno / 30.44);
    
    // Dias restantes
    const dias = Math.floor(diasRestantesAno - (meses * 30.44));
    
    // Horas, minutos e segundos
    const horas = horasTotal % 24;
    const minutos = minutosTotal % 60;
    const segundos = segundosTotal % 60;
    
    // Atualizar elementos
    elementos.anos.textContent = anos.toString().padStart(2, '0');
    elementos.meses.textContent = meses.toString().padStart(2, '0');
    elementos.dias.textContent = dias.toString().padStart(2, '0');
    elementos.horas.textContent = horas.toString().padStart(2, '0');
    elementos.minutos.textContent = minutos.toString().padStart(2, '0');
    elementos.segundos.textContent = segundos.toString().padStart(2, '0');
}

// Sistema de áudio
function initAudio() {
    // Configurar volume inicial
    elementos.musica.volume = playerState.volume;
    elementos.volumeSlider.value = playerState.volume * 100;
    
    // Event listeners
    elementos.playBtn.addEventListener('click', playMusic);
    elementos.pauseBtn.addEventListener('click', pauseMusic);
    elementos.stopBtn.addEventListener('click', stopMusic);
    elementos.volumeSlider.addEventListener('input', updateVolume);
    
    // Eventos do player
    elementos.musica.addEventListener('play', () => {
        playerState.isPlaying = true;
        updateAudioUI();
        updateAudioStatus('Tocando agora ♫');
    });
    
    elementos.musica.addEventListener('pause', () => {
        playerState.isPlaying = false;
        updateAudioUI();
        updateAudioStatus('Pausado');
    });
    
    elementos.musica.addEventListener('ended', () => {
        updateAudioStatus('Música finalizada');
    });
    
    // Tentar autoplay
    setTimeout(() => {
        if (!playerState.autoplayAttempted) {
            tryAutoplay();
        }
    }, 1000);
}

function tryAutoplay() {
    playerState.autoplayAttempted = true;
    
    const playPromise = elementos.musica.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay funcionou
            updateAudioStatus('Tocando automaticamente');
        }).catch(error => {
            // Autoplay bloqueado
            console.log('Autoplay bloqueado, aguardando interação do usuário');
            updateAudioStatus('Clique em play para começar');
            
            // Adicionar listener para primeira interação
            document.addEventListener('click', enableAudioOnInteraction, { once: true });
            document.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
        });
    }
}

function enableAudioOnInteraction() {
    elementos.musica.play().catch(console.error);
}

function playMusic() {
    elementos.musica.play().catch(error => {
        console.error('Erro ao reproduzir:', error);
        updateAudioStatus('Erro ao reproduzir a música');
    });
}

function pauseMusic() {
    elementos.musica.pause();
}

function stopMusic() {
    elementos.musica.pause();
    elementos.musica.currentTime = 0;
    updateAudioStatus('Parado');
}

function updateVolume(e) {
    playerState.volume = e.target.value / 100;
    elementos.musica.volume = playerState.volume;
    
    // Atualizar ícone do volume
    if (playerState.volume === 0) {
        elementos.volumeIcon.className = 'fas fa-volume-mute';
    } else if (playerState.volume < 0.5) {
        elementos.volumeIcon.className = 'fas fa-volume-down';
    } else {
        elementos.volumeIcon.className = 'fas fa-volume-up';
    }
}

function updateAudioUI() {
    if (playerState.isPlaying) {
        elementos.playBtn.style.display = 'none';
        elementos.pauseBtn.style.display = 'flex';
    } else {
        elementos.playBtn.style.display = 'flex';
        elementos.pauseBtn.style.display = 'none';
    }
}

function updateAudioStatus(message) {
    elementos.audioStatus.innerHTML = `<i class="fas fa-music"></i> ${message}`;
}

// Menu mobile
function initMobileMenu() {
    elementos.menuToggle.addEventListener('click', toggleMobileMenu);
    elementos.overlay.addEventListener('click', closeMobileMenu);
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.mobile-nav a, .footer-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    elementos.mobileNav.classList.toggle('active');
    elementos.overlay.classList.toggle('active');
    document.body.style.overflow = elementos.mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    elementos.mobileNav.classList.remove('active');
    elementos.overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Galeria de fotos
function initGallery() {
    // As funções ampliarFoto e fecharModal já estão no onclick
}

function ampliarFoto(element) {
    const imgSrc = element.querySelector('img').src;
    const imgAlt = element.querySelector('img').alt;
    
    elementos.modalImg.src = imgSrc;
    elementos.caption.textContent = imgAlt;
    elementos.fotoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    elementos.fotoModal.style.display = 'none';
    document.body.style.overflow = '';
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elementos.fotoModal.style.display === 'block') {
        fecharModal();
    }
});

// Fechar modal clicando fora da imagem
elementos.fotoModal.addEventListener('click', (e) => {
    if (e.target === elementos.fotoModal) {
        fecharModal();
    }
});

// Data atual
function atualizarData() {
    const agora = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    elementos.dataAtual.textContent = agora.toLocaleDateString('pt-BR', options);
}

// Observador de interseção para animações
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar todas as seções
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar contador
    atualizarContador();
    setInterval(atualizarContador, 1000);
    
    // Atualizar data
    atualizarData();
    
    // Inicializar sistemas
    initAudio();
    initMobileMenu();
    initGallery();
    initIntersectionObserver();
    
    // Forçar exibição dos controles (importante para mobile)
    updateAudioUI();
    
    // Prevenir comportamento padrão de alguns gestos no mobile
    document.addEventListener('touchmove', (e) => {
        if (e.scale !== 1) e.preventDefault();
    }, { passive: false });
    
    // Melhorar performance no mobile
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
    
    // Carregamento suave das imagens
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Suporte a Service Worker para PWA (opcional)
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    });
}