/*
====================================================================
LA FACTORÍA - PLANIFICADOR DE CONTENIDO v3.0
Sistema de gestión de calendario con drag & drop y temas
====================================================================
*/

// ========== GLOBAL STATE MANAGEMENT ==========
let currentEditingCell = null;
let appData = {
    template: {},
    weeks: [],
    currentWeekIndex: -1 // -1 significa template
};

// ========== DEFAULT TEMPLATE DATA ==========
const defaultTemplate = {
    timeSlots: [
        '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
        '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-18:30'
    ],
    tasks: {
        '9:00-10:00': {
            mon: { title: 'V2', description: '', icon: '🔍', color: '#e74c3c' },
            tue: { title: 'V2', description: '', icon: '✍️', color: '#f39c12' },
            wed: { title: 'V4', description: '', icon: '✍️', color: '#f39c12' },
            thu: { title: 'V4', description: '', icon: '🎬', color: '#9b59b6' },
            fri: { title: 'V3', description: '', icon: '🎞️', color: '#3498db' }
        },
        '10:00-11:00': {
            mon: { title: 'V3', description: '', icon: '🔍', color: '#e74c3c' },
            tue: { title: 'V2', description: '', icon: '✍️', color: '#f39c12' },
            wed: { title: 'V4', description: '', icon: '✍️', color: '#f39c12' },
            thu: { title: 'V2', description: '', icon: '🎞️', color: '#3498db' },
            fri: { title: 'V3', description: '', icon: '🎞️', color: '#3498db' }
        },
        '11:00-12:00': {
            mon: { title: 'V4', description: '', icon: '🔍', color: '#e74c3c' },
            tue: { title: 'V2', description: '', icon: '✍️', color: '#f39c12' },
            wed: { title: 'V4', description: '', icon: '✍️', color: '#f39c12' },
            thu: { title: 'V2', description: '', icon: '🎞️', color: '#3498db' },
            fri: { title: 'V3', description: '', icon: '📝', color: '#4ecdc4' }
        },
        '12:00-13:00': {
            mon: { title: 'REELS', description: '', icon: '🔍', color: '#e74c3c' },
            tue: { title: 'V3', description: '', icon: '✍️', color: '#f39c12' },
            wed: { title: '2 y 3', description: '', icon: '🎬', color: '#9b59b6' },
            thu: { title: 'V2', description: '', icon: '📝', color: '#4ecdc4' },
            fri: { title: 'V3', description: '', icon: '📝', color: '#4ecdc4' }
        },
        '13:00-14:00': {
            mon: { title: 'IG', description: '', icon: '📱', color: '#e91e63' },
            tue: { title: 'V3', description: '', icon: '✍️', color: '#f39c12' },
            wed: { title: '2 y 3', description: '', icon: '🎬', color: '#9b59b6' },
            thu: { title: 'V2', description: '', icon: '📝', color: '#4ecdc4' },
            fri: { title: 'REVISION METRICAS', description: '', icon: '📈', color: '#ff9ff3' }
        },
        '14:00-15:00': {
            mon: { title: 'COMIDA', description: '', icon: '🍽️', color: '#95a5a6', isBreak: true },
            tue: { title: 'COMIDA', description: '', icon: '🍽️', color: '#95a5a6', isBreak: true },
            wed: { title: 'COMIDA', description: '', icon: '🍽️', color: '#95a5a6', isBreak: true },
            thu: { title: 'COMIDA', description: '', icon: '🍽️', color: '#95a5a6', isBreak: true },
            fri: { title: 'COMIDA', description: '', icon: '🍽️', color: '#95a5a6', isBreak: true }
        },
        '15:00-16:00': {
            mon: { title: 'V1', description: '', icon: '🎞️', color: '#3498db' },
            tue: { title: 'V1', description: '', icon: '📝', color: '#4ecdc4' },
            wed: { title: 'V2', description: '', icon: '🎞️', color: '#3498db' },
            thu: { title: 'V3', description: '', icon: '🎞️', color: '#3498db' },
            fri: { title: 'PROGRAMAR', description: '', icon: '💻', color: '#1abc9c' }
        },
        '16:00-17:00': {
            mon: { title: 'V1', description: '', icon: '🎞️', color: '#3498db' },
            tue: { title: 'V1', description: '', icon: '📝', color: '#4ecdc4' },
            wed: { title: 'V2', description: '', icon: '🎞️', color: '#3498db' },
            thu: { title: 'V3', description: '', icon: '🎞️', color: '#3498db' },
            fri: { title: 'PROGRAMAR', description: '', icon: '💻', color: '#1abc9c' }
        },
        '17:00-18:00': {
            mon: { title: 'V1', description: '', icon: '🎞️', color: '#3498db' },
            tue: { title: 'REEL 1', description: '', icon: '📱', color: '#e91e63' },
            wed: { title: 'REEL 2', description: '', icon: '📱', color: '#e91e63' },
            thu: { title: 'CARRUSEL', description: '', icon: '📱', color: '#e91e63' },
            fri: { title: 'REEL 3', description: '', icon: '📱', color: '#e91e63' }
        },
        '18:00-18:30': {
            mon: { title: 'HISTORIAS', description: '', icon: '📱', color: '#e91e63' },
            tue: { title: 'REEL 1', description: '', icon: '📱', color: '#e91e63' },
            wed: { title: 'REEL 2', description: '', icon: '📱', color: '#e91e63' },
            thu: { title: 'CARRUSEL', description: '', icon: '📱', color: '#e91e63' },
            fri: { title: 'REEL 3', description: '', icon: '📱', color: '#e91e63' }
        }
    }
};

