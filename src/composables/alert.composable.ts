import { reactive, readonly } from "vue";

const ALERT_DURATION = 5_000;

type Alert = { id: string; message: string };
const alertsState = reactive({
  active: [] as Alert[],
});

function scheduleAlert(message: string) {
  const alert: Alert = {
    id: crypto.randomUUID(),
    message: message,
  };

  alertsState.active.push(alert);
  setTimeout(() => {
    alertsState.active = alertsState.active.filter((item) => {
      return item.id !== alert.id;
    });
  }, ALERT_DURATION);
}

export function useAlerts() {
  return {
    alertsState: readonly(alertsState),
    scheduleAlert,
  };
}
