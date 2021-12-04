import { LOCALES } from './locales'

export const messages = {
  [LOCALES.EN.code]: {
    close: "Close",
    currentRound: "Current round",
    circleAlerts: "Circle inner alerts",
    default: "Default",
    delete: "Delete",
    edit: "Edit",
    fullTime: "Full time",
    of: "of",
    phase: "Phase",
    prepareTime: "Prepare time",
    prepare: "Prepare",
    pleaseConfirm: "Pleace confirm",
    pause: "Pause",
    restTime: "Rest time",
    rest: "Rest",
    roundTime: "Round time",
    round: "Round",
    rounds: "Rounds",
    s: "s",
    saveAsNewTimer: "Save as new timer",
    saveSettings: "Save settings",
    start: "Start",
    stop: "Stop",
    timerName: "Timer name",
    totalTime: "Total time",
    warningTime: "Warning time",
    wantDelete: "Do you really want to delete",
    warning: "Warning",
    editAdd: "Edit/Add",
    popoverHeaderText: "How to configure inner alerts?",
    popoverBodyText: `To set an inner alert, simply enter the number of seconds to turn on each subsequent alert.{br}{br}
        For example, if you enter the number 10, the notification will be every 10 seconds.{br}{br}
        If you enter 10, 20 first alert will sound after ten seconds and then after 20 seconds and so on in a circle throughout the round.{br}{br}
        You can enter any number of alerts.`,
  },
  [LOCALES.UK.code]: {
    delete: "Видалити",
    rest: "Відпочинок",
    totalTime: "Увесь час",
    of: "з",
    saveSettings: "Зберегти налаштування",
    saveAsNewTimer: "Зберегти як новий таймер",
    default: "За замовчуванням",
    warning: "На готові",
    warningTime: "Попередження",
    wantDelete: "Ви дійсно хочете видалити",
    timerName: "Назва таймеру",
    start: "Початок",
    stop: "Зупинити",
    prepare: "Приготуватись",
    pause: "Пауза",
    pleaseConfirm: "Будь-ласка підтвердіть",
    currentRound: "Поточний раунд",
    circleAlerts: "Циклічні оповіщення",
    round: "Раунд",
    rounds: "Раундів",
    restTime: "Час відпочинку",
    edit: "Редагувати",
    createTimer: "Створити таймер",
    phase: "Фаза",
    prepareTime: "Час на підготовку",
    roundTime: "Час раунду",
    close: "Закрити",
    editAdd: "Редагувати/додати",
    popoverHeaderText: "Як налаштувати внутрішні сповіщення?",
    popoverBodyText: `Для того щоб задати внутрішнє оповіщення просто перерахуйте через кому через яку кількість секунд вмикати кожне наступне оповіщення.{br}{br}
     Наприклад якщо ввести число 10 то оповіщення буде кожні 10 секунд.{br}{br}
      Якщо ввести 10, 20 оповіщення буде спочатку після десяти секунд, а потім після 20 секунд і так по колу на протязі раунду.{br}{br}
      Ви можете ввести будь-яку кількість сповіщень.`,
  },
  [LOCALES.ES.code]: {
    close: "Cerrar",
    currentRound: "Ronda actual",
    circleAlerts: "Alertas internas del círculo",
    default: "Por defecto",
    delete: "Eliminar",
    edit: "Editar",
    fullTime: "Tiempo completo",
    of: "de",
    phase: "Fase",
    prepareTime: "Tiempo de preparación",
    prepare: "Preparar",
    pause: "Pausa",
    pleaseConfirm: "Confirmar por favor",
    restTime: "Tiempo de descanso",
    rest: "Descanso",
    roundTime: "Tiempo de ronda",
    round: "Ronda",
    rounds: "Rondas",
    saveAsNewTimer: "Guardar como nuevo temporizador",
    saveSettings: "Guardar configuración",
    start: "Start",
    stop: "Stop",
    timerName: "Nombre del temporizador",
    totalTime: "Tiempo total",
    warningTime: "Tiempo de advertencia",
    wantDelete: "Realmente quieres borrar",
    warning: "Advertencia",
    editAdd: "Editar/Añadir",
    popoverHeaderText: "¿Cómo configurar las alertas internas?",
    popoverBodyText: `Para configurar una alerta interna, simplemente ingrese la cantidad de segundos para activar cada alerta posterior.{br}{br}
        Por ejemplo, si ingresa el número 10, la notificación será cada 10 segundos.{br}{br}
        Si ingresa 10, 20 la primera alerta 20 sonará después de diez segundos y luego después de 20 segundos y así sucesivamente en un círculo a lo largo de la ronda.{br}{br}
        Puede ingresar cualquier cantidad de notificaciones.`,
  },
}