// ========== CONFIGURATION DATA ==========
const commonEmojis = [
    '🔍', '✍️', '🎬', '🎞️', '📋', '📱', '🍽️', '💻', '📊', '📈',
    '🎯', '⚡', '🔥', '💡', '📝', '🎨', '🎵', '📷', '🎪', '🌟',
    '🚀', '⭐', '🎉', '🏆', '💎', '🎭', '🎨', '🎪', '🎸', '🎹',
    '📺', '📻', '📢', '📣', '📯', '🔔', '🔕', '📮', '📫', '📬'
];

const predefinedColors = [
    '#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db',
    '#9b59b6', '#e91e63', '#95a5a6', '#34495e', '#ff6b6b', '#4ecdc4',
    '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
];

// Tareas predefinidas organizadas por categorías
const predefinedTasks = {
    '🎬 Video': [
        { title: 'INVESTIGACIÓN', description: 'Buscar tema', icon: '🔍', color: '#e74c3c' },
        { title: 'GUIÓN', description: 'Escribir guión', icon: '✍️', color: '#f39c12' },
        { title: 'GRABACIÓN', description: 'Grabar video', icon: '🎬', color: '#9b59b6' },
        { title: 'EDICIÓN', description: 'Editar video', icon: '🎞️', color: '#3498db' },
        { title: 'POSTPROD', description: 'Miniatura y título', icon: '📝', color: '#4ecdc4' }
    ],
    '📱 Instagram': [
        { title: 'REEL', description: 'Crear reel', icon: '📱', color: '#e91e63' },
        { title: 'CARRUSEL', description: 'Crear carrusel', icon: '📊', color: '#3498db' },
        { title: 'HISTORIAS', description: 'Subir historias', icon: '📖', color: '#9b59b6' },
        { title: 'IG STORIES', description: 'Stories diarias', icon: '📱', color: '#e91e63' }
    ],
    '💻 Trabajo': [
        { title: 'PROGRAMAR', description: 'Desarrollo código', icon: '💻', color: '#1abc9c' },
        { title: 'REUNIÓN', description: 'Meeting', icon: '👥', color: '#95a5a6' },
        { title: 'EMAIL', description: 'Revisar correo', icon: '📧', color: '#34495e' },
        { title: 'PLANIFICACIÓN', description: 'Organizar tareas', icon: '📋', color: '#f39c12' }
    ],
    '📊 Análisis': [
        { title: 'MÉTRICAS', description: 'Revisar analytics', icon: '📈', color: '#ff9ff3' },
        { title: 'RESEARCH', description: 'Investigar mercado', icon: '🔍', color: '#e74c3c' },
        { title: 'REPORTES', description: 'Crear informes', icon: '📊', color: '#54a0ff' }
    ],
    '🎯 Otros': [
        { title: 'DESCANSO', description: 'Break', icon: '☕', color: '#95a5a6' },
        { title: 'EJERCICIO', description: 'Actividad física', icon: '🏃', color: '#2ecc71' },
        { title: 'LIBRE', description: 'Tiempo libre', icon: '⭕', color: '#bdc3c7' }
    ]
};

// ========== DATA PERSISTENCE ==========
function saveAppData() {
    try {
        localStorage.setItem('contentPlannerData', JSON.stringify(appData));
        console.log('✅ Datos guardados en localStorage');
    } catch (error) {
        console.log('⚠️ Error con localStorage, manteniendo en memoria');
        window.appDataBackup = JSON.stringify(appData);
    }
}

function loadAppData() {
    try {
        const saved = localStorage.getItem('contentPlannerData');
        if (saved) {
            appData = JSON.parse(saved);
            console.log('📁 Datos cargados desde localStorage');
        } else {
            initializeDefaultData();
        }
    } catch (error) {
        console.log('⚠️ Error cargando desde localStorage, usando defaults');
        initializeDefaultData();
    }
}

function initializeDefaultData() {
    appData = {
        template: JSON.parse(JSON.stringify(defaultTemplate)),
        weeks: [],
        currentWeekIndex: -1
    };
    saveAppData();
}

// ========== CORE LOGIC ==========
function getCurrentScheduleData() {
    if (appData.currentWeekIndex === -1) {
        return appData.template;
    } else {
        return appData.weeks[appData.currentWeekIndex];
    }
}

