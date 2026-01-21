// Data de início do relacionamento
const dataInicio = new Date('2023-12-27T00:00:00');

// Elementos do contador
const anosEl = document.getElementById('anos');
const mesesEl = document.getElementById('meses');
const diasEl = document.getElementById('dias');
const horasEl = document.getElementById('horas');
const minutosEl = document.getElementById('minutos');
const segundosEl = document.getElementById('segundos');

// Elementos de áudio
const musica = document.getElementById('musica');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Data de atualização
const dataAtualEl = document.getElementById('data-atual');

// Atualizar contador
function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio;
    
    // Calcular tempo
    const segundosTotal = Math.floor(diferenca / 1000);
    const minutosTotal = Math.floor(segundosTotal / 60);
    const horasTotal = Math.floor(minutosTotal / 60);
    const diasTotal = Math.floor(horasTotal / 24);
    
    // Anos considerando 365.25 dias por ano (para contar anos bissextos)
    const anos = Math.floor(diasTotal / 365.25);
    
    // Meses restantes
    const diasRestantesAno = diasTotal - (anos * 365.25);
    const meses = Math.floor(diasRestantesAno / 30.44); // Média de dias por mês
    
    // Dias restantes
    const dias = Math.floor(diasRestantesAno - (meses * 30.44));
    
    // Horas, minutos e segundos
    const horas = horasTotal % 24;
    const minutos = minutosTotal % 60;
    const segundos = segundosTotal % 60;
    
    // Atualizar elementos
    anosEl.textContent = anos.toString().padStart(2, '0');
    mesesEl.textContent = meses.toString().padStart(2, '0');
    diasEl.textContent = dias.toString().padStart(2, '0');
    horasEl.textContent = horas.toString().padStart(2, '0');
    minutosEl.textContent = minutos.toString().padStart(2, '0');
    segundosEl.textContent = segundos.toString().padStart(2, '0');
}

// Configurar controles de áudio
playBtn.addEventListener('click', () => {
    musica.play().catch(e => console.log("Autoplay bloqueado: ", e));
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
});

pauseBtn.addEventListener('click', () => {
    musica.pause();
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'flex';
});

volumeSlider.addEventListener('input', (e) => {
    musica.volume = e.target.value / 100;
});

// Configurar data de atualização
function atualizarData() {
    const agora = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    dataAtualEl.textContent = agora.toLocaleDateString('pt-BR', options);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar contador
    atualizarContador();
    setInterval(atualizarContador, 1000);
    
    // Atualizar data
    atualizarData();
    
    // Tentar iniciar música automaticamente (pode ser bloqueado pelo navegador)
    setTimeout(() => {
        musica.play().then(() => {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        }).catch(e => {
            console.log("Autoplay bloqueado, aguardando interação do usuário");
            playBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        });
    }, 1000);
    
    // Configurar volume inicial
    musica.volume = volumeSlider.value / 100;
});