// ========== UI GENERATION ==========
function generateScheduleTable() {
    console.log('🔧 Generando tabla de horarios...');
    
    const scheduleData = getCurrentScheduleData();
    const tbody = document.getElementById('schedule-body');
    tbody.innerHTML = '';
    
    if (!scheduleData || !scheduleData.timeSlots || !scheduleData.tasks) {
        console.error('❌ Datos de horario inválidos');
        return;
    }
    
    scheduleData.timeSlots.forEach((timeSlot) => {
        const row = document.createElement('tr');
        
        // Celda de tiempo
        const timeCell = document.createElement('td');
        timeCell.className = 'time-col';
        timeCell.textContent = timeSlot === '14:00-15:00' ? `🍽️ ${timeSlot}` : timeSlot;
        
        // CAMBIO AQUÍ: Celda de comida en gris en lugar de amarillo
        if (timeSlot === '14:00-15:00') {
            timeCell.classList.add('lunch-time');
        }
        row.appendChild(timeCell);
        
        // Celdas para cada día
        const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri'];
        
        dayOrder.forEach((dayKey) => {
            const dayCell = document.createElement('td');
            
            let taskData = null;
            if (scheduleData.tasks[timeSlot] && scheduleData.tasks[timeSlot][dayKey]) {
                taskData = scheduleData.tasks[timeSlot][dayKey];
            } else {
                taskData = {
                    title: 'LIBRE',
                    description: '',
                    icon: '⭕',
                    color: '#bdc3c7'
                };
            }
            
            dayCell.className = taskData.isBreak ? 'task-cell break' : 'task-cell editable';
            dayCell.style.borderLeftColor = taskData.color || '#bdc3c7';
            dayCell.style.backgroundColor = taskData.isBreak ? '#34373e' : hexToRgba(taskData.color || '#bdc3c7', 0.1);
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'task-icon';
            iconSpan.textContent = taskData.icon || '⭕';
            
            const titleElement = document.createElement('strong');
            titleElement.textContent = taskData.title || 'LIBRE';
            
            dayCell.appendChild(iconSpan);
            dayCell.appendChild(titleElement);
            
            if (taskData.description && taskData.description.trim() !== '') {
                dayCell.appendChild(document.createElement('br'));
                const descElement = document.createElement('small');
                descElement.textContent = taskData.description;
                dayCell.appendChild(descElement);
            }
            
            if (!taskData.isBreak) {
                // Make cell draggable
                dayCell.draggable = true;
                dayCell.dataset.timeSlot = timeSlot;
                dayCell.dataset.dayKey = dayKey;
                
                // Add drag event listeners
                dayCell.addEventListener('dragstart', handleDragStart);
                dayCell.addEventListener('dragover', handleDragOver);
                dayCell.addEventListener('drop', handleDrop);
                dayCell.addEventListener('dragenter', handleDragEnter);
                dayCell.addEventListener('dragleave', handleDragLeave);
                dayCell.addEventListener('dragend', handleDragEnd);
                
                dayCell.addEventListener('click', (e) => {
                    // Registrar la última celda seleccionada
                    lastSelectedCell = { timeSlot, dayKey };
                    
                    // Only open modal if not dragging
                    if (!dayCell.classList.contains('dragging')) {
                        openEditModal(timeSlot, dayKey);
                    }
                });
                
                // Añadir menú contextual (click derecho)
                dayCell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    showTaskContextMenu(e, timeSlot, dayKey);
                });
            }
            
            row.appendChild(dayCell);
        });
        
        tbody.appendChild(row);
    });
    
    console.log('✅ Tabla generada correctamente');
    
    // Ajustar altura del sidebar después de generar tabla
    adjustPaletteHeight();
    
    // Actualizar contadores de horas
    updateHourCounters();
}

// ========== WEEK NAVIGATION ==========
function updateWeekNavigation() {
    const weekTitle = document.getElementById('weekTitle');
    const weekSubtitle = document.getElementById('weekSubtitle');
    const prevBtn = document.getElementById('prevWeekBtn');
    const nextBtn = document.getElementById('nextWeekBtn');
    
    if (appData.currentWeekIndex === -1) {
        weekTitle.textContent = 'Semana Template';
        weekSubtitle.textContent = 'Plantilla base para nuevas semanas';
        prevBtn.disabled = appData.weeks.length === 0;
        nextBtn.disabled = appData.weeks.length === 0;
    } else {
        const currentWeek = appData.weeks[appData.currentWeekIndex];
        weekTitle.textContent = `Semana ${appData.currentWeekIndex + 1}`;
        
        const startDate = new Date(currentWeek.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        
        weekSubtitle.textContent = `${startDate.toLocaleDateString('es-ES')} - ${endDate.toLocaleDateString('es-ES')}`;
        
        prevBtn.disabled = false; // Siempre puede volver al template o semana anterior
        nextBtn.disabled = appData.currentWeekIndex >= appData.weeks.length - 1;
    }
    
    updatePublicationsView();
}

function navigateWeek(direction) {
    if (direction === 1) { // Siguiente
        if (appData.currentWeekIndex === -1 && appData.weeks.length > 0) {
            appData.currentWeekIndex = 0;
        } else if (appData.currentWeekIndex < appData.weeks.length - 1) {
            appData.currentWeekIndex++;
        }
    } else { // Anterior
        if (appData.currentWeekIndex === 0) {
            appData.currentWeekIndex = -1;
        } else if (appData.currentWeekIndex > 0) {
            appData.currentWeekIndex--;
        }
    }
    
    updateWeekNavigation();
    generateScheduleTable();
    saveAppData();
}

// ========== WEEK MANAGEMENT ==========
function createNewWeek() {
    // Establecer fecha de hoy por defecto
    const today = new Date();
    document.getElementById('weekStartDate').value = today.toISOString().split('T')[0];
    document.getElementById('newWeekModal').style.display = 'block';
}

function closeNewWeekModal() {
    document.getElementById('newWeekModal').style.display = 'none';
}

function createWeekFromInputs() {
    const startDate = document.getElementById('weekStartDate').value;
    
    if (!startDate) {
        showNotification('❌ Por favor selecciona una fecha');
        return;
    }
    
    // Crear nueva semana basada en template (sin modificar números)
    const newWeek = createWeekFromTemplate(startDate);
    appData.weeks.push(newWeek);
    
    // Navegar a la nueva semana
    appData.currentWeekIndex = appData.weeks.length - 1;
    
    updateWeekNavigation();
    generateScheduleTable();
    saveAppData();
    closeNewWeekModal();
    
    showNotification(`✅ Nueva semana creada`);
}

function createWeekFromTemplate(startDate) {
    // Simplemente clonar el template sin modificar números
    const newWeek = JSON.parse(JSON.stringify(appData.template));
    
    // Añadir información básica de la semana
    newWeek.startDate = startDate;
    
    return newWeek;
}

// Actualizar vista de publicaciones (simplificada)
function updatePublicationsView() {
    // Como ya no gestionamos números automáticamente, dejamos los textos fijos
    document.getElementById('pub-video-3').textContent = 'Video 3 (se publica martes)';
    document.getElementById('pub-video-1').textContent = 'Video 1 (se publica jueves)';
    document.getElementById('pub-video-2').textContent = 'Video 2 (se publica domingo)';
}

// Guardar semana actual como template
function saveAsTemplate() {
    const currentData = getCurrentScheduleData();
    
    // Clonar datos actuales como nuevo template
    appData.template = JSON.parse(JSON.stringify(currentData));
    
    // Limpiar propiedades específicas de semana si existen
    delete appData.template.startDate;
    delete appData.template.publishVideos;
    
    saveAppData();
    showNotification('✅ Semana guardada como template');
}

// ========== UTILITY FUNCTIONS ==========
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent') return '#bdc3c7';
    if (rgb.startsWith('#')) return rgb;
    const values = rgb.match(/\d+/g);
    if (!values || values.length < 3) return '#bdc3c7';
    const hex = values.slice(0, 3).map(val => {
        const hexVal = parseInt(val).toString(16);
        return hexVal.length === 1 ? '0' + hexVal : hexVal;
    });
    return '#' + hex.join('');
}

// ========== MODAL MANAGEMENT ==========
function openEditModal(timeSlot, dayKey) {
    const scheduleData = getCurrentScheduleData();
    
    if (!scheduleData.tasks[timeSlot]) {
        scheduleData.tasks[timeSlot] = {};
    }
    if (!scheduleData.tasks[timeSlot][dayKey]) {
        scheduleData.tasks[timeSlot][dayKey] = {
            title: 'LIBRE',
            description: '',
            icon: '⭕',
            color: '#bdc3c7'
        };
    }
    
    const task = scheduleData.tasks[timeSlot][dayKey];
    currentEditingCell = { timeSlot, dayKey };
    
    document.getElementById('taskTitle').value = task.title || '';
    document.getElementById('taskDescription').value = task.description || '';
    document.getElementById('taskIcon').value = task.icon || '⭕';
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
        const optionColor = rgbToHex(option.style.backgroundColor);
        if (optionColor === task.color) {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditingCell = null;
}

function saveTask() {
    if (!currentEditingCell) return;
    
    const { timeSlot, dayKey } = currentEditingCell;
    const scheduleData = getCurrentScheduleData();
    
    if (!scheduleData.tasks[timeSlot]) {
        scheduleData.tasks[timeSlot] = {};
    }
    if (!scheduleData.tasks[timeSlot][dayKey]) {
        scheduleData.tasks[timeSlot][dayKey] = {};
    }
    
    const task = scheduleData.tasks[timeSlot][dayKey];
    
    task.title = document.getElementById('taskTitle').value;
    task.description = document.getElementById('taskDescription').value;
    task.icon = document.getElementById('taskIcon').value;
    
    const selectedColor = document.querySelector('.color-option.selected');
    if (selectedColor) {
        task.color = rgbToHex(selectedColor.style.backgroundColor);
    }
    
    saveAppData();
    generateScheduleTable();
    closeModal();
    showNotification('✅ Tarea guardada correctamente');
}

function deleteTask() {
    if (!currentEditingCell) return;
    
    const { timeSlot, dayKey } = currentEditingCell;
    const scheduleData = getCurrentScheduleData();
    
    scheduleData.tasks[timeSlot][dayKey] = {
        title: 'LIBRE',
        description: '',
        icon: '⭕',
        color: '#bdc3c7'
    };
    
    saveAppData();
    generateScheduleTable();
    closeModal();
    showNotification('🗑️ Tarea eliminada');
}

// ========== PICKER COMPONENTS ==========
function createColorPicker() {
    const container = document.querySelector('.color-picker-container');
    container.innerHTML = '';
    
    predefinedColors.forEach(color => {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.style.backgroundColor = color;
        option.onclick = () => {
            document.querySelectorAll('.color-option').forEach(opt => 
                opt.classList.remove('selected'));
            option.classList.add('selected');
        };
        container.appendChild(option);
    });
}

function createEmojiPicker() {
    const container = document.querySelector('.emoji-picker');
    container.innerHTML = '';
    
    commonEmojis.forEach(emoji => {
        const option = document.createElement('div');
        option.className = 'emoji-option';
        option.textContent = emoji;
        option.onclick = () => {
            document.getElementById('taskIcon').value = emoji;
        };
        container.appendChild(option);
    });
}

// ========== TASK PALETTE ==========
function generateTaskPalette() {
    const container = document.getElementById('taskPalette');
    container.innerHTML = '';
    
    Object.entries(predefinedTasks).forEach(([categoryName, tasks]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'palette-category';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = categoryName;
        categoryDiv.appendChild(categoryTitle);
        
        const tasksContainer = document.createElement('div');
        tasksContainer.className = 'palette-tasks';
        
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'palette-task';
            taskElement.draggable = true;
            taskElement.style.borderLeftColor = task.color;
            taskElement.style.backgroundColor = hexToRgba(task.color, 0.1);
            
            // Almacenar datos de la tarea
            taskElement.dataset.taskData = JSON.stringify(task);
            
            // Crear contenido de la tarea
            const iconSpan = document.createElement('span');
            iconSpan.className = 'palette-task-icon';
            iconSpan.textContent = task.icon;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'palette-task-content';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'palette-task-title';
            titleDiv.textContent = task.title;
            
            const descDiv = document.createElement('div');
            descDiv.className = 'palette-task-desc';
            descDiv.textContent = task.description;
            
            contentDiv.appendChild(titleDiv);
            contentDiv.appendChild(descDiv);
            
            taskElement.appendChild(iconSpan);
            taskElement.appendChild(contentDiv);
            
            // Event listeners para drag desde paleta
            taskElement.addEventListener('dragstart', handlePaletteDragStart);
            taskElement.addEventListener('dragend', handlePaletteDragEnd);
            
            tasksContainer.appendChild(taskElement);
        });
        
        categoryDiv.appendChild(tasksContainer);
        container.appendChild(categoryDiv);
    });
    
    // Ajustar altura después de generar
    adjustPaletteHeight();
}

// ========== UI ADJUSTMENTS ==========
function adjustPaletteHeight() {
    setTimeout(() => {
        const scheduleTable = document.querySelector('.schedule-table table');
        const taskPalette = document.querySelector('.task-palette');
        
        if (scheduleTable && taskPalette) {
            const tableHeight = scheduleTable.offsetHeight;
            taskPalette.style.height = `${tableHeight}px`;
            taskPalette.style.maxHeight = `${tableHeight}px`;
        }
    }, 100);
}

// ========== HOUR TRACKING ==========
function calculateWorkedHours() {
    const scheduleData = getCurrentScheduleData();
    if (!scheduleData || !scheduleData.tasks || !scheduleData.timeSlots) {
        return { total: 0, byDay: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 } };
    }

    const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri'];
    const hoursByDay = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 };
    let totalHours = 0;

    // Calcular duración de cada slot (asumiendo slots de 1 hora excepto el último que es 0.5h)
    const getSlotDuration = (timeSlot) => {
        if (timeSlot === '18:00-18:30') return 0.5;
        return 1;
    };

    scheduleData.timeSlots.forEach(timeSlot => {
        const slotDuration = getSlotDuration(timeSlot);
        
        dayOrder.forEach(dayKey => {
            const task = scheduleData.tasks[timeSlot] && scheduleData.tasks[timeSlot][dayKey];
            
            // Contar solo si tiene tarea y no es break ni libre
            if (task && 
                !task.isBreak && 
                task.title !== 'LIBRE' && 
                task.title !== '' && 
                task.title !== 'COMIDA') {
                hoursByDay[dayKey] += slotDuration;
                totalHours += slotDuration;
            }
        });
    });

    return { total: totalHours, byDay: hoursByDay };
}

// Actualizar contadores de horas en la UI
function updateHourCounters() {
    const hoursData = calculateWorkedHours();
    
    // Actualizar total en week navigation
    const weekHoursElement = document.getElementById('weekHours');
    if (weekHoursElement) {
        weekHoursElement.textContent = `${hoursData.total}h`;
    }

    // Actualizar horas por día en headers
    const dayHeaders = {
        'mon': 'LUNES',
        'tue': 'MARTES', 
        'wed': 'MIÉRCOLES',
        'thu': 'JUEVES',
        'fri': 'VIERNES'
    };

    Object.entries(dayHeaders).forEach(([dayKey, dayName]) => {
        const headerElement = Array.from(document.querySelectorAll('th')).find(th => 
            th.textContent.includes(dayName)
        );
        
        if (headerElement) {
            const hours = hoursData.byDay[dayKey];
            headerElement.innerHTML = `${dayName}<br><small>${hours}h</small>`;
        }
    });
}

// ========== DATA IMPORT/EXPORT ==========
function exportData() {
    const dataStr = JSON.stringify(appData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'planificador-contenido-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    
    showNotification('📁 Datos exportados correctamente');
}

function importData() {
    document.getElementById('importFile').click();
}

function handleImport() {
    const file = document.getElementById('importFile').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            appData = imported;
            saveAppData();
            updateWeekNavigation();
            generateScheduleTable();
            showNotification('📂 Datos importados correctamente');
        } catch (error) {
            showNotification('❌ Error al importar el archivo');
        }
    };
    reader.readAsText(file);
}

// ========== RESET FUNCTIONS ==========
function resetToDefault() {
    if (confirm('¿Estás seguro de que quieres resetear el template a los valores por defecto?')) {
        appData.template = JSON.parse(JSON.stringify(defaultTemplate));
        if (appData.currentWeekIndex === -1) {
            generateScheduleTable();
        }
        saveAppData();
        showNotification('🔄 Template restablecido a valores por defecto');
    }
}

function clearAndReset() {
    if (confirm('¿Estás seguro? Esto eliminará TODAS las semanas y el template.')) {
        initializeDefaultData();
        appData.currentWeekIndex = -1;
        updateWeekNavigation();
        generateScheduleTable();
        showNotification('🗑️ Todo limpio - empezando de cero');
    }
}

// ========== UI HELPERS ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function toggleView(view) {
    document.getElementById('schedule-view').style.display = 'none';
    document.getElementById('publications-view').style.display = 'none';

    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(view + '-view').style.display = 'block';
    
    buttons.forEach(btn => {
        if (btn.textContent.includes(view === 'schedule' ? '📅' : '📺')) {
            btn.classList.add('active');
        }
    });
}

function toggleKeyboardHelp() {
    const modal = document.getElementById('keyboardHelpModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function toggleManagementDropdown() {
    const dropdown = document.getElementById('managementDropdown');
    dropdown.classList.toggle('show');
}

// ========== THEME MANAGEMENT ==========
function toggleTheme() {
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const isLightTheme = root.classList.contains('light-theme');
    
    if (isLightTheme) {
        // Switch to dark theme
        root.classList.remove('light-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light theme
        root.classList.add('light-theme');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'light') {
        root.classList.add('light-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        root.classList.remove('light-theme');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// ========== EVENT HANDLERS ==========
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('managementDropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// ========== KEYBOARD SHORTCUTS ==========
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Global shortcuts (when no modal is open)
        if (!document.getElementById('editModal').style.display.includes('block') && 
            !document.getElementById('newWeekModal').style.display.includes('block') &&
            !document.getElementById('keyboardHelpModal').style.display.includes('block')) {
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateWeek(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateWeek(1);
                    break;
                case 'n':
                case 'N':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        createNewWeek();
                    }
                    break;
                case 's':
                case 'S':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        exportData();
                    }
                    break;
                case 'o':
                case 'O':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        importData();
                    }
                    break;
                case 't':
                case 'T':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        saveAsTemplate();
                    }
                    break;
                case '1':
                    toggleView('schedule');
                    break;
                case '2':
                    toggleView('publications');
                    break;
                case 'c':
                case 'C':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        // Copiar desde la última celda seleccionada (si existe)
                        if (lastSelectedCell) {
                            copyTask(lastSelectedCell.timeSlot, lastSelectedCell.dayKey);
                        } else {
                            showNotification('❌ Selecciona una celda primero');
                        }
                    }
                    break;
                case 'v':
                case 'V':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        // Pegar en la última celda seleccionada (si existe)
                        if (lastSelectedCell) {
                            pasteTask(lastSelectedCell.timeSlot, lastSelectedCell.dayKey);
                        } else {
                            showNotification('❌ Selecciona una celda primero');
                        }
                    }
                    break;
                case 'F1':
                case '?':
                    e.preventDefault();
                    toggleKeyboardHelp();
                    break;
            }
        }
        
        // Modal-specific shortcuts
        if (document.getElementById('editModal').style.display.includes('block')) {
            switch(e.key) {
                case 'Enter':
                    if (!e.shiftKey) { // Allow Shift+Enter for new lines in textarea
                        e.preventDefault();
                        saveTask();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeModal();
                    break;
                case 'Delete':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        deleteTask();
                    }
                    break;
            }
        }
        
        if (document.getElementById('newWeekModal').style.display.includes('block')) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    createWeekFromInputs();
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeNewWeekModal();
                    break;
            }
        }
        
        if (document.getElementById('keyboardHelpModal').style.display.includes('block')) {
            switch(e.key) {
                case 'Escape':
                case 'Enter':
                case 'F1':
                case '?':
                    e.preventDefault();
                    toggleKeyboardHelp();
                    break;
            }
        }
    });
}

// ========== MODAL EVENT LISTENERS ==========
window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const newWeekModal = document.getElementById('newWeekModal');
    const keyboardHelpModal = document.getElementById('keyboardHelpModal');
    
    if (event.target === editModal) {
        closeModal();
    }
    if (event.target === newWeekModal) {
        closeNewWeekModal();
    }
    if (event.target === keyboardHelpModal) {
        toggleKeyboardHelp();
    }
};

// ========== DRAG & DROP SYSTEM ==========
let draggedElement = null;
let draggedData = null;
let draggedFromPalette = false;

// ========== COPY/PASTE SYSTEM ==========
let copiedTaskData = null;
let copiedFromCell = null;
let lastSelectedCell = null;

function handleDragStart(e) {
    const taskCell = e.target.closest('.task-cell');
    if (!taskCell) return;
    
    draggedElement = taskCell;
    draggedFromPalette = false;
    draggedData = {
        timeSlot: taskCell.dataset.timeSlot,
        dayKey: taskCell.dataset.dayKey
    };
    
    taskCell.classList.add('dragging');
    
    // Set drag data
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', ''); // Needed for some browsers
    
    // Create drag preview
    const rect = taskCell.getBoundingClientRect();
    e.dataTransfer.setDragImage(taskCell, rect.width / 2, rect.height / 2);
}

function handleDragOver(e) {
    e.preventDefault();
    // Cambiar el efecto según si viene de paleta o no
    if (draggedFromPalette) {
        e.dataTransfer.dropEffect = 'copy';
    } else {
        e.dataTransfer.dropEffect = 'move';
    }
}

function handleDragEnter(e) {
    e.preventDefault();
    // Find the task cell, even if we're hovering over a child element
    const taskCell = e.target.closest('.task-cell');
    if (taskCell && taskCell !== draggedElement && !taskCell.classList.contains('break')) {
        taskCell.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    // Find the task cell, even if we're leaving from a child element
    const taskCell = e.target.closest('.task-cell');
    if (taskCell && taskCell.classList.contains('drag-over')) {
        // Only remove if we're really leaving the cell (not just moving to a child)
        const rect = taskCell.getBoundingClientRect();
        const isStillInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                            e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (!isStillInside) {
            taskCell.classList.remove('drag-over');
        }
    }
}

function handleDrop(e) {
    e.preventDefault();
    
    // Find the task cell, even if we dropped on a child element
    const dropTarget = e.target.closest('.task-cell');
    
    if (!dropTarget) return;
    
    // Remove drag-over class
    dropTarget.classList.remove('drag-over');
    
    // Only allow drop on task cells that are not breaks
    if (dropTarget.classList.contains('break')) {
        return;
    }
    
    // Get drop target data
    const targetData = {
        timeSlot: dropTarget.dataset.timeSlot,
        dayKey: dropTarget.dataset.dayKey
    };
    
    if (draggedFromPalette) {
        // Assign task from palette
        assignPaletteTask(draggedData, targetData);
    } else {
        // Swap tasks (only if not dragging from palette and not the same element)
        if (dropTarget !== draggedElement) {
            swapTasks(draggedData, targetData);
        }
    }
}

function handleDragEnd(e) {
    // Clean up drag states
    const elementToDrag = e.target.closest('.task-cell') || e.target.closest('.palette-task');
    if (elementToDrag) {
        elementToDrag.classList.remove('dragging');
    }
    
    // Remove drag-over class from all cells
    document.querySelectorAll('.task-cell').forEach(cell => {
        cell.classList.remove('drag-over');
    });
    
    draggedElement = null;
    draggedData = null;
    draggedFromPalette = false;
}

function swapTasks(sourceData, targetData) {
    const scheduleData = getCurrentScheduleData();
    
    // Get source and target tasks
    const sourceTask = scheduleData.tasks[sourceData.timeSlot] && scheduleData.tasks[sourceData.timeSlot][sourceData.dayKey] 
        ? JSON.parse(JSON.stringify(scheduleData.tasks[sourceData.timeSlot][sourceData.dayKey]))
        : { title: 'LIBRE', description: '', icon: '⭕', color: '#bdc3c7' };
        
    const targetTask = scheduleData.tasks[targetData.timeSlot] && scheduleData.tasks[targetData.timeSlot][targetData.dayKey] 
        ? JSON.parse(JSON.stringify(scheduleData.tasks[targetData.timeSlot][targetData.dayKey]))
        : { title: 'LIBRE', description: '', icon: '⭕', color: '#bdc3c7' };
    
    // Ensure the task objects exist
    if (!scheduleData.tasks[sourceData.timeSlot]) {
        scheduleData.tasks[sourceData.timeSlot] = {};
    }
    if (!scheduleData.tasks[targetData.timeSlot]) {
        scheduleData.tasks[targetData.timeSlot] = {};
    }
    
    // Swap the tasks
    scheduleData.tasks[sourceData.timeSlot][sourceData.dayKey] = targetTask;
    scheduleData.tasks[targetData.timeSlot][targetData.dayKey] = sourceTask;
    
    // Save and refresh
    saveAppData();
    generateScheduleTable();
    
    showNotification('🔄 Tareas intercambiadas correctamente');
}

// ========== PALETTE DRAG HANDLERS ==========
function handlePaletteDragStart(e) {
    // Usar directamente e.target ya que debería ser el .palette-task
    const paletteTask = e.target;
    
    if (!paletteTask.classList.contains('palette-task')) {
        return;
    }
    
    draggedElement = paletteTask;
    draggedFromPalette = true;
    draggedData = JSON.parse(paletteTask.dataset.taskData);
    
    paletteTask.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify(draggedData));
}

function handlePaletteDragEnd(e) {
    const paletteTask = e.target.closest('.palette-task');
    if (paletteTask) {
        paletteTask.classList.remove('dragging');
    }
    
    // Remove drag-over class from all cells
    document.querySelectorAll('.task-cell').forEach(cell => {
        cell.classList.remove('drag-over');
    });
    
    draggedElement = null;
    draggedData = null;
    draggedFromPalette = false;
}

function assignPaletteTask(paletteTaskData, targetData) {
    const scheduleData = getCurrentScheduleData();
    
    if (!scheduleData) {
        return;
    }
    
    // Ensure the task objects exist
    if (!scheduleData.tasks[targetData.timeSlot]) {
        scheduleData.tasks[targetData.timeSlot] = {};
    }
    
    // Assign the palette task to the target cell
    scheduleData.tasks[targetData.timeSlot][targetData.dayKey] = JSON.parse(JSON.stringify(paletteTaskData));
    
    // Save and refresh
    saveAppData();
    generateScheduleTable();
    
    showNotification(`✨ Tarea "${paletteTaskData.title}" añadida correctamente`);
}

// ========== COPY/PASTE FUNCTIONS ==========
function copyTask(timeSlot, dayKey) {
    const scheduleData = getCurrentScheduleData();
    
    if (scheduleData.tasks[timeSlot] && scheduleData.tasks[timeSlot][dayKey]) {
        // Crear una copia profunda de la tarea
        copiedTaskData = JSON.parse(JSON.stringify(scheduleData.tasks[timeSlot][dayKey]));
        copiedFromCell = { timeSlot, dayKey };
        
        // Indicador visual de que se ha copiado
        showCopyFeedback(timeSlot, dayKey);
        showNotification(`📋 Tarea "${copiedTaskData.title}" copiada`);
        
        return true;
    } else {
        showNotification('❌ No hay tarea para copiar en esta celda');
        return false;
    }
}

function pasteTask(timeSlot, dayKey) {
    if (!copiedTaskData) {
        showNotification('❌ No hay tarea copiada para pegar');
        return false;
    }
    
    const scheduleData = getCurrentScheduleData();
    
    // Asegurarse de que la estructura existe
    if (!scheduleData.tasks[timeSlot]) {
        scheduleData.tasks[timeSlot] = {};
    }
    
    // Pegar la tarea copiada
    scheduleData.tasks[timeSlot][dayKey] = JSON.parse(JSON.stringify(copiedTaskData));
    
    // Guardar y regenerar tabla
    saveAppData();
    generateScheduleTable();
    
    showNotification(`📌 Tarea "${copiedTaskData.title}" pegada`);
    return true;
}

function showCopyFeedback(timeSlot, dayKey) {
    // Remover feedback anterior
    document.querySelectorAll('.task-cell.copied').forEach(cell => {
        cell.classList.remove('copied');
    });
    
    // Encontrar la celda y añadir clase de feedback
    const cells = document.querySelectorAll('.task-cell');
    cells.forEach(cell => {
        if (cell.dataset.timeSlot === timeSlot && cell.dataset.dayKey === dayKey) {
            cell.classList.add('copied');
            // Remover la clase después de 2 segundos
            setTimeout(() => {
                cell.classList.remove('copied');
            }, 2000);
        }
    });
}

function clearCopiedTask() {
    copiedTaskData = null;
    copiedFromCell = null;
    document.querySelectorAll('.task-cell.copied').forEach(cell => {
        cell.classList.remove('copied');
    });
    showNotification('🗑️ Portapapeles limpiado');
}

function showTaskContextMenu(event, timeSlot, dayKey) {
    // Eliminar menú anterior si existe
    const existingMenu = document.getElementById('taskContextMenu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Crear menú contextual
    const menu = document.createElement('div');
    menu.id = 'taskContextMenu';
    menu.className = 'context-menu';
    
    const scheduleData = getCurrentScheduleData();
    const hasTask = scheduleData.tasks[timeSlot] && scheduleData.tasks[timeSlot][dayKey] && 
                   scheduleData.tasks[timeSlot][dayKey].title !== 'LIBRE';
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="openEditModal('${timeSlot}', '${dayKey}'); closeContextMenu();">
            ✏️ Editar tarea
        </div>
        ${hasTask ? `
        <div class="context-menu-item" onclick="copyTask('${timeSlot}', '${dayKey}'); closeContextMenu();">
            📋 Copiar tarea
        </div>
        ` : ''}
        ${copiedTaskData ? `
        <div class="context-menu-item" onclick="pasteTask('${timeSlot}', '${dayKey}'); closeContextMenu();">
            📌 Pegar tarea
        </div>
        ` : ''}
        ${hasTask ? `
        <div class="context-menu-item context-menu-item-danger" onclick="deleteTaskFromCell('${timeSlot}', '${dayKey}'); closeContextMenu();">
            🗑️ Eliminar tarea
        </div>
        ` : ''}
        ${copiedTaskData ? `
        <hr class="context-menu-separator">
        <div class="context-menu-item" onclick="clearCopiedTask(); closeContextMenu();">
            🗑️ Limpiar portapapeles
        </div>
        ` : ''}
    `;
    
    // Posicionar menú
    menu.style.left = event.pageX + 'px';
    menu.style.top = event.pageY + 'px';
    
    document.body.appendChild(menu);
    
    // Añadir evento para cerrar al hacer click fuera
    setTimeout(() => {
        document.addEventListener('click', closeContextMenu, { once: true });
    }, 0);
}

function closeContextMenu() {
    const menu = document.getElementById('taskContextMenu');
    if (menu) {
        menu.remove();
    }
}

function deleteTaskFromCell(timeSlot, dayKey) {
    const scheduleData = getCurrentScheduleData();
    
    if (scheduleData.tasks[timeSlot] && scheduleData.tasks[timeSlot][dayKey]) {
        scheduleData.tasks[timeSlot][dayKey] = {
            title: 'LIBRE',
            description: '',
            icon: '⭕',
            color: '#bdc3c7'
        };
        
        saveAppData();
        generateScheduleTable();
        showNotification('🗑️ Tarea eliminada');
    }
}

// ========== GLOBAL EXPORTS ==========
window.navigateWeek = navigateWeek;
window.createNewWeek = createNewWeek;
window.createWeekFromInputs = createWeekFromInputs;
window.closeNewWeekModal = closeNewWeekModal;
window.saveAsTemplate = saveAsTemplate;
window.openEditModal = openEditModal;
window.toggleView = toggleView;
window.toggleKeyboardHelp = toggleKeyboardHelp;
window.toggleManagementDropdown = toggleManagementDropdown;
window.toggleTheme = toggleTheme;
window.exportData = exportData;
window.importData = importData;
window.resetToDefault = resetToDefault;
window.clearAndReset = clearAndReset;
window.closeModal = closeModal;
window.saveTask = saveTask;
window.deleteTask = deleteTask;
window.handleImport = handleImport;
window.handleDragStart = handleDragStart;
window.handleDragOver = handleDragOver;
window.handleDragEnter = handleDragEnter;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
window.handleDragEnd = handleDragEnd;
window.copyTask = copyTask;
window.pasteTask = pasteTask;
window.clearCopiedTask = clearCopiedTask;
window.deleteTaskFromCell = deleteTaskFromCell;
window.closeContextMenu = closeContextMenu;

// ========== APPLICATION INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Planificador de Contenido...');
    
    loadTheme(); // Load theme first
    loadAppData();
    updateWeekNavigation();
    generateScheduleTable();
    createColorPicker();
    createEmojiPicker();
    generateTaskPalette();
    setupKeyboardShortcuts();
    
    // Ajustar altura en resize
    window.addEventListener('resize', adjustPaletteHeight);
    
    console.log('✅ Aplicación completamente inicializada!');